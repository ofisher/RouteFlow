var labelType, useGradients, nativeTextSupport, animate;
var lastClickedNode;

(
	function() {
		var ua = navigator.userAgent,
		iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
		typeOfCanvas = typeof HTMLCanvasElement,
		nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
		textSupport = nativeCanvasSupport 
		&& (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
		//I'm setting this based on the fact that ExCanvas provides text support for IE
		//and that as of today iPhone/iPad current text support is lame
		labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
		nativeTextSupport = labelType == 'Native';
		useGradients = nativeCanvasSupport;
		//animate = !(iStuff || !nativeCanvasSupport);
		animate = false;
	}
)();
// Log is an Objecto Literal. The first element of the Log object defines a property, false; the second element, the write property, invokes a function (function("text"));
var Log = {
	elem: false,
	write: function(text){
		if (!this.elem) 
			this.elem = document.getElementById('log');
		this.elem.innerHTML = text;
		this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
	}
};

function graph_init(){
    var jqxhr = $.getJSON("lib/routeflow/json.js",
        function(json){
            var jsonTopology = json["nodes"];
            routeFlowDemo(jsonTopology);
    });
}

function routeFlowDemo(jsonTopology){
        var rfDemo;

        	// init routeFlowDemo
	    rfDemo = new $jit.ForceDirected( {
		//id of the visualization container
		injectInto: 'infovis',
		//Enable zooming and panning
		//by scrolling and DnD
		Navigation: {
			enable: true,
			//Enable panning events only if we're dragging the empty
			//canvas (and not a node).
			panning: 'avoid nodes',
			zooming: 10 //zoom speed. higher is more sensible
		},
		// Change node and edge styles such as color and width.
		// These properties are also set per node with dollar prefixed data-properties in the JSON structure.
		Node: {
			overridable: true
		},
		Edge: {
			overridable: true,
			//color: '#23A4FF',
			type: 'line',
			lineWidth: 2.0
		},
		//Native canvas text styling
		Label: {
			overridable: true,
			type: labelType, //Native or HTML
			size: 12,
			style: 'bold',
			color: '#606060'

		},
		//Add Tips
		Tips: {
			enable: true,
			onShow: function(tip, node) {	
				// abre balaozinho quando mouse sobre node
				var html = "<h4>" + node.name + ": " + node.getData('dp_id') + "</h4><b> links:</b><ul><li>", list = [];
				node.eachAdjacency(
					function(adj) {
						list.push(adj.nodeTo.name);
					}
				);
				//append connections information
				//display node info in tooltip
				tip.innerHTML = html + list.join("</li><li>") + "</li></ul>";			
			}
		},
		
		// Add node events
		Events: {
			enable: true,
			type: 'Native',
			//Change cursor style when hovering a node
			onMouseEnter: function() {
				rfDemo.canvas.getElement().style.cursor = 'move';
			},
			onMouseLeave: function() {
				rfDemo.canvas.getElement().style.cursor = '';
			},
			// Update node positions when dragged
			onDragMove: function(node, eventInfo, e) {
				var pos = eventInfo.getPos();
				node.pos.setc(pos.x, pos.y);
				rfDemo.plot();
			},
			//Implement the same handler for touchscreens
			onTouchMove: function(node, eventInfo, e) {
				$jit.util.event.stop(e); //stop default touchmove event
				this.onDragMove(node, eventInfo, e);
			},
			//Add also a click handler to nodes
			onClick: function(node) {
				if(!node) return;
				lastClickedNode = node;
				rfDemo.printInfo(node);
			}
		},
		//Number of iterations for the rfDemo algorithm
		iterations: 200,
		//Edge length
		levelDistance: 130,
		// Add text to the labels.
		// This method is only triggered on label creation and only for DOM labels (not native canvas ones).
		onCreateLabel: function(domElement, node){
			domElement.innerHTML = node.name;
			var style = domElement.style;
			style.fontSize = "0.8em";
			style.color = "#ddd";
		},
		// Change node styles when DOM labels are placed or moved.
		onPlaceLabel: function(domElement, node){
			var style = domElement.style;
			var left = parseInt(style.left);
			var top = parseInt(style.top);
			var w = domElement.offsetWidth;
			style.left = (left - w / 2) + 'px';
			style.top = (top + 10) + 'px';
			style.display = '';
		}
	});
	
            // load JSON data.
	    rfDemo.loadJSON(jsonTopology);
	
	// compute positions incrementally and animate.
	rfDemo.computeIncremental({
		iter: 40,
		property: 'end',
		/*onStep: function(perc) {
			Log.write(perc + '% loaded...');
		},*/
		onComplete: function() {
			//Log.write('done');
			rfDemo.animate({
				modes: ['linear'],
				transition: 'nothing',
				duration: 2000
			});
		}
	});



        function dataTime(jsonTopology){
            var node = jsonTopology[0];
            var nodeData = node["data"];
            var timer = nodeData["timer"];
            return timer;
        }

        var originalTimer = dataTime(jsonTopology);

	// periodically json update function
	function topologyTimer() {

		var jqxhr = $.getJSON("lib/routeflow/json.js",
	        function(json){
			var data = json["nodes"];
			var newTimer = dataTime(data);
                        if(document.getElementById("selectedTab").value == "graph"){
			    if(newTimer != originalTimer){
				    originalTimer = newTimer;
				    rfDemo.updateJSON(data);
				    var startTime = new Date().getTime(); while(new Date().getTime() < startTime + 1000);
				    rfDemo.updateJSON(data);
			    }
                        }
		});
		setTimeout(statsTimer, 500);
	}
	
	function statsTimer() {
		var jqxhr = $.getJSON("lib/routeflow/jsonStats.js",
	                function(json){
				//alert("stats updated");
				var data = json["nodes"];
				rfDemo.loadStats(data);                       	
                	}
		);
		rfDemo.printInfo(lastClickedNode);
		setTimeout(topologyTimer, 500);
	}

	setTimeout(statsTimer, 2000);
	
}// end
