var labelType, useGradients, nativeTextSupport, animate;

(function() {
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
  animate = !(iStuff || !nativeCanvasSupport);
})();

function init(){
    var json = [
    {
        "id": "rfcontroller",
        "name": "RFController",
        "adjacencies": [{"nodeTo": "rfserver"}, 
                        {"nodeTo": "switch5"}, 
                        {"nodeTo": "switch6"}, 
                        {"nodeTo": "switch7"}, 
                        {"nodeTo": "switch8"}]
    },
    
    {
        "id": "rfserver",
        "name": "RFServer",
    },
    
    {
        "id": "switch5",
        "name": "A",
        "adjacencies": [{"nodeTo": "switch6"}, 
                        {"nodeTo": "switch7"}, 
                        {"nodeTo": "switch8"}],     
    },
    
    {
        "id": "switch6",
        "name": "B",
        "adjacencies": [{"nodeTo": "switch5"}, 
                        {"nodeTo": "switch8"}],          
    },
    
    {
        "id": "switch7",
        "name": "C",
        "adjacencies": [{"nodeTo": "switch5"}, 
                        {"nodeTo": "switch8"}],            
    },
    
    {
        "id": "switch8",
        "name": "D",
        "adjacencies": [{"nodeTo": "switch5"}, 
                        {"nodeTo": "switch6"}, 
                        {"nodeTo": "switch7"}],           
    }];

    var rgraph = new $jit.RGraph({
      'injectInto': 'infovis',
        Node: {
            'overridable': true,
             'color': '#cc0000',
             'dim': '20',
        },
        
        Edge: {
            'overridable': true,
            'color': '#cccc00'
        },
        
        Navigation: {  
          enable: true,  
          panning: "avoid nodes",  
          zooming: 100,
        },  
        
        interpolation: 'polar',

        transition: $jit.Trans.linear,
        duration: 250,
        fps: 30,
        levelDistance: 200,

        Events: {
            enable: true,  
            type: 'Native',
              
            onDragMove: function(node, eventInfo, e) {  
                var pos = eventInfo.getPos();  
                node.pos.setc(pos.x, pos.y);  
                rgraph.plot();  
            },

            onClick: function(node, eventInfo, e) {
                if (node)
                    rgraph.onClick(node.id, { hideLabels: false });
            },
            
            onRightClick: function(node, eventInfo, e) {
                if (node) {
                    var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
                    html += "<ul>";
                    node.eachAdjacency(function(adj){
                        var child = adj.nodeTo;
                        html += "<li>" + child.name + "</li>";
                    });
                    html += "</ul>";
                    $jit.id('inner-details').innerHTML = html;
                }
            },
        },
        
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.setAttribute("class", "label");
        },

        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        },
    });
    rgraph.loadJSON(json, 1);
    rgraph.refresh();
    rgraph.onClick("rfcontroller", { hideLabels: false });
}
