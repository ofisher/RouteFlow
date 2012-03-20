/**
 * @author arlake
 * @author aaron@internet2.edu
 */
dojo.provide("ion");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.Dialog");
dojo.require("dijit.ProgressBar");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.DateTextBox");
dojo.require("dijit.form.HorizontalSlider");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojo.data.ItemFileReadStore");
//kk inserted this for tooltip for create5_vlan
dojo.require("dijit.Tooltip");
//end kk

dojo.registerModulePath("ion", "../../ion");

/*
 * Set date to the american format to avoid errors in conversion
 */
function correctDate(date){
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

function selectTab(tabName){
    if(dojo.byId(tabName) != null) {
        dojo.attr(dojo.byId(tabName), 'class', 'selected');
    }
}

function deSelectTab(tabName){
    if(dojo.byId(tabName) != null) {
        dojo.attr(dojo.byId(tabName), 'class', '');
    }
}

function navAbout(){
    hideErrorDiv();
    
    //update primary nav
    var primaryNav = dojo.byId("primary");
    dojo.query('a', primaryNav).forEach(function(node){
        dojo.attr(node, 'class', '');
    });
    
    //update secondary nav
    var secondaryNav = dojo.byId("secondary");
    if (secondaryNav != null) {
        dojo.query('*', secondaryNav).forEach(dojo.destroy);
    }
    
    dijit.byId("contentDiv").setHref("about.html");
}

dojo.declare("ion.EndpointComboBox", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/endpointComboBox.html"),
    templateString: null,
    widgetsInTemplate: true,
    url: '',
    inputId: '',
    storeType: 'dojo.data.ItemFileReadStore',
    searchAttr: 'name'
});

