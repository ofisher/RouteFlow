#ifndef __DEFS_H__
#define __DEFS_H__

#define MONGO_ADDRESS "192.169.1.1:27017"
#define MONGO_DB_NAME "db"

#define RFCLIENT_RFSERVER_CHANNEL "rfclient<->rfserver"
#define RFSERVER_RFPROXY_CHANNEL "rfserver<->rfproxy"

#define RFSERVER_ID "rfserver"
#define RFPROXY_ID "rfproxy"

#define DEFAULT_RFCLIENT_INTERFACE "eth0"

#define SYSLOGFACILITY LOG_LOCAL7

#define RFVS_DPID 0x7266767372667673

#define RF_ETH_PROTO 0x0A0A /* RF ethernet protocol */

// We must match_l2 in order for packets to go up
#define MATCH_L2 true

typedef enum dp_config {
	DC_DROP_ALL,			/* Drop all incoming packets */
	DC_CLEAR_FLOW_TABLE,    /* Clear flow table */
	DC_VM_INFO,			    /* Flow to communicate two linked VM's */
	DC_RIPV2,				/* RIPv2 protocol */
	DC_OSPF,				/* OSPF protocol */
	DC_BGP_INBOUND,		    /* BGP protocol */
	DC_BGP_OUTBOUND,		/* BGP protocol */
	DC_ARP,				    /* ARP protocol */
	DC_ICMP,				/* ICMP protocol */
	DC_ALL					/* Send all traffic to the controller */
} DATAPATH_CONFIG_OPERATION;

#define PC_MAP 0
#define PC_RESET 1

#endif /* __DEFS_H__ */
