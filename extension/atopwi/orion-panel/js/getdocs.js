
// function getResources() {
//     chrome.devtools.inspectedWindow.getResources(function(resources) {
//         console.log('Got ' + resources.length + ' resources: \n' + resources.map(function(r) {
//             return r.url;
//         }) + resource.getContent(function(callback) {
//			return callback.content;
//		}).join(',\n'));
//     });
// }

// getResources();
// chrome.devtools.onReset.addListener(getResources);


function getResources() {
    chrome.devtools.inspectedWindow.getResources(function(resources) {
        console.log('Got ' + resources.length + ' resources: \n' + resources.map(function(r) {
            return r.url;
        }).join(',\n'));
    });
}

getResources();
chrome.devtools.onReset.addListener(getResources);




