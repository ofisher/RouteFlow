/*
 * Copyright (C) 2012  Internet Systems Consortium, Inc. ("ISC")
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND ISC DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS.  IN NO EVENT SHALL ISC BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 *
 *
 * This file uses code from fpm_stub.c
 */

#ifdef FPM_ENABLED

#include <iostream>
#include <sys/socket.h>
#include <memory.h>
#include <linux/netlink.h>
#include <linux/rtnetlink.h>

#include <stdint.h>
#include <stdio.h>

#include <arpa/inet.h>
#include <errno.h>
#include <stdlib.h>
#include <assert.h>

#include "FPMServer.h"
#include "FlowTable.h"

typedef struct glob_t_ {
  int server_sock;
  int sock;
} glob_t;

glob_t glob_space;
glob_t *glob = &glob_space;

int log_level = 1;

#define log(level, format...)     \
do {            \
  if (level <= log_level) {     \
    fprintf(stderr, format);      \
    fprintf(stderr, "\n");      \
  }           \
} while (0);

#define warn_msg(format...) log(0, format)
#define err_msg(format...) log(-1, format)
#define trace log

/*
 * create_listen_sock
 */
int FPMServer::create_listen_sock(int port, int *sock_p) {
  int sock;
  struct sockaddr_in addr;
  int reuse;

  sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (sock < 0) {
    err_msg( "Failed to create socket: %s", strerror(errno));
    return 0;
  }

  reuse = 1;
  if (setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &reuse, sizeof(reuse)) < 0) {
    warn_msg("Failed to set reuse addr option: %s", strerror(errno));
  }

  memset(&addr, 0, sizeof(addr));
  addr.sin_family = AF_INET;
  addr.sin_addr.s_addr = htonl(INADDR_ANY );
  addr.sin_port = htons(port);

  if (bind(sock, (struct sockaddr *) &addr, sizeof(addr)) < 0) {
    err_msg("Failed to bind to port %d: %s", port, strerror(errno));
    close(sock);
    return 0;
  }

  if (listen(sock, 5)) {
    err_msg("Failed to listen on socket: %s", strerror(errno));
    close(sock);
    return 0;
  }

  *sock_p = sock;
  return 1;
}

/*
 * accept_conn
 */
int FPMServer::accept_conn(int listen_sock) {
  int sock;
  struct sockaddr_in client_addr;
  unsigned int client_len;

  while (1) {
    trace(1, "Waiting for client connection...");
    client_len = sizeof(client_addr);
    sock = accept(listen_sock, (struct sockaddr *) &client_addr, &client_len);

    if (sock >= 0) {
      trace(1, "Accepted client %s", inet_ntoa(client_addr.sin_addr));
      return sock;
    }

    err_msg("Failed to accept socket: %s", strerror(errno));
  }
}

/*
 * read_fpm_msg
 */
fpm_msg_hdr_t *
FPMServer::read_fpm_msg(char *buf, size_t buf_len) {
  char *cur, *end;
  int need_len, bytes_read, have_len;
  fpm_msg_hdr_t *hdr;
  int reading_full_msg;

  end = buf + buf_len;
  cur = buf;
  hdr = (fpm_msg_hdr_t *) buf;

  while (1) {
    reading_full_msg = 0;

    have_len = cur - buf;

    if (have_len < FPM_MSG_HDR_LEN) {
      need_len = FPM_MSG_HDR_LEN - have_len;
    } else {
      need_len = fpm_msg_len(hdr) - have_len;
      assert(need_len >= 0 && need_len < (end - cur));

      if (!need_len)
        return hdr;

      reading_full_msg = 1;
    }

    trace(3, "Looking to read %d bytes", need_len);
    bytes_read = read(glob->sock, cur, need_len);

    if (bytes_read <= 0) {
      err_msg("Error reading from socket: %s", strerror(errno));
      return NULL;
    }

    trace(3, "Read %d bytes", bytes_read);
    cur += bytes_read;

    if (bytes_read < need_len) {
      continue;
    }

    assert(bytes_read == need_len);

    if (reading_full_msg)
      return hdr;

    if (!fpm_msg_ok(hdr, buf_len)) {
      err_msg("Malformed fpm message");
      return NULL;
    }
  }
}

/*
 * process_fpm_msg
 */
void FPMServer::process_fpm_msg(fpm_msg_hdr_t *hdr) {
  trace(1, "FPM message - Type: %d, Length %d", hdr->msg_type,
      ntohs(hdr->msg_len));

  if (hdr->msg_type != FPM_MSG_TYPE_NETLINK) {
    warn_msg("Unknown fpm message type %u", hdr->msg_type);
    return;
  }
  FlowTable::updateRouteTable((nlmsghdr *) fpm_msg_data(hdr));
}

/*
 * fpm_serve
 */
void FPMServer::fpm_serve() {
  char buf[FPM_MAX_MSG_LEN];
  fpm_msg_hdr_t *hdr;
  while (1) {
    hdr = FPMServer::read_fpm_msg(buf, sizeof(buf));
    if (!hdr) {
      return;
    }
    FPMServer::process_fpm_msg(hdr);
  }
}

void FPMServer::start() {
  memset(glob, 0, sizeof(*glob));
  if (!FPMServer::create_listen_sock(FPM_DEFAULT_PORT, &glob->server_sock)) {
    exit(1);
  }

  /*
   * Server forever.
   */
  while (1) {
    glob->sock = FPMServer::accept_conn(glob->server_sock);
    FPMServer::fpm_serve();
    trace(1, "Done serving client");
  }
}
#endif
