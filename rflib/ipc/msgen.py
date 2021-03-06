import sys

messages = []

# C++
typesMap = {
"i32": "uint32_t",
"i64": "uint64_t",
"bool": "bool",
"ip": "IPAddress",
"mac": "MACAddress",
"string": "string",
}

defaultValues = {
"i32": "0",
"i64": "0",
"bool": "false",
"ip": "IPAddress(IPV4)",
"mac": "MACAddress()",
"string": "\"\"",
}

exportType = {
"i32": "to_string<uint32_t>({0})",
"i64": "to_string<uint64_t>({0})",
"bool": "{0}",
"ip": "{0}.toString()",
"mac": "{0}.toString()",
"string": "{0}",
}

importType = {
"i32": "string_to<uint32_t>({0}.String())",
"i64": "string_to<uint64_t>({0}.String())",
"bool": "{0}.Bool()",
"ip": "IPAddress(IPV4, {0}.String())",
"mac": "MACAddress({0}.String())",
"string": "{0}.String()",
}

# Python
pyDefaultValues = {
"i32": "0",
"i64": "0",
"bool": "False",
"ip": "\"\"",
"mac": "\"\"",
"string": "\"\"",
}

pyExportType = {
"i32": "str({0})",
"i64": "str({0})",
"bool": "bool({0})",
"ip": "str({0})",
"mac": "str({0})",
"string": "{0}",
}

pyImportType = {
"i32": "int({0})",
"i64": "int({0})",
"bool": "bool({0})",
"ip": "str({0})",
"mac": "str({0})",
"string": "str({0})",
}

def convmsgtype(string):
    result = ""
    i = 0
    for char in string:
        if char.isupper():
            result += char
            i += 1
        else:
            break
    if i > 1:
        result = result[:-1]
        i -= 1
    for char in string[i:]:
        if char.isupper():
            result += " " + char.lower()
        else:
            result += char.lower()
    return result.replace(" ", "_").upper()
        
class CodeGenerator:
    def __init__(self):
        self.code = []
        self.indentLevel = 0
        
    def addLine(self, line):
        indent = self.indentLevel * "    "
        self.code.append(indent + line)
        
    def increaseIndent(self):
        self.indentLevel += 1
        
    def decreaseIndent(self):
        self.indentLevel -= 1
    
    def blankLine(self):
        self.code.append("")
        
    def __str__(self):
        return "\n".join(self.code)
        
    
def genH(messages, fname):
    g = CodeGenerator()
    
    g.addLine("#ifndef __" + fname.upper() + "_H__")
    g.addLine("#define __" + fname.upper() + "_H__")
    g.blankLine();
    g.addLine("#include <stdint.h>")
    g.blankLine();
    g.addLine("#include \"IPC.h\"")
    g.addLine("#include \"IPAddress.h\"")
    g.addLine("#include \"MACAddress.h\"")
    g.addLine("#include \"converter.h\"")
    g.blankLine();
    enum = "enum {\n\t"
    enum += ",\n\t".join([convmsgtype(name) for name, msg in messages]) 
    enum += "\n};"
    g.addLine(enum);
    g.blankLine();
    for (name, msg) in messages:
        g.addLine("class " + name + " : public IPCMessage {")
        g.increaseIndent()
        g.addLine("public:")
        g.increaseIndent()
        # Default constructor
        g.addLine(name + "();")
        # Constructor with parameters
        g.addLine("{0}({1});".format(name, ", ".join([typesMap[t] + " " + f for t, f in msg])))
        g.blankLine()
        for t, f in msg:
            g.addLine("{0} get_{1}();".format(typesMap[t], f))
            g.addLine("void set_{0}({1} {2});".format(f, typesMap[t], f))
            g.blankLine()
        g.addLine("virtual int get_type();")
        g.addLine("virtual void from_BSON(const char* data);")
        g.addLine("virtual const char* to_BSON();")
        g.addLine("virtual string str();")
        g.decreaseIndent();
        g.blankLine()
        g.addLine("private:")
        g.increaseIndent()
        for t, f in msg:
            g.addLine("{0} {1};".format(typesMap[t], f))
        g.decreaseIndent();
        g.decreaseIndent();
        g.addLine("};")
        g.blankLine();
        
    g.addLine("#endif /* __" + fname.upper() + "_H__ */")
    return str(g)
    
