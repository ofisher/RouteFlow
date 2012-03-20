// View Graph

dojo.declare("route.ViewGraph", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/viewGraph.html"),
    templateString: null,
    widgetsInTemplate: true,
    url: '',
    inputId: ''
});

dojo.declare("route.ViewRfEvents", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/viewRfEvents.html"),
    templateString: null,
    widgetsInTemplate: true,
    url: '',
    inputId: ''
});

dojo.declare("route.ViewTable", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/viewTable.html"),
    templateString: null,
    widgetsInTemplate: true,
    url: '',
    inputId: ''
});

dojo.declare("route.ViewSNMP", [dijit._Widget, dijit._Templated], {
    templatePath: dojo.moduleUrl("ion", "templates/viewSNMP.html"),
    templateString: null,
    widgetsInTemplate: true,
    url: '',
    inputId: ''
});

function viewGraph() {

    hideErrorDiv();

    selectTab('viewGraphId');
    deSelectTab('viewTopology');
    deSelectTab('viewRfEvents');
    deSelectTab('viewTable');
    deSelectTab('viewSNMP');

    document.getElementById("selectedTab").value = "graph";

    dijit.byId("contentDiv").setContent('<div dojoType="route.ViewGraph"></div>');

    graph_init();
}

function viewRfEvents() {

    hideErrorDiv();

    deSelectTab('viewGraphId');
    deSelectTab('viewTopology');
    selectTab('viewRfEvents');
    deSelectTab('viewTable');
    deSelectTab('viewSNMP');

    document.getElementById("selectedTab").value = "events";

    dijit.byId("contentDiv").setContent('<div dojoType="route.ViewRfEvents"></div>');

    rf-events_init();
}

function viewTable() {

    hideErrorDiv();

    deSelectTab('viewGraphId');
    deSelectTab('viewTopology');
    deSelectTab('viewRfEvents');
    selectTab('viewTable');
    deSelectTab('viewSNMP');

    document.getElementById("selectedTab").value = "table";

    dijit.byId("contentDiv").setContent('<div dojoType="route.ViewTable"></div>');

    table_init();
}

function viewSNMP() {

    hideErrorDiv();

    deSelectTab('viewGraphId');
    deSelectTab('viewTopology');
    deSelectTab('viewRfEvents');
    deSelectTab('viewTable');
    selectTab('viewSNMP');
    
    document.getElementById("selectedTab").value = "snmp";

    dijit.byId("contentDiv").setContent('<div dojoType="route.ViewSNMP"></div>');

    snmp_init();
}
