function gmapsTopology_start(){
    
    selectTab('viewTopology');
    deSelectTab('viewGraphId');
    deSelectTab('viewRfEvents');
    deSelectTab('viewTable');
    deSelectTab('viewSNMP');

    document.getElementById("selectedTab").value = "map";

    dijit.byId("contentDiv").setContent('<div dojoType="ion.TopologyService"></div>');

    dojo.connect(dojo.byId("gmaps_topology_refreshButton"), "onclick", dojo.hitch(this, gmapsTopology_start));

    hideErrorDiv();
    dijit.byId("gmaps_topology_loadingDialog").show();

    gmapsTopology_init();

    var jqxhr = $.getJSON("lib/routeflow/json.js",
        function(json){
            var jsonTopology = json["nodes"];
            display_topology(jsonTopology);
    });

    dijit.byId("gmaps_topology_loadingDialog").hide();
}

function gmapsTopology_init(){
	
    map = new GMap2(document.getElementById("map_div"));
    map.setCenter(new GLatLng(-23.279196, -45.911865), 6);
    map.addControl(new GLargeMapControl());
    gmaps_initialized = true;
    map.addControl(new GMapTypeControl());
    // This is a trick to make sure when the google map resizes, that everything comes out properly
    map._lastCenter = map.getCenter();
    GEvent.addListener(map, 'moveend', function(){
        map._lastCenter = map.getCenter();
    });
    GEvent.addListener(map, 'resize', function(){
        map.setCenter(map._lastCenter);
    });
}

/*
 * Function to show the Topology of the Network at the GMap
 */
var line = "";
var oldLatLng = "";
var locsArray = new Array();

function changeDivBackgroundColor(divId, color){
	document.getElementById(divId).style.background = color;
}

function getIcon(type){
    var mapIcon = new GIcon(G_DEFAULT_ICON, G_DEFAULT_ICON);
    
    if(type == "host"){
        mapIcon = new GIcon(G_DEFAULT_ICON, "images/icons/host.png");
    } else if(type == "rf-server"){
        mapIcon = new GIcon(G_DEFAULT_ICON, "images/icons/rf-server.png");
    } else if(type == "of-switch"){
        mapIcon = new GIcon(G_DEFAULT_ICON, "images/icons/of-switch.png");
    } else if(type == "controller"){
        mapIcon = new GIcon(G_DEFAULT_ICON, "images/icons/controller.png");
    }

    return mapIcon;
}

function display_topology(topology){

    var color = "#0000FF";
    var maxLat = Number.NEGATIVE_INFINITY;
    var maxLon = Number.NEGATIVE_INFINITY;
    var minLat = Number.POSITIVE_INFINITY;
    var minLon = Number.POSITIVE_INFINITY;
    locsArray = new Array();
    
    for (var i = 0; i < topology.length; i++) {
        var topoElem = topology[i];
        var data = topoElem["data"];
        
        var location = new GLatLng(data["latitude"], data["longitude"]);
		//Calcula latitude e longitude maxima para calculo do centro
        if (data["latitude"] > maxLat) {
            maxLat = data["latitude"];
        }
        if (data["latitude"] < minLat) {
            minLat = data["latitude"]
        }
        if (data["longitude"] > maxLon) {
            maxLon = data["longitude"];
        }
        if (data["longitude"] < minLon) {
            minLon = data["longitude"]
        }

        var mapIcon = getIcon(data["$type"]);
               
        var marker = new GMarker(location, mapIcon);
        marker.value = topoElem;
        map.addOverlay(marker);
        
        GEvent.addListener(marker, "click", function(latlng){
            var topoElem = this.value;
            var data = topoElem["data"];
            var host_html = "";
            host_html += data["$type"] + ": " + topoElem["name"] + "<br>";

            var tab1 = new GInfoWindowTab("Host Information", host_html);
            var tabs = [tab1];
            map.openInfoWindowTabsHtml(latlng, tabs);
        });
        
        locsArray.push(location);

        var edges = topoElem["adjacencies"];
        if(edges.length > 0) {
            for(var j = 0; j < edges.length; j++) {
                var ed = edges[j];
                var nodeTo = ed["nodeTo"];
                var edData = ed["data"];
                var edColor = edData["$color"];
                var latTo = 0;
                var longTo = 0;

                var topologySearch = topology;
                for(var k = 0; k < topologySearch.length; k++) {
                    var actualTop = topologySearch[k];
                    if(nodeTo == actualTop["id"]){
                        var dataTo = actualTop["data"];
                        latTo += dataTo["latitude"];
                        longTo += dataTo["longitude"];
                        break;
                    }
                }

                var crt = new Array();
                crt.push(location);
                var dest = new GLatLng(latTo, longTo);
                crt.push(dest);
                var ed = new GPolyline(crt, edColor, 3);
                map.addOverlay(ed);

            }
        }
    }
    
    changeDivBackgroundColor('divColorUp', '#145D80');
    changeDivBackgroundColor('divColorDown', '#010101');
    
	//A linha calcula automaticamente pela biblioteca do google é montada para o calculo de zoom
    line = new GPolyline(locsArray, color, 3);
    
    var center = new GLatLng((maxLat + minLat) / 2, (maxLon + minLon) / 2);
    
    var zlevel = 7;
    if (line != null) {
        zlevel = map.getBoundsZoomLevel(line.getBounds());
    }
    
    map.setCenter(center, zlevel);
    
    dijit.byId('gmaps_topology_loadingDialog').hide();

    function dataTimeMap(jsonTopology){
        var node = jsonTopology[0];
        var nodeData = node["data"];
        var timer = nodeData["timer"];
        return timer;
    }

    var originalTimer = dataTimeMap(topology);

    function mapReload() {
        var jqxhr = $.getJSON("lib/routeflow/json.js",
	        function(json){
			var data = json["nodes"];
			var newTimer = dataTimeMap(data);
                        if(document.getElementById("selectedTab").value == "map"){
			    if(newTimer != originalTimer){
				    originalTimer = newTimer;
				    gmapsTopology_start();
			    }
                        }
		});
        // 4 seconds to timeout...
        // If it's less, the maps api will not have enough time to reload
        setTimeout(mapReload, 4000);
    }

        setTimeout(mapReload, 4000);  
}