def genCPP(messages, fname):
    g = CodeGenerator()
    
    g.addLine("#include \"{0}.h\"".format(fname))
    g.blankLine()
    g.addLine("#include <mongo/client/dbclient.h>")
    g.blankLine()
    for name, msg in messages:
        g.addLine("{0}::{0}() {{".format(name))
        g.increaseIndent();
        for t, f in msg:
            g.addLine("set_{0}({1});".format(f, defaultValues[t]))
        g.decreaseIndent()
        g.addLine("}")
        g.blankLine();
        
        g.addLine("{0}::{0}({1}) {{".format(name, ", ".join([typesMap[t] + " " + f for t, f in msg])))
        g.increaseIndent();
        for t, f in msg:
            g.addLine("set_{0}({1});".format(f, f))
        g.decreaseIndent()
        g.addLine("}")
        g.blankLine();
        
        g.addLine("int {0}::get_type() {{".format(name))
        g.increaseIndent();
        g.addLine("return {0};".format(convmsgtype(name)))
        g.decreaseIndent()
        g.addLine("}")
        g.blankLine();

        for t, f in msg:
            g.addLine("{0} {1}::get_{2}() {{".format(typesMap[t], name, f))
            g.increaseIndent();
            g.addLine("return this->{0};".format(f))
            g.decreaseIndent()
            g.addLine("}")
            g.blankLine();
            
            g.addLine("void {0}::set_{1}({2} {3}) {{".format(name, f, typesMap[t], f))
            g.increaseIndent();
            g.addLine("this->{0} = {1};".format(f, f))
            g.decreaseIndent()
            g.addLine("}")
            g.blankLine();
        
        g.addLine("void {0}::from_BSON(const char* data) {{".format(name))
        g.increaseIndent();
        g.addLine("mongo::BSONObj obj(data);")
        for t, f in msg:
            value = "obj[\"{0}\"]".format(f)
            g.addLine("set_{0}({1});".format(f, importType[t].format(value)))
        g.decreaseIndent()
        g.addLine("}")
        g.blankLine();
        
        g.addLine("const char* {0}::to_BSON() {{".format(name))
        g.increaseIndent();
        g.addLine("mongo::BSONObjBuilder _b;")
        for t, f in msg:
            value = "get_{0}()".format(f)
            g.addLine("_b.append(\"{0}\", {1});".format(f, exportType[t].format(value)))
        g.addLine("mongo::BSONObj o = _b.obj();")
        g.addLine("char* data = new char[o.objsize()];")
        g.addLine("memcpy(data, o.objdata(), o.objsize());")
        g.addLine("return data;");
        g.decreaseIndent()
        g.addLine("}")
        g.blankLine();
        
        g.addLine("string {0}::str() {{".format(name))
        g.increaseIndent();
        g.addLine("stringstream ss;")

        g.addLine("ss << \"{0}\" << endl;".format(name))
        for t, f in msg:
            value = "get_{0}()".format(f)
            g.addLine("ss << \"  {0}: \" << {1} << endl;".format(f, exportType[t].format(value)))
        g.addLine("return ss.str();")
        g.decreaseIndent()
        g.addLine("}")
        g.blankLine();
        
    return str(g)