dojo.declare("ion.EndpointBrowser", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/endpointBrowser.html"),
    templateString: null,
    url: '',
    target: '',
    folderIcon: '',
    closeIcon: '',
    nextPageIcon: '',
    prevPageIcon: '',
    initialCategory: '',
    categories: ["institution", "keywords", "name"],
    categoryLabels: ["Organization", "Keyword", "Name"],
    resultsPerPage: 5,
    postCreate: function(){
        //init
        this._catLinks = [];
        
        //set custom icons
        if (this.nextPageIcon == null || this.nextPageIcon == '') {
            this.nextPageElem = dojo.doc.createTextNode("Next");
        }
        else {
            this.nextPageElem = dojo.create("img", {
                "src": this.nextPageIcon
            });
        }
        if (this.prevPageIcon == null || this.prevPageIcon == '') {
            this.prevPageElem = dojo.doc.createTextNode("Previous");
        }
        else {
            this.prevPageElem = dojo.create("img", {
                "src": this.prevPageIcon
            });
        }
        
        //Build category list and browse menu
        for (var i = 0; i < this.categories.length; i++) {
            var catLabel = this.categories[i];
            if (this.categoryLabels != null && i < this.categoryLabels.length) {
                catLabel = this.categoryLabels[i];
            }
            var catLinkDiv = dojo.place("<div class=\"epbBrowseByLink\"></div>", this.browseMenuDiv);
            var catLink = dojo.place("<a href=\"#\">" + catLabel + "</a>", catLinkDiv);
            dojo.connect(catLink, "onclick", dojo.hitch(this, this.endpointBrowse, this.categories[i], 0, this.resultsPerPage, 0, null, null));
            dojo.place("<option value=\"" + this.categories[i] + "\">" +
            catLabel +
            "</option>", this.searchCatMenu);
            if (this.categories[i] == this.initialCategory) {
                dojo.attr(catLink, 'class', 'selected');
            }
            this._catLinks.push(catLink);
        }
        
        //initially show a category
        if (this.initialCategory != null && this.initialCategory != '') {
            this.endpointBrowse(this.initialCategory, 0, this.resultsPerPage, 0, null, null);
        }
    },
    endpointSearch: function(evt){
        dojo.xhrPost({
            url: this.url,
            form: this.searchForm,
            handleAs: "json",
            timeout: 30000,
            load: dojo.hitch(this, this.printSearchResults),
            error: dojo.hitch(this, this.handleSearchError)
        });
        //for form submits
        dojo.stopEvent(evt);
        return false;
    },
    endpointBrowse: function(cat, page, pageResults, rev, query, catVal){
        dojo.xhrPost({
            url: this.url,
            content: {
                "cat": cat,
                "page": page,
                "pageResults": pageResults,
                "reverse": rev,
                "query": query,
                "catVal": catVal
            },
            handleAs: "json",
            timeout: 30000,
            load: dojo.hitch(this, this.printSearchResults),
            error: dojo.hitch(this, this.handleSearchError)
        });
    },
    printSearchResults: function(response, ioArgs){
        this.resultsDiv.innerHTML = "";
        this.resultInfo.innerHTML = "";
        
        //check for application errors from server
        if (!response.success) {
            this.handleSearchError(response, ioArgs);
        }
        //print info about results
        var resultStart = response.page * response.pageResults + 1;
        var resultEnd = (resultStart + response.pageResults - 1);
        var infoHTML = "";
        if (response.totalResults != 0) {
            infoHTML = "Displaying results " + resultStart + "-";
            if (response.totalResults > resultEnd) {
                infoHTML += resultEnd;
            }
            else {
                infoHTML += response.totalResults;
            }
            infoHTML += " of " + response.totalResults;
        }
        this.resultInfo.innerHTML = infoHTML;
        
        //create containers
        var showResultsDiv = dojo.create("div", {
            "class": "epbDisplayResultsDiv"
        }, this.resultsDiv);
        var resultsTable = dojo.create("table", {
            "class": "epbResultsTable"
        }, showResultsDiv);
        //add category
        var catTr = dojo.create("tr", null, resultsTable)
        var catTd = dojo.create("td", {
            "class": "epbResultsCatLabel"
        }, catTr);
        var catIndex = dojo.indexOf(this.categories, response.cat);
        if (response.query != null) {
            dojo.place(dojo.doc.createTextNode("Search results for '" + response.query + "'"), catTd);
        }
        else 
            if (this.categoryLabels != null && catIndex != -1 &&
            catIndex < this.categoryLabels.length) {
            
                //change browse menu
                for (var j = 0; j < this._catLinks.length; j++) {
                    if (j == catIndex) {
                        dojo.attr(this._catLinks[j], 'class', 'selected');
                    }
                    else {
                        dojo.attr(this._catLinks[j], 'class', '');
                    }
                }
            /*var catLink = dojo.place("<a href='#'>"+this.categoryLabels[catIndex]+"</a>", catTd);
             dojo.connect(catLink, "onclick", dojo.hitch(this,
             this.endpointBrowse, response.cat, 0,
             this.resultsPerPage, response.reverse, null, null));*/
            }
            else {
                var catLink = dojo.place("<a href='#'>" + response.cat + "</a>", catTd);
                dojo.connect(catLink, "onclick", dojo.hitch(this, this.endpointBrowse, response.cat, 0, this.resultsPerPage, response.reverse, null, null));
            }
        if (response.catVal != null) {
            dojo.place(dojo.doc.createTextNode(response.catVal), catTd);
        }
        
        //add result rows
        for (var i = 0; i < response.results.length; i++) {
            var tr = dojo.create("tr", null, resultsTable)
            var td = dojo.create("td", null, tr);
            if (response.catVal == null && response.query == null &&
            response.cat != "name") {
                //category selection
                if (this.folderIcon != null && this.folderIcon != '') {
                    dojo.create("img", {
                        "src": this.folderIcon
                    }, td);
                }
                var resultLink = dojo.place("<a href=\"#\">" +
                response.results[i].value +
                "(" +
                response.results[i].subCount +
                ")</a>", td);
                dojo.connect(resultLink, "onclick", dojo.hitch(this, this.endpointBrowse, response.cat, 0, response.pageResults, response.reverse, null, response.results[i].value));
            }
            else {
                //selectable endpoint
                var resultLink = dojo.place("<a href=\"#\">" +
                response.results[i].value +
                "</a>", td);
                dojo.connect(resultLink, "onclick", dojo.hitch(this, this.selectEndpoint, response.results[i].value));
            }
        }
        //if no results
        if (response.results.length == 0) {
            var tr = dojo.create("tr", null, resultsTable)
            dojo.place("<td>No results match search</td>", tr);
        }
        
        //print page navigation
        var resultsPageNav = dojo.create("div", {
            "class": "epbResultsPageNav"
        }, this.resultsDiv);
        if (response.page != 0) {
            var prevLink = dojo.place("<a href=\"#\"></a>", resultsPageNav);
            dojo.place(this.prevPageElem, prevLink);
            dojo.connect(prevLink, "onclick", dojo.hitch(this, this.endpointBrowse, response.cat, (response.page - 1), response.pageResults, response.reverse, response.query, response.catVal));
            dojo.place(dojo.doc.createTextNode(" "), resultsPageNav);
        }
        for (var i = 1; i <= response.totalPages; i++) {
            if ((i - 1) == response.page) {
                dojo.place(dojo.doc.createTextNode(i + " "), resultsPageNav);
            }
            else {
                var pageLink = dojo.place("<a href=\"#\">" + i + "</a>", resultsPageNav);
                dojo.connect(pageLink, "onclick", dojo.hitch(this, this.endpointBrowse, response.cat, (i - 1), response.pageResults, response.reverse, response.query, response.catVal));
                dojo.place(dojo.doc.createTextNode(" "), resultsPageNav);
            }
        }
        if (response.page != (response.totalPages - 1) && response.results.length != 0) {
            var nextLink = dojo.place("<a href=\"#\"></a>", resultsPageNav);
            dojo.place(this.nextPageElem, nextLink);
            dojo.connect(nextLink, "onclick", dojo.hitch(this, this.endpointBrowse, response.cat, (response.page + 1), response.pageResults, response.reverse, response.query, response.catVal));
        }
    },
    handleSearchError: function(response, ioArgs){
        if (response.message != null) {
            //generic error since 500 errors are confusing
            showErrorDiv("There was an error contacting the " +
            "service that allows you to browse endpoints. This is a " +
            "server error so please contact the server administrator.");
        }
        else 
            if (response.status != null) {
                //server generated error so should be nicer
                showErrorDiv(response.status);
            }
    },
    closeWindow: function(){
        this.windowDiv.style.visibility = "hidden";
        this.windowDiv.style.display = "none";
    },
    openWindow: function(){
        var coords = dojo.coords(this.browseButton);
        this.windowDiv.style.top = coords.y + "px";
        this.windowDiv.style.left = coords.x + "px";
        this.windowDiv.style.visibility = "visible";
        this.windowDiv.style.display = "inline";
    },
    selectEndpoint: function(endpointName){
        dijit.byId(this.target).setValue(endpointName);
    },
    setURL: function(newUrl){
        this.url = newUrl;
    },
    setResultsDiv: function(divId){
        this.resultsDiv = dojo.byId(divId);
    },
    setTarget: function(fieldId){
        this.target = dijit.byId(fieldId);
    },
    setFolderIcon: function(imgAttrs){
        this.folderIcon = imgAttrs;
    },
    setNextPageElem: function(elem){
        this.nextPageElem = elem;
    },
    setPrevPageElem: function(elem){
        this.prevPageElem = elem;
    }
});

