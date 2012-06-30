
function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var ASSERT = require("test/assert");
var UTIL = require("util");

var DOMPLATE = require("domplate", "domplate");


exports.testHelloWorld = function () {
    
    var rep;

    with (DOMPLATE.tags) {
        rep = DOMPLATE.domplate({
            tag: DIV({"style": "color: red;"},"$object|capitalize"),
            capitalize: function(str) {
                return str.toUpperCase();
            }
        });
    }    

    var html = rep.tag.render({
        object: "Hello World"
    });
    
    ASSERT.eq("<div style=\"color: red;\" class=\" \">HELLO WORLD</div>", html);

};


if (require.main === module.id)
    require("os").exit(require("test/runner").run(exports));
