

var boilerPlateAMDFromQ = 
"(function (definition) {\n"+
"\n"+
"    // This file will function properly as a <script> tag, or a module\n"+
"    // using CommonJS and NodeJS or RequireJS module formats. In\n"+
"    // Common/Node/RequireJS, the module exports the chromeDebuggerRemote API and when\n"+
"    // executed as a simple <script>, it chromeDebuggerRemote a Q global instead.\n"+
"\n"+
"    // RequireJS\n"+
"    if (typeof define === 'function') {\n"+
"        define(definition);\n"+
"    // CommonJS\n"+
"     } else if (typeof exports === 'object') {\n"+
"         definition(exports);\n"+
"     // <script>, create global\n"+
"     } else {\n"+
"         definition(chromeDebuggerRemote = {});\n"+
"     }\n"+
"\n"+
"})(function (exports) {\n";

var tailFeathers = {

// Modified copy of InspectorBackend.js  loadFromJSONIfNeeded()

    loadInspectorJSON: function(inspectorJSONUrl)
    {
        if (this._initialized)
            return;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", inspectorJSONUrl, false);
        xhr.send(null);
    
        var schema = JSON.parse(xhr.responseText);
        var jsTypes = { integer: "number", array: "object" };
        var rawTypes = {};
    
        var domains = schema["domains"];
        for (var i = 0; i < domains.length; ++i) {
            var domain = domains[i];
            for (var j = 0; domain.types && j < domain.types.length; ++j) {
                var type = domain.types[j];
                rawTypes[domain.domain + "." + type.id] = jsTypes[type.type] || type.type;
            }
        }
    
        var result = [];
        var version = schema.version.major + '.' +schema.version.minor;
        result.push("/* Machine generated from "+inspectorJSONUrl+' version: '+version+" on "+new Date()+" */\n");
        result.push(boilerPlateAMDFromQ);
        result.push("var chromeDebuggerRemote = exports;");
        result.push("chromeDebuggerRemote.version = "+version+';\n');
        
        for (var i = 0; i < domains.length; ++i) {
            var domain = domains[i];
            var unsupported = domain.hidden ? '/* unsupported */ ' : '';
            result.push(unsupported+"\nchromeDebuggerRemote."+domain.domain+' = {');
            
            result.push("  commands: {");
            var commands = domain["commands"] || [];    
            for (var j = 0; j < commands.length; ++j) {
                var command = commands[j];
                var parameters = command["parameters"];
                var paramsText = [];
                for (var k = 0; parameters && k < parameters.length; ++k) {
                    var parameter = parameters[k];
    
                    var type;
                    if (parameter.type)
                        type = jsTypes[parameter.type] || parameter.type;
                    else {
                        var ref = parameter["$ref"];
                        if (ref.indexOf(".") !== -1)
                            type = rawTypes[ref];
                        else
                            type = rawTypes[domain.domain + "." + ref];
                    }
    
                    var text = parameter.name;
                    paramsText.push(text);
                }
    
                var returnsText = [];
                var returns = command["returns"] || [];
                for (var k = 0; k < returns.length; ++k) {
                    var parameter = returns[k];
                    returnsText.push( parameter.name );
                }
                var returnsString = "";
                if (returnsText.length) {
                  returnsString ="/*"+ returnsText.join(',')+" */";
                }
                var unsupported = command.hidden ? '/* unsupported */ ' : '';
                result.push('    '+unsupported+command.name+': '+returnsString+' function('+paramsText.join(', ')+'){},');
            }
            result.push('  },');
            if (domain.events && domain.events.length) {
                result.push('  events: {');
                for (var j = 0; domain.events && j < domain.events.length; ++j) {
                    var event = domain.events[j];
                    var paramsText = [];
                    for (var k = 0; event.parameters && k < event.parameters.length; ++k) {
                        var parameter = event.parameters[k];
                        paramsText.push(parameter.name);
                    }
                    var unsupported = event.hidden ? '/* unsupported */ ' : '';
                    result.push('    '+unsupported+event.name + ": function(" + paramsText.join(", ") + ") {},");
                }
                result.push('  }');
            }
            result.push("};\n");
        }
        result.push("return chromeDebuggerRemote;\n");
        
        result.push("/* copyright 2011 Google, inc. johnjbarton@google.com Google BSD License */");
        result.push("/* See https://github.com/johnjbarton/atopwi/blob/master/tailFeathers.html */");
        result.push(")};\n");
        
        return (result.join('\n'));
    }
};