dojo.declare("ion.ModalBox", dijit.Dialog, {
    postCreate: function(){
        this.inherited(arguments);
        this.closeButtonNode.style.display = "none";
    }
});

dojo.declare("ion.Button", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/ionButton.html"),
    templateString: null,
    label: ''
});

function initTimeFields(duration, startDateId, startTimeId, endDateId, endTimeId){
    var now = new Date();
    dijit.byId(startDateId).setValue(now);
    var hour = now.getHours();
    hour = (hour > 9 ? '' : '0') + hour;
    var minute = now.getMinutes();
    minute = (minute > 9 ? '' : '0') + minute;
    dijit.byId(startTimeId).setValue(hour + ":" + minute);
    
    now.setSeconds(now.getSeconds() + duration);
    dijit.byId(endDateId).setValue(now);
    hour = now.getHours();
    hour = (hour > 9 ? '' : '0') + hour;
    minute = now.getMinutes();
    minute = (minute > 9 ? '' : '0') + minute;
    dijit.byId(endTimeId).setValue(hour + ":" + minute);
}

function printDuration(){
    var start = 0;
    if (dijit.byId('startDate') != null) {
        start = widgetToSeconds('startDate', 'startTime');
    }
    else {
        start = dojo.byId('startSeconds').value;
    }
    var end = 0;
    if (dijit.byId('endDate') != null) {
        end = widgetToSeconds('endDate', 'endTime');
    }
    else {
        end = dojo.byId('endSeconds').value;
    }
    
    printDurationBySecs('wizDuration', start, end);
}