def genPy(messages, fname):
    g = CodeGenerator()

    g.addLine("import bson")    
    g.addLine("import pymongo as mongo")
    g.blankLine()
    g.addLine("from MongoIPC import MongoIPCMessage")
    
    g.blankLine()
    v = 0
    for name, msg in messages:
        g.addLine("{0} = {1}".format(convmsgtype(name), v))
        v += 1
    g.blankLine()
    for name, msg in messages:
        g.addLine("class {0}(MongoIPCMessage):".format(name))
        g.increaseIndent()
        g.addLine("def __init__(self, {0}):".format(", ".join([f + "=None" for t, f in msg])))
        g.increaseIndent()
        for t, f in msg:
            g.addLine("self.set_{0}({0})".format(f))
        g.decreaseIndent()
        g.blankLine();
        
        g.addLine("def get_type(self):")
        g.increaseIndent();
        g.addLine("return {0}".format(convmsgtype(name)))
        g.decreaseIndent()
        g.blankLine();

        for t, f in msg:
            g.addLine("def get_{0}(self):".format(f))
            g.increaseIndent();
            g.addLine("return self.{0}".format(f))
            g.decreaseIndent()
            g.blankLine();

            g.addLine("def set_{0}(self, {0}):".format(f))
            g.increaseIndent();
            g.addLine("{0} = {1} if {0} is None else {0}".format(f, pyDefaultValues[t]))
            g.addLine("try:")
            g.increaseIndent()
            g.addLine("self.{0} = {1}".format(f, pyImportType[t].format(f)))
            g.decreaseIndent()
            g.addLine("except:")
            g.increaseIndent()
            g.addLine("self.{0} = {1}".format(f, pyDefaultValues[t]))
            g.decreaseIndent()
            g.decreaseIndent()
            g.blankLine();

        g.addLine("def from_dict(self, data):")
        g.increaseIndent();
        for t, f in msg:
            g.addLine("self.set_{0}(data[\"{0}\"])".format(f))
        g.decreaseIndent()
        g.blankLine();
        
        g.addLine("def to_dict(self):")
        g.increaseIndent();
        g.addLine("data = {}")
        for t, f in msg:
            value = pyExportType[t].format("self.get_{0}()".format(f))
            g.addLine("data[\"{0}\"] = {1}".format(f, value))
        g.addLine("return data")
        g.decreaseIndent()
        g.blankLine();
        
        g.addLine("def from_bson(self, data):")
        g.increaseIndent()
        g.addLine("data = bson.BSON.decode(data)")
        g.addLine("self.from_dict(data)")
        g.decreaseIndent()
        g.blankLine()
        
        g.addLine("def to_bson(self):")
        g.increaseIndent()
        g.addLine("return bson.BSON.encode(self.get_dict())")
        g.decreaseIndent()
        g.blankLine()
                
        g.addLine("def __str__(self):")
        g.increaseIndent();
        g.addLine("s = \"{0}\\n\"".format(name))
        for t, f in msg:
            value = "self.get_{0}()".format(f)
            g.addLine("s += \"  {0}: \" + {1} + \"\\n\"".format(f, pyExportType[t].format(value)))
        g.addLine("return s")
        g.decreaseIndent()
        g.decreaseIndent()
        g.blankLine();
        
    return str(g)
    
# Text processing
fname = sys.argv[1]
f = open(fname, "r")
currentMessage = None
lines = [line.rstrip("\n") for line in f.readlines()]
f.close()
i = 0
for line in lines:
    parts = line.split()
    if len(parts) == 0:
        continue
    elif len(parts) == 1:
        currentMessage = parts[0]
        messages.append((currentMessage, []))
    elif len(parts) == 2:
        if currentMessage is None:
            print "Error: message not declared"
        messages[-1][1].append((parts[0], parts[1]))
    else:
        print "Error: invalid line"

f = open(fname + ".h", "w")
f.write(genH(messages, fname))
f.close()

f = open(fname + ".cc", "w")
f.write(genCPP(messages, fname))
f.close()

f = open(fname + ".py", "w")
f.write(genPy(messages, fname))
f.close()
