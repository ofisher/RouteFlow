{ "nodes": [
	{
		"id": "rf-server",
		"name": "RouteFlow Server",
		"adjacencies": [
			{
				"nodeTo": "controller",
				"nodeFrom": "rf-server",
				"data": {
					"$color": "#145D80"
				}
			}
		],
		"data": {
			"$type": "rf-server",
			"timer": 1319314116,
			"$dim": 20,
			"$x": -50,
			"$y": -170,
			"latitude": -20.950884,
			"longitude": -42.775578
		}
	},
	{
		"id": "5",
		"name": "switch5",
		"adjacencies": [
			{
				"nodeTo": "6",
				"nodeFrom": "5",
				"data": {
					"$color": "#010101"
				}
			},
			{
				"nodeTo": "7",
				"nodeFrom": "5",
				"data": {
					"$color": "#010101"
				}
			},
			{
				"nodeTo": "8",
				"nodeFrom": "5",
				"data": {
					"$color": "#010101"
				}
			}
		],
		"data": {
			"$type": "of-switch",
			"timer": 1319314116,
			"$dim": 20,
			"$x": -225,
			"$y": -50,
			"latitude": -23.538609,
			"longitude": -46.682607
		}
	},
	{
		"id": "6",
		"name": "switch6",
		"adjacencies": [
			{
				"nodeTo": "5",
				"nodeFrom": "6",
				"data": {
					"$color": "#010101"
				}
			},
			{
				"nodeTo": "8",
				"nodeFrom": "6",
				"data": {
					"$color": "#010101"
				}
			}
		],
		"data": {
			"$type": "of-switch",
			"timer": 1319314116,
			"$dim": 20,
			"$x": 275,
			"$y": -50,
			"latitude": -23.202466,
			"longitude": -45.862749
		}
	},
	{
		"id": "7",
		"name": "switch7",
		"adjacencies": [
			{
				"nodeTo": "5",
				"nodeFrom": "7",
				"data": {
					"$color": "#010101"
				}
			},
			{
				"nodeTo": "8",
				"nodeFrom": "7",
				"data": {
					"$color": "#010101"
				}
			}
		],
		"data": {
			"$type": "of-switch",
			"timer": 1319314116,
			"$dim": 20,
			"$x": -325,
			"$y": 225,
			"latitude": -23.002466,
			"longitude": -45.062749
		}
	},
	{
		"id": "8",
		"name": "switch8",
		"adjacencies": [
			{
				"nodeTo": "5",
				"nodeFrom": "8",
				"data": {
					"$color": "#010101"
				}
			},
			{
				"nodeTo": "6",
				"nodeFrom": "8",
				"data": {
					"$color": "#010101"
				}
			},
			{
				"nodeTo": "7",
				"nodeFrom": "8",
				"data": {
					"$color": "#010101"
				}
			}
		],
		"data": {
			"$type": "of-switch",
			"timer": 1319314116,
			"$dim": 20,
			"$x": 175,
			"$y": 225,
			"latitude": -20.00,
			"longitude": -48.00
		}
	},
	{
		"id": "controller",
		"name": "Controller",
		"adjacencies": [
			{
				"nodeTo": "5",
				"nodeFrom": "controller",
				"data": {
					"$color": "#145D80"
				}
			},
			{
				"nodeTo": "6",
				"nodeFrom": "controller",
				"data": {
					"$color": "#145D80"
				}
			},
			{
				"nodeTo": "7",
				"nodeFrom": "controller",
				"data": {
					"$color": "#145D80"
				}
			},
			{
				"nodeTo": "8",
				"nodeFrom": "controller",
				"data": {
					"$color": "#145D80"
				}
			}
		],
		"Label": {
			"$color": "#"
		},
		"data": {
			"$type": "controller",
			"timer": 1319314116,
			"$dim": 25,
			"$x": 100,
			"$y": -170,
			"latitude": -21.002466,
			"longitude": -45.062749
		}
	}
]}