function printDurationBySecs(outputField, start, end){
    if (!(isNaN(start) || isNaN(end))) {
        var duration = end - start;
        var durationString = "";
        while (duration > 0) {
            if (duration >= 86400) {
                var quo = Math.floor(duration / 86400);
                durationString += (Math.floor(duration / 86400) + " day");
                durationString += (quo > 1 ? "s " : " ");
                duration %= 86400;
            }
            else 
                if (duration >= 3600) {
                    var quo = Math.floor(duration / 3600);
                    durationString += (quo + " hour");
                    durationString += (quo > 1 ? "s " : " ");
                    duration %= 3600;
                }
                else 
                    if (duration >= 60) {
                        var quo = Math.floor(duration / 60);
                        durationString += (quo + " minute");
                        durationString += (quo > 1 ? "s " : " ");
                        duration %= 60;
                    }
                    else {
                        durationString += duration + " second";
                        durationString += (duration > 1 ? "s " : " ");
                        duration = 0;
                    }
        }
        dojo.byId(outputField).innerHTML = "";
        dojo.create(dojo.doc.createTextNode(durationString), null, dojo.byId(outputField));
    }
}

function widgetToSeconds(dateId, timeId){
    var dateWidget = dijit.byId(dateId);
    var timeWidget = dijit.byId(timeId);
    if (!dateWidget.isValid() || !timeWidget.isValid()) {
        return '';
    }
    var seconds = Date.parse(correctDate(dateWidget.getValue()) + " " + timeWidget.getValue()) / 1000;
    return seconds;
}

function secondsToWidget(seconds, dateId, timeId){
    if (seconds == "") {
        return;
    }
    var jsDate = new Date(seconds * 1000);
    var dateWidget = dijit.byId(dateId);
    dateWidget.setValue(jsDate);
    var hour = jsDate.getHours();
    hour = (hour > 9 ? '' : '0') + hour;
    var minute = jsDate.getMinutes();
    minute = (minute > 9 ? '' : '0') + minute;
    var formattedTime = hour + ":" + minute;
    var timeWidget = dijit.byId(timeId);
    timeWidget.setValue(formattedTime);
}

function secondsToSpan(seconds, dateId, timeId){
    if (seconds == "") {
        return;
    }
    var jsDate = new Date(seconds * 1000);
    var dateWidget = dojo.byId(dateId);
    dateWidget.innerHTML = (jsDate.getMonth() + 1) + '/' + jsDate.getDate() + '/' + jsDate.getFullYear();
    var hour = jsDate.getHours();
    hour = (hour > 9 ? '' : '0') + hour;
    var minute = jsDate.getMinutes();
    minute = (minute > 9 ? '' : '0') + minute;
    var formattedTime = hour + ":" + minute;
    var timeWidget = dojo.byId(timeId);
    timeWidget.innerHTML = formattedTime;
}

