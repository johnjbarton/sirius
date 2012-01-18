
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
        result.push("var chrome = chrome || {};");
        result.push("chrome.debugger = chrome.debugger || {};\n");
        for (var i = 0; i < domains.length; ++i) {
            var domain = domains[i];
            result.push("chrome.debugger."+domain.domain+'= {\n');
            
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
                if (returnsText.length) {
                  result.push("/* returns: "+ returnsText.join(',')+"*/");
                }
                result.push(command.name+': function('+paramsText.join(',')+'),');
            }
            if (domain.events) {
                result.push('events: {');
                for (var j = 0; domain.events && j < domain.events.length; ++j) {
                    var event = domain.events[j];
                    var paramsText = [];
                    for (var k = 0; event.parameters && k < event.parameters.length; ++k) {
                        var parameter = event.parameters[k];
                        paramsText.push(parameter.name);
                    }
                    result.push(event.name + ": function(" + paramsText.join(", ") + ")");
                }
                result.push('}');
            }
            result.push("};\n");
        }
        return (result.join('\n'));
    }
};
