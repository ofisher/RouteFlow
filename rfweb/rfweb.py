#!/usr/bin/env python
#-*- coding:utf-8 -*-

from wsgiref.simple_server import make_server
from cgi import parse_qs, escape
import json
import urlparse
from wsgiref.util import shift_path_info
import pymongo
import bson.json_util
import os
import os.path

PLAIN = 0
HTML = 1
JSON = 2
CSS = 3
JS = 4
GIF = 5
PNG = 6
JPEG = 7

CONTENT_TYPES = {
PLAIN: "text/plain",
HTML: "text/html",
JSON: "application/json",
CSS: "text/css",
JS: "text/javascript",
GIF: "image/gif",
PNG: "image/png",
JPEG: "image/jpeg",
}

exts = {
".js": JS,
".html": HTML,
".css": CSS,
".png": PNG,
".gif": GIF,
".jpg": JPEG,
".jpeg": JPEG,
".json": JSON,
}

try:
    conn = pymongo.Connection("localhost", 27017)
except:
    pass
    
def messages(env):
    channel = shift_path_info(env)
    if channel != None and channel != "":
        # TODO: escape parameters
        messages = []
        try:
            table = getattr(conn.db, channel);
        except:
            return (404, "Invalid channel", JSON)
        
        request = parse_qs(env["QUERY_STRING"])
        limit = 50
        query = {}
        if "limit" in request:
            limit = request["limit"][0]
        if "types" in request:
            types = request["types"][0]
            query["$or"] = []
            for type_ in types.split(","):
                try:
                    value = int(type_)
                except:
                    continue
                query["$or"].append({"type": value})
        
        print query
        
        for doc in table.find(query, limit=limit, sort=[("$natural", pymongo.DESCENDING)]):
            messages.append(doc)
            
        return (200, json.dumps(messages, default=bson.json_util.default), JSON)
    
            
    else:
        return (404, "Channel not specified", JSON)
        
def switches(env):
    id_ = shift_path_info(env)
    if id_ != None and id_ != "":
        attr = shift_path_info(env)
        if attr == "stats":
            return (200, "Switch stats for switch={0}".format(id_), JSON)
        elif attr == "flowtable":
            return (200, "Flow table for switch={0}".format(id_), JSON)
        else:
            return (404, "Invalid switch attribute", JSON)
    else:
        return (404, "Switch not specified", JSON)
            
def rftable(env):
    entries = []
    for doc in conn.db.rftable.find():
        entries.append(doc)
    return (200, json.dumps(entries, default=bson.json_util.default), JSON)
    
def application(env, start_response):
    path = shift_path_info(env)
    request = parse_qs(env["QUERY_STRING"])
    try:
        callback = request["callback"][0]
    except KeyError:
        callback = None
    
    status = 404
    rbody = ""
    ctype = PLAIN
    
    if (path == "rftable"):
        status, rbody, ctype = rftable(env)
    elif (path == "switches"):
        status, rbody, ctype = switches(env)
    elif (path == "messages"):
        status, rbody, ctype = messages(env)
    else:
        path = os.path.join(os.getcwd(), path + env["PATH_INFO"])
        if os.path.exists(path) and os.path.isfile(path):
            f = open(path, "r");
            status = 200
            rbody = f.read()
            ctype = exts[os.path.splitext(path)[1]]
            f.close()
        else:
            status = 200
            rbody = "JSON requests:\n" \
                    "GET /rftable: RouteFlow table\n" \
                    "GET /switchs/[id]/stats: stats for switch [id]\n" \
                    "GET /switchs/[id]/flowtable: flowtable for switch [id]\n" \
                    "GET messages/[channel]: messages in channel [channel]\n" \
                    "\n" \
                    "Pages:\n" \
                    "/index.html: main page\n" \
                    "/rfgraph.html: new network graph (testing, unstable)\n"
                    
    if ctype == JSON and callback is not None:
        rbody = "{0}({1})".format(callback, rbody)
        
    if (status == 404):
        start_response("404 Not Found", [("Content-Type", CONTENT_TYPES[ctype])])
    elif (status == 200):
        start_response("200 OK", [("Content-Type", CONTENT_TYPES[ctype]),
                                  ("Content-Length", str(len(rbody)))])
                                  
    return [rbody]

httpd = make_server("", 8080, application)
httpd.serve_forever()