function formatBandwidth(fieldVal){
    if (fieldVal > 1000) {
        fieldVal /= 1000;
        fieldVal += " Gbps";
    }
    else {
        fieldVal += " Mbps";
    }
    return fieldVal;
}

function formatStatus(status, localStatus){
    if ((localStatus & 8) == 8) {
        status = '<span class="cancellingStatus">CANCELLING...</span>';
    }
    else 
        if (status == 'PENDING') {
            status = '<span class="reservedStatus">RESERVED</span>';
        }
        else 
            if (status == 'INSETUP') {
                status = '<span class="buildingStatus">BUILDING...</span>';
            }
            else 
                if (status == 'INTEARDOWN') {
                    status = '<span class="deletingStatus">DELETING...</span>';
                }
                else 
                    if (status == 'INMODIFY') {
                        status = '<span class="modifyingStatus">MODIFYING...</span>';
                    }
                    else {
                        status = ('<span class="' + status.toLowerCase() + 'Status">' + status + '</span>');
                    }
    
    return status;
}

function outputInterPath(path){
    if (path == null || path.length == 0) {
        return "";
    }
    var pathString = '<table class="pathTable">';
    var domainCount = 0;
    var lastURN = "";
    for (var i = 0; i < path.length; i++) {
        var urn = formatURN(path[i], 1);
        if (urn == lastURN) {
            continue;
        }
        lastURN = urn;
        pathString += '<tr class="pathRow' + ((domainCount % 2) == 1 ? 'Even' : 'Odd') + '"><td>';
        pathString += urn;
        pathString += '</td></tr>';
        domainCount++;
    }
    pathString += '</table>';
    
    return pathString;
}

function formatURN(urn, maxParts){
    if (!urn.match(/^urn:ogf:network/)) {
        return urn;
    }
    urn = urn.replace("urn:ogf:network:", "");
    urn = urn.replace("domain=", "");
    urn = urn.replace("node=", "");
    urn = urn.replace("port=", "");
    urn = urn.replace("link=", "");
    var urnParts = urn.split(":");
    if (urnParts == null || urnParts.length == 0) {
        return urn;
    }
    var newUrn = "Domain: " + urnParts[0];
    if (urnParts.length < 2 || maxParts < 2) {
        return newUrn;
    }
    newUrn += ", Node: " + urnParts[1];
    if (urnParts.length < 3 || maxParts < 3) {
        return newUrn;
    }
    newUrn += ", Port: " + urnParts[2];
    
    return newUrn;
}

function formatGRI(gri){
    return gri.replace(/.+\-/, '');
}

function formatDate(date){
    var jsDate = new Date(date * 1000);
    var month = jsDate.getMonth() + 1;
    month = (month > 9 ? '' : '0') + month;
    var day = jsDate.getDate();
    day = (day > 9 ? '' : '0') + day;
    var hour = jsDate.getHours();
    hour = (hour > 9 ? '' : '0') + hour;
    var minute = jsDate.getMinutes();
    minute = (minute > 9 ? '' : '0') + minute;
    return month + '/' + day + '/' + jsDate.getFullYear() + ' ' + hour + ':' + minute;
}

function defaultErrorMsg(){
    return "Unable to connect to server. Please contact the server administrator.";
}

function wizardCleanup(){
    //clean out old form elements to prevent dojo error
    dijit.registry.forEach(function(w){
        if (w.id != null &&
        (w.id.match(/^tmp/) || w.id.match(/^wiz/) ||
        w.id == 'startDate' ||
        w.id == 'startTime' ||
        w.id == 'endDate') ||
        w.id == 'endTime') {
            w.destroyRecursive();
        }
    });
}

