{ "nodes": [
	{
		"id": "5",
		"name": "switch5",
		"data": {
			"$dp_id": "dp1",
			"$flows": [
			{
				"flow": "0",
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "2731",
				"byte_count": "225054"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: 6e:12:93:aa:40:ce; nw_dst: 172.31.3.0/24",
				"ofp_actions": "SET_DL_DST: ae:87:45:0a:07:77; SET_DL_SRC: 6e:12:93:aa:40:ce; OUTPUT: port 3; ",
				"packet_count": "204",
				"byte_count": "19992"
			},
			{
				"flow": "2",
				"ofp_match": "ip, dl_dst: 6e:12:93:aa:40:ce; nw_dst: 172.31.2.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: 6e:12:93:aa:40:ce; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "3",
				"ofp_match": "ip, dl_dst: 6e:12:93:aa:40:ce; nw_dst: 172.31.4.0/24",
				"ofp_actions": "SET_DL_DST: 9a:62:5c:b3:4c:f3; SET_DL_SRC: 6e:12:93:aa:40:ce; OUTPUT: port 4; ",
				"packet_count": "4",
				"byte_count": "392"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: 6e:12:93:aa:40:ce; nw_dst: 20.0.0.0/24",
				"ofp_actions": "SET_DL_DST: ae:87:45:0a:07:77; SET_DL_SRC: 6e:12:93:aa:40:ce; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: 6e:12:93:aa:40:ce; nw_dst: 40.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: 6e:12:93:aa:40:ce; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "6",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "14",
				"byte_count": "588"
			},
			{
				"flow": "7",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "8",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "3",
				"byte_count": "294"
			},
			{
				"flow": "9",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["2965", "247058", "10"],
			"$ofp_table_stats":[["0", "classifier", "19", "0"]]
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
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "1849",
				"byte_count": "153082"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 50.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 6e:12:93:aa:40:ce; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "2",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 30.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 6e:12:93:aa:40:ce; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "3",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 172.31.3.0/24",
				"ofp_actions": "SET_DL_DST: 6e:12:93:aa:40:ce; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 172.31.4.0/24",
				"ofp_actions": "SET_DL_DST: 9a:62:5c:b3:4c:f3; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 3; ",
				"packet_count": "4",
				"byte_count": "392"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 172.31.1.0/24",
				"ofp_actions": "SET_DL_DST: 6e:12:93:aa:40:ce; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "6",
				"ofp_match": "ip, dl_dst: 02:ba:ba:ba:ba:ba; nw_dst: 20.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 9a:62:5c:b3:4c:f3; SET_DL_SRC: 02:ba:ba:ba:ba:ba; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "7",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "8",
				"byte_count": "336"
			},
			{
				"flow": "8",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "9",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "1",
				"byte_count": "98"
			},
			{
				"flow": "10",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["1865", "154154", "11"],
			"$ofp_table_stats":[["0", "classifier", "20", "0"]]
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
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "1772",
				"byte_count": "146472"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: ae:87:45:0a:07:77; nw_dst: 10.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 6e:12:93:aa:40:ce; SET_DL_SRC: ae:87:45:0a:07:77; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "2",
				"ofp_match": "ip, dl_dst: ae:87:45:0a:07:77; nw_dst: 172.31.2.0/24",
				"ofp_actions": "SET_DL_DST: 9a:62:5c:b3:4c:f3; SET_DL_SRC: ae:87:45:0a:07:77; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "3",
				"ofp_match": "ip, dl_dst: ae:87:45:0a:07:77; nw_dst: 50.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 9a:62:5c:b3:4c:f3; SET_DL_SRC: ae:87:45:0a:07:77; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: ae:87:45:0a:07:77; nw_dst: 172.31.1.0/24",
				"ofp_actions": "SET_DL_DST: 6e:12:93:aa:40:ce; SET_DL_SRC: ae:87:45:0a:07:77; OUTPUT: port 3; ",
				"packet_count": "4",
				"byte_count": "392"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: ae:87:45:0a:07:77; nw_dst: 172.31.4.0/24",
				"ofp_actions": "SET_DL_DST: 9a:62:5c:b3:4c:f3; SET_DL_SRC: ae:87:45:0a:07:77; OUTPUT: port 2; ",
				"packet_count": "4",
				"byte_count": "392"
			},
			{
				"flow": "6",
				"ofp_match": "ip, dl_dst: ae:87:45:0a:07:77; nw_dst: 40.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 9a:62:5c:b3:4c:f3; SET_DL_SRC: ae:87:45:0a:07:77; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "7",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "13",
				"byte_count": "546"
			},
			{
				"flow": "8",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "9",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "6",
				"byte_count": "588"
			},
			{
				"flow": "10",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["1805", "148882", "11"],
			"$ofp_table_stats":[["0", "classifier", "20", "0"]]
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
				"ofp_match": "ospf; tp_src: 0; tp_dst: 0",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "2654",
				"byte_count": "219308"
			},
			{
				"flow": "1",
				"ofp_match": "ip, dl_dst: 9a:62:5c:b3:4c:f3; nw_dst: 172.31.1.0/24",
				"ofp_actions": "SET_DL_DST: 6e:12:93:aa:40:ce; SET_DL_SRC: 9a:62:5c:b3:4c:f3; OUTPUT: port 4; ",
				"packet_count": "6",
				"byte_count": "588"
			},
			{
				"flow": "2",
				"ofp_match": "ip, dl_dst: 9a:62:5c:b3:4c:f3; nw_dst: 30.0.0.0/24",
				"ofp_actions": "SET_DL_DST: ae:87:45:0a:07:77; SET_DL_SRC: 9a:62:5c:b3:4c:f3; OUTPUT: port 3; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "3",
				"ofp_match": "ip, dl_dst: 9a:62:5c:b3:4c:f3; nw_dst: 172.31.3.0/24",
				"ofp_actions": "SET_DL_DST: ae:87:45:0a:07:77; SET_DL_SRC: 9a:62:5c:b3:4c:f3; OUTPUT: port 3; ",
				"packet_count": "14",
				"byte_count": "1372"
			},
			{
				"flow": "4",
				"ofp_match": "ip, dl_dst: 9a:62:5c:b3:4c:f3; nw_dst: 172.31.2.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: 9a:62:5c:b3:4c:f3; OUTPUT: port 2; ",
				"packet_count": "216",
				"byte_count": "21168"
			},
			{
				"flow": "5",
				"ofp_match": "ip, dl_dst: 9a:62:5c:b3:4c:f3; nw_dst: 10.0.0.0/24",
				"ofp_actions": "SET_DL_DST: 02:ba:ba:ba:ba:ba; SET_DL_SRC: 9a:62:5c:b3:4c:f3; OUTPUT: port 2; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "6",
				"ofp_match": "arp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "12",
				"byte_count": "504"
			},
			{
				"flow": "7",
				"ofp_match": "udp; nw_dst: 224.0.0.9",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			},
			{
				"flow": "8",
				"ofp_match": "icmp",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "6",
				"byte_count": "588"
			},
			{
				"flow": "9",
				"ofp_match": "tcp; tp_dst: 179",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "0",
				"byte_count": "0"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "Open vSwitch", "1.1.1", "None", "None"],
			"$ofp_aggr_stats":["2905", "243282", "10"],
			"$ofp_table_stats":[["0", "classifier", "19", "0"]]
		}
	},
	{
		"id": "150872432942",
		"name": "switch150872432942",
		"data": {
			"$dp_id": "dp5",
			"$flows": [
			{
				"flow": "0",
				"ofp_match": "",
				"ofp_actions": "OUTPUT: port 65533; ",
				"packet_count": "13221",
				"byte_count": "1067064"
			}
			],
			"$ofp_desc_stats":["Nicira Networks, Inc.", "rfovs", "1.1.0", "None", "None"],
			"$ofp_aggr_stats":["13221", "1067064", "1"],
			"$ofp_table_stats":[["0", "classifier", "1", "0"]]
		}
	}
]}