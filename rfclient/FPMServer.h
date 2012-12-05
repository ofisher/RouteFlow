
#ifndef RFCLIENT_FPMSERVER_H_
#define RFCLIENT_FPMSERVER_H_
#ifdef FPM_ENABLED
#include <assert.h>

#include <fpm.h>

class FPMServer {
 public:
  static void start();

 private:
  static int create_listen_sock (int port, int *sock_p);
  static int accept_conn (int listen_sock);
  static void fpm_serve ();
  static fpm_msg_hdr_t * read_fpm_msg (char *buf, size_t buf_len);
  static void process_fpm_msg (fpm_msg_hdr_t *hdr);

};


#endif
#endif  // RFCLIENT_FPMSERVER_H_