function showErrorDiv(msg){
    hideErrorDiv();
    dojo.place('<div id="errorDiv"><div class="errorTop">&nbsp;</div>' + msg + '</div>', dojo.byId('content'), "first");
}

function hideErrorDiv(){
    if (dojo.byId('errorDiv') != null) {
        dojo.destroy(dojo.byId('errorDiv'));
    }
}

dojo.declare("ion.TopologyService", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/topology.html"),
    templateString: null,
    widgetsInTemplate: true,
    url: '',
    inputId: ''
});

/** GMaps functions **/
var topology;
var map;
var gmaps_initialized = false;

function gmaps_init(){
	hideErrorDiv();
	
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
    
    init_topology();
}

function init_topology(){
    dojo.xhrPost({
        url: "servlet/NodeInfo",
        timeout: 15000,
        handleAs: "json",
        load: handle_init_topology_response,
        sync: true,
        error: function(response, io_args){
    		if (response.status != null) {
    			showErrorDiv(response.status);
    		}
    		else {
    			showErrorDiv("Unable to load the topology information. Please contact the server administrator.");
    		}
        },
    });
}

function handle_init_topology_response(response, io_args){
    console.log("handle_init_topology_response()");
    topology = response;
}

function display_map(path){


    console.log("start");
    if (path == null || path.length == 0) {
        return;
    }
    var lastNode = "";
    var location_src = "";
    var color = "#0000FF";
    var src = "";
    var end = "";
    var locsArray = new Array();
    
    console.log("display_map.1");
    for (var i = 0; i < path.length; i++) {
        if (!path[i].match(/^urn:ogf:network/)) {
            continue;
        }
        console.log("display_map.2");
        path[i] = path[i].replace("urn:ogf:network:", "");
        path[i] = path[i].replace("node=", "");
        var urnParts = path[i].split(":");
        if (urnParts == null || urnParts.length < 2) {
            continue;
        }
        var topoElem = topology[urnParts[1]];
        if (topoElem == null) {
            console.log("Didn't find " + urnParts[1]);
            if (lastNode != "") {
                topology[lastNode]["egress"] = 1;
                lastNode = "";
            }
            continue;
        }
        
        if (!lastNode) {
            topoElem["ingress"] = 1;
        }
        
        var location = new GLatLng(topoElem["latitude"], topoElem["longitude"]);
        if (lastNode == urnParts[1]) {
            location_src = location;
            
            continue;
        }
        
        var marker = new GMarker(location);
        marker.value = topoElem;
        map.addOverlay(marker);
        lastNode = urnParts[1];
        
        
        GEvent.addListener(marker, "click", function(latlng){
            var topoElem = this.value;
            var host_html = "";
            host_html += "Switch: " + topoElem["name"] + "<br>";
            if (topoElem["ingress"]) {
                host_html += "Ingress Point";
            }
            if (topoElem["egress"]) {
                host_html += "Egress Point";
            }
            var tab1 = new GInfoWindowTab("Host Information", host_html);
            var tabs = [tab1];
            map.openInfoWindowTabsHtml(latlng, tabs);
        });
        
        console.log("1");
        if (location_src == "") {
            location_src = location;
            console.log("2");
        }
        else {
            if (line == null) {
                locsArray.push(location_src);
                locsArray.push(location);
            }
            else 
                locsArray.push(location);
            
            location_src = "";
            console.log("3");
        }
        
        console.log("4");
        if (i == 0) 
            src = location;
        end = location;
        
    }
    
    var line = new GPolyline(locsArray, color, 3);
    map.addOverlay(line);
    
    if (lastNode != "") {
        topology[lastNode]["egress"] = 1;
        lastNode = "";
    }
    
    var center = new GLatLng((end.lat() + src.lat()) / 2, (end.lng() + src.lng()) / 2);
    var zlevel = 7;
    if (line != null) {
        zlevel = map.getBoundsZoomLevel(line.getBounds());
    }
    
    map.setCenter(center, zlevel);
}



