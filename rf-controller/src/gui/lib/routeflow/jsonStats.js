{ "nodes": [
	{
		"id": "5",
		"name": "switch5",
		"data": {
			"$dp_id": "dp1",
			"$flows": [
			{
				"flow": "0",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 30.0.0.3",
				"ofp_actions": "SET_DL_DST: 1a:4b:e4:80:ac:b2; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 50.0.0.4",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 4; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "2",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 10.0.0.2",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "3",
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "897",
				"byte_count": "74158"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 172.31.4.0/24",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 4; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 172.31.2.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "6",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 20.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 1a:4b:e4:80:ac:b2; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "7",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 40.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "8",
				"ofp_match": "ip, dl_dst: c2:77:5a:a0:51:17; nw_dst: 172.31.3.0/24",
				"ofp_actions": "SET_DL_DST: 1a:4b:e4:80:ac:b2; SET_DL_SRC: c2:77:5a:a0:51:17; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "9",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "6",
				"byte_count": "252"
			},
			{
				"flow": "10",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "11",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "12",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["903", "74410", "13"],
			"$ofp_table_stats":[["0", "classifier", "22", "0"]]
		}
	},
	{
		"id": "6",
		"name": "switch6",
		"data": {
			"$dp_id": "dp2",
			"$flows": [
			{
				"flow": "0",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 10.0.0.1",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 40.0.0.4",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "2",
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "601",
				"byte_count": "49874"
			},
			{
				"flow": "3",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 50.0.0.0/24",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 30.0.0.0/24",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 172.31.3.0/24",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "6",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 172.31.4.0/24",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "7",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 172.31.1.0/24",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "8",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 20.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "9",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "4",
				"byte_count": "168"
			},
			{
				"flow": "10",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "11",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "12",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["605", "50042", "13"],
			"$ofp_table_stats":[["0", "classifier", "22", "0"]]
		}
	},
	{
		"id": "7",
		"name": "switch7",
		"data": {
			"$dp_id": "dp3",
			"$flows": [
			{
				"flow": "0",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 30.0.0.1",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 20.0.0.4",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "2",
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "602",
				"byte_count": "50068"
			},
			{
				"flow": "3",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 172.31.4.0/24",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 172.31.1.0/24",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 10.0.0.0/24",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "6",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 172.31.2.0/24",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "7",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 50.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "8",
				"ofp_match": "ip, dl_dst: 1a:4b:e4:80:ac:b2; nw_dst: 40.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 5e:fa:a9:27:90:2c; SET_DL_SRC: 1a:4b:e4:80:ac:b2; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "9",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "4",
				"byte_count": "168"
			},
			{
				"flow": "10",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "11",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "12",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["606", "50236", "13"],
			"$ofp_table_stats":[["0", "classifier", "22", "0"]]
		}
	},
	{
		"id": "8",
		"name": "switch8",
		"data": {
			"$dp_id": "dp4",
			"$flows": [
			{
				"flow": "0",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 20.0.0.3",
				"ofp_actions": "SET_DL_DST: 1a:4b:e4:80:ac:b2; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 50.0.0.1",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 4; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "2",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 40.0.0.2",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "3",
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "890",
				"byte_count": "73876"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 172.31.1.0/24",
				"ofp_actions": "SET_DL_DST: c2:77:5a:a0:51:17; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 4; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 172.31.2.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "6",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 10.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "7",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 172.31.3.0/24",
				"ofp_actions": "SET_DL_DST: 1a:4b:e4:80:ac:b2; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "8",
				"ofp_match": "ip, dl_dst: 5e:fa:a9:27:90:2c; nw_dst: 30.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 1a:4b:e4:80:ac:b2; SET_DL_SRC: 5e:fa:a9:27:90:2c; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "9",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "6",
				"byte_count": "252"
			},
			{
				"flow": "10",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "11",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "12",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["896", "74128", "13"],
			"$ofp_table_stats":[["0", "classifier", "22", "0"]]
		}
	},
	{
		"id": "150873853798",
		"name": "switch150873853798",
		"data": {
			"$dp_id": "dp5",
			"$flows": [
			{
				"flow": "0",
				"ofp_match": "",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "5322",
				"byte_count": "426982"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "rfovs", "1.1.0", "None", "None"],
			"$ofp_aggr_stats":["5319", "426796", "1"],
			"$ofp_table_stats":[["0", "classifier", "1", "0"]]
		}
	}
]}