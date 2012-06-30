

exports.testSimple = require("./simple");



if (require.main === module.id) {
    // run tests
    var status = require("test/runner").run(exports);
    // exit
    require("os").exit(status);
}