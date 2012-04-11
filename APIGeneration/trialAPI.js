/* Machine generated from ../inspector/Inspector.json version: 0.1 on Tue Apr 10 2012 17:30:38 GMT-0700 (PDT) */

(function () {
var chrome = chrome || {};
chrome.devtools = chrome.devtools || {};
chrome.devtools.proxy = chrome.devtools.proxy || {};
chrome.devtools.proxy.version = 0.1;

/* unsupported */ 
chrome.devtools.proxy.Inspector = {};
chrome.devtools.proxy.Inspector.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Inspector', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Inspector', 'disable', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    evaluateForTestInFrontend: function(testCallId, script) {},
    inspect: function(object, hints) {},
    didCreateWorker: function(id, url, isShared) {},
    didDestroyWorker: function(id) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Inspector', this);
        chrome.devtools.proxy.registerEvent(
            'Inspector', 
            'evaluateForTestInFrontend', 
            ['testCallId', 'script']);
        chrome.devtools.proxy.registerEvent(
            'Inspector', 
            'inspect', 
            ['object', 'hints']);
        chrome.devtools.proxy.registerEvent(
            'Inspector', 
            'didCreateWorker', 
            ['id', 'url', 'isShared']);
        chrome.devtools.proxy.registerEvent(
            'Inspector', 
            'didDestroyWorker', 
            ['id']);
    },
};

/* unsupported */ 
chrome.devtools.proxy.Memory = {};
chrome.devtools.proxy.Memory.prototype = {

    // Commands: 
    getDOMNodeCount: function(opt_callback/*(count)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Memory', 'getDOMNodeCount', paramObject, opt_callback);
    },
};


chrome.devtools.proxy.Page = {};
chrome.devtools.proxy.Page.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Page', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Page', 'disable', paramObject, opt_callback);
    },
    /* unsupported */ addScriptToEvaluateOnLoad: function(scriptSource, opt_callback/*(identifier)*/) {
        var paramObject = {
             'scriptSource': scriptSource,
         };
        chrome.devtools.proxy.sendCommand('Page', 'addScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    /* unsupported */ removeScriptToEvaluateOnLoad: function(identifier, opt_callback) {
        var paramObject = {
             'identifier': identifier,
         };
        chrome.devtools.proxy.sendCommand('Page', 'removeScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    reload: function(ignoreCache, scriptToEvaluateOnLoad, opt_callback) {
        var paramObject = {
             'ignoreCache': ignoreCache,
             'scriptToEvaluateOnLoad': scriptToEvaluateOnLoad,
         };
        chrome.devtools.proxy.sendCommand('Page', 'reload', paramObject, opt_callback);
    },
    /* unsupported */ open: function(url, newWindow, opt_callback) {
        var paramObject = {
             'url': url,
             'newWindow': newWindow,
         };
        chrome.devtools.proxy.sendCommand('Page', 'open', paramObject, opt_callback);
    },
    /* unsupported */ getCookies: function(opt_callback/*(cookies,cookiesString)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Page', 'getCookies', paramObject, opt_callback);
    },
    /* unsupported */ deleteCookie: function(cookieName, domain, opt_callback) {
        var paramObject = {
             'cookieName': cookieName,
             'domain': domain,
         };
        chrome.devtools.proxy.sendCommand('Page', 'deleteCookie', paramObject, opt_callback);
    },
    /* unsupported */ getResourceTree: function(opt_callback/*(frameTree)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Page', 'getResourceTree', paramObject, opt_callback);
    },
    /* unsupported */ getResourceContent: function(frameId, url, opt_callback/*(content,base64Encoded)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
         };
        chrome.devtools.proxy.sendCommand('Page', 'getResourceContent', paramObject, opt_callback);
    },
    /* unsupported */ searchInResource: function(frameId, url, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.devtools.proxy.sendCommand('Page', 'searchInResource', paramObject, opt_callback);
    },
    /* unsupported */ searchInResources: function(text, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'text': text,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.devtools.proxy.sendCommand('Page', 'searchInResources', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    domContentEventFired: function(timestamp) {},
    loadEventFired: function(timestamp) {},
    /* unsupported */ frameNavigated: function(frame) {},
    /* unsupported */ frameDetached: function(frameId) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Page', this);
        chrome.devtools.proxy.registerEvent(
            'Page', 
            'domContentEventFired', 
            ['timestamp']);
        chrome.devtools.proxy.registerEvent(
            'Page', 
            'loadEventFired', 
            ['timestamp']);
        chrome.devtools.proxy.registerEvent(
            'Page', 
            'frameNavigated', 
            ['frame']);
        chrome.devtools.proxy.registerEvent(
            'Page', 
            'frameDetached', 
            ['frameId']);
    },
};


chrome.devtools.proxy.Runtime = {};
chrome.devtools.proxy.Runtime.prototype = {

    // Commands: 
    evaluate: function(expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptions, frameId, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'doNotPauseOnExceptions': doNotPauseOnExceptions,
             'frameId': frameId,
             'returnByValue': returnByValue,
         };
        chrome.devtools.proxy.sendCommand('Runtime', 'evaluate', paramObject, opt_callback);
    },
    callFunctionOn: function(objectId, functionDeclaration, arguments, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'objectId': objectId,
             'functionDeclaration': functionDeclaration,
             'arguments': arguments,
             'returnByValue': returnByValue,
         };
        chrome.devtools.proxy.sendCommand('Runtime', 'callFunctionOn', paramObject, opt_callback);
    },
    getProperties: function(objectId, ownProperties, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'ownProperties': ownProperties,
         };
        chrome.devtools.proxy.sendCommand('Runtime', 'getProperties', paramObject, opt_callback);
    },
    releaseObject: function(objectId, opt_callback) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.proxy.sendCommand('Runtime', 'releaseObject', paramObject, opt_callback);
    },
    releaseObjectGroup: function(objectGroup, opt_callback) {
        var paramObject = {
             'objectGroup': objectGroup,
         };
        chrome.devtools.proxy.sendCommand('Runtime', 'releaseObjectGroup', paramObject, opt_callback);
    },
    /* unsupported */ run: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Runtime', 'run', paramObject, opt_callback);
    },
};


chrome.devtools.proxy.Console = {};
chrome.devtools.proxy.Console.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Console', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Console', 'disable', paramObject, opt_callback);
    },
    clearMessages: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Console', 'clearMessages', paramObject, opt_callback);
    },
    /* unsupported */ setMonitoringXHREnabled: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.devtools.proxy.sendCommand('Console', 'setMonitoringXHREnabled', paramObject, opt_callback);
    },
    /* unsupported */ addInspectedNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('Console', 'addInspectedNode', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    messageAdded: function(message) {},
    messageRepeatCountUpdated: function(count) {},
    messagesCleared: function() {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Console', this);
        chrome.devtools.proxy.registerEvent(
            'Console', 
            'messageAdded', 
            ['message']);
        chrome.devtools.proxy.registerEvent(
            'Console', 
            'messageRepeatCountUpdated', 
            ['count']);
        chrome.devtools.proxy.registerEvent(
            'Console', 
            'messagesCleared', 
            ['']);
    },
};


chrome.devtools.proxy.Network = {};
chrome.devtools.proxy.Network.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Network', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Network', 'disable', paramObject, opt_callback);
    },
    setUserAgentOverride: function(userAgent, opt_callback) {
        var paramObject = {
             'userAgent': userAgent,
         };
        chrome.devtools.proxy.sendCommand('Network', 'setUserAgentOverride', paramObject, opt_callback);
    },
    setExtraHTTPHeaders: function(headers, opt_callback) {
        var paramObject = {
             'headers': headers,
         };
        chrome.devtools.proxy.sendCommand('Network', 'setExtraHTTPHeaders', paramObject, opt_callback);
    },
    getResponseBody: function(requestId, opt_callback/*(body,base64Encoded)*/) {
        var paramObject = {
             'requestId': requestId,
         };
        chrome.devtools.proxy.sendCommand('Network', 'getResponseBody', paramObject, opt_callback);
    },
    canClearBrowserCache: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Network', 'canClearBrowserCache', paramObject, opt_callback);
    },
    clearBrowserCache: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Network', 'clearBrowserCache', paramObject, opt_callback);
    },
    canClearBrowserCookies: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Network', 'canClearBrowserCookies', paramObject, opt_callback);
    },
    clearBrowserCookies: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Network', 'clearBrowserCookies', paramObject, opt_callback);
    },
    setCacheDisabled: function(cacheDisabled, opt_callback) {
        var paramObject = {
             'cacheDisabled': cacheDisabled,
         };
        chrome.devtools.proxy.sendCommand('Network', 'setCacheDisabled', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    requestWillBeSent: function(requestId, frameId, loaderId, documentURL, request, timestamp, initiator, stackTrace, redirectResponse) {},
    requestServedFromCache: function(requestId) {},
    responseReceived: function(requestId, frameId, loaderId, timestamp, type, response) {},
    dataReceived: function(requestId, timestamp, dataLength, encodedDataLength) {},
    loadingFinished: function(requestId, timestamp) {},
    loadingFailed: function(requestId, timestamp, errorText, canceled) {},
    requestServedFromMemoryCache: function(requestId, frameId, loaderId, documentURL, timestamp, initiator, resource) {},
    /* unsupported */ webSocketWillSendHandshakeRequest: function(requestId, timestamp, request) {},
    /* unsupported */ webSocketHandshakeResponseReceived: function(requestId, timestamp, response) {},
    /* unsupported */ webSocketCreated: function(requestId, url) {},
    /* unsupported */ webSocketClosed: function(requestId, timestamp) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Network', this);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'requestWillBeSent', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'request', 'timestamp', 'initiator', 'stackTrace', 'redirectResponse']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'requestServedFromCache', 
            ['requestId']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'responseReceived', 
            ['requestId', 'frameId', 'loaderId', 'timestamp', 'type', 'response']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'dataReceived', 
            ['requestId', 'timestamp', 'dataLength', 'encodedDataLength']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'loadingFinished', 
            ['requestId', 'timestamp']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'loadingFailed', 
            ['requestId', 'timestamp', 'errorText', 'canceled']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'requestServedFromMemoryCache', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'timestamp', 'initiator', 'resource']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'webSocketWillSendHandshakeRequest', 
            ['requestId', 'timestamp', 'request']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'webSocketHandshakeResponseReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'webSocketCreated', 
            ['requestId', 'url']);
        chrome.devtools.proxy.registerEvent(
            'Network', 
            'webSocketClosed', 
            ['requestId', 'timestamp']);
    },
};

/* unsupported */ 
chrome.devtools.proxy.Database = {};
chrome.devtools.proxy.Database.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Database', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Database', 'disable', paramObject, opt_callback);
    },
    getDatabaseTableNames: function(databaseId, opt_callback/*(tableNames)*/) {
        var paramObject = {
             'databaseId': databaseId,
         };
        chrome.devtools.proxy.sendCommand('Database', 'getDatabaseTableNames', paramObject, opt_callback);
    },
    executeSQL: function(databaseId, query, opt_callback/*(success,transactionId)*/) {
        var paramObject = {
             'databaseId': databaseId,
             'query': query,
         };
        chrome.devtools.proxy.sendCommand('Database', 'executeSQL', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    addDatabase: function(database) {},
    sqlTransactionSucceeded: function(transactionId, columnNames, values) {},
    sqlTransactionFailed: function(transactionId, sqlError) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Database', this);
        chrome.devtools.proxy.registerEvent(
            'Database', 
            'addDatabase', 
            ['database']);
        chrome.devtools.proxy.registerEvent(
            'Database', 
            'sqlTransactionSucceeded', 
            ['transactionId', 'columnNames', 'values']);
        chrome.devtools.proxy.registerEvent(
            'Database', 
            'sqlTransactionFailed', 
            ['transactionId', 'sqlError']);
    },
};

/* unsupported */ 
chrome.devtools.proxy.DOMStorage = {};
chrome.devtools.proxy.DOMStorage.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('DOMStorage', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('DOMStorage', 'disable', paramObject, opt_callback);
    },
    getDOMStorageEntries: function(storageId, opt_callback/*(entries)*/) {
        var paramObject = {
             'storageId': storageId,
         };
        chrome.devtools.proxy.sendCommand('DOMStorage', 'getDOMStorageEntries', paramObject, opt_callback);
    },
    setDOMStorageItem: function(storageId, key, value, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
             'value': value,
         };
        chrome.devtools.proxy.sendCommand('DOMStorage', 'setDOMStorageItem', paramObject, opt_callback);
    },
    removeDOMStorageItem: function(storageId, key, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
         };
        chrome.devtools.proxy.sendCommand('DOMStorage', 'removeDOMStorageItem', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    addDOMStorage: function(storage) {},
    updateDOMStorage: function(storageId) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('DOMStorage', this);
        chrome.devtools.proxy.registerEvent(
            'DOMStorage', 
            'addDOMStorage', 
            ['storage']);
        chrome.devtools.proxy.registerEvent(
            'DOMStorage', 
            'updateDOMStorage', 
            ['storageId']);
    },
};

/* unsupported */ 
chrome.devtools.proxy.ApplicationCache = {};
chrome.devtools.proxy.ApplicationCache.prototype = {

    // Commands: 
    getFramesWithManifests: function(opt_callback/*(frameIds)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('ApplicationCache', 'getFramesWithManifests', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('ApplicationCache', 'enable', paramObject, opt_callback);
    },
    getManifestForFrame: function(frameId, opt_callback/*(manifestURL)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.proxy.sendCommand('ApplicationCache', 'getManifestForFrame', paramObject, opt_callback);
    },
    getApplicationCacheForFrame: function(frameId, opt_callback/*(applicationCache)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.devtools.proxy.sendCommand('ApplicationCache', 'getApplicationCacheForFrame', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    applicationCacheStatusUpdated: function(frameId, manifestURL, status) {},
    networkStateUpdated: function(isNowOnline) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('ApplicationCache', this);
        chrome.devtools.proxy.registerEvent(
            'ApplicationCache', 
            'applicationCacheStatusUpdated', 
            ['frameId', 'manifestURL', 'status']);
        chrome.devtools.proxy.registerEvent(
            'ApplicationCache', 
            'networkStateUpdated', 
            ['isNowOnline']);
    },
};

/* unsupported */ 
chrome.devtools.proxy.FileSystem = {};
chrome.devtools.proxy.FileSystem.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('FileSystem', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('FileSystem', 'disable', paramObject, opt_callback);
    },
};


chrome.devtools.proxy.DOM = {};
chrome.devtools.proxy.DOM.prototype = {

    // Commands: 
    getDocument: function(opt_callback/*(root)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('DOM', 'getDocument', paramObject, opt_callback);
    },
    requestChildNodes: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'requestChildNodes', paramObject, opt_callback);
    },
    querySelector: function(nodeId, selector, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'querySelector', paramObject, opt_callback);
    },
    querySelectorAll: function(nodeId, selector, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'querySelectorAll', paramObject, opt_callback);
    },
    setNodeName: function(nodeId, name, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'setNodeName', paramObject, opt_callback);
    },
    setNodeValue: function(nodeId, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'value': value,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'setNodeValue', paramObject, opt_callback);
    },
    removeNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'removeNode', paramObject, opt_callback);
    },
    setAttributeValue: function(nodeId, name, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
             'value': value,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'setAttributeValue', paramObject, opt_callback);
    },
    setAttributesAsText: function(nodeId, text, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'text': text,
             'name': name,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'setAttributesAsText', paramObject, opt_callback);
    },
    removeAttribute: function(nodeId, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'removeAttribute', paramObject, opt_callback);
    },
    /* unsupported */ getEventListenersForNode: function(nodeId, opt_callback/*(listeners)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'getEventListenersForNode', paramObject, opt_callback);
    },
    /* unsupported */ copyNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'copyNode', paramObject, opt_callback);
    },
    getOuterHTML: function(nodeId, opt_callback/*(outerHTML)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'getOuterHTML', paramObject, opt_callback);
    },
    setOuterHTML: function(nodeId, outerHTML, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'outerHTML': outerHTML,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'setOuterHTML', paramObject, opt_callback);
    },
    /* unsupported */ performSearch: function(query, opt_callback/*(searchId,resultCount)*/) {
        var paramObject = {
             'query': query,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'performSearch', paramObject, opt_callback);
    },
    /* unsupported */ getSearchResults: function(searchId, fromIndex, toIndex, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'searchId': searchId,
             'fromIndex': fromIndex,
             'toIndex': toIndex,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'getSearchResults', paramObject, opt_callback);
    },
    /* unsupported */ discardSearchResults: function(searchId, opt_callback) {
        var paramObject = {
             'searchId': searchId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'discardSearchResults', paramObject, opt_callback);
    },
    requestNode: function(objectId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'requestNode', paramObject, opt_callback);
    },
    /* unsupported */ setInspectModeEnabled: function(enabled, highlightConfig, opt_callback) {
        var paramObject = {
             'enabled': enabled,
             'highlightConfig': highlightConfig,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'setInspectModeEnabled', paramObject, opt_callback);
    },
    highlightRect: function(x, y, width, height, color, outlineColor, opt_callback) {
        var paramObject = {
             'x': x,
             'y': y,
             'width': width,
             'height': height,
             'color': color,
             'outlineColor': outlineColor,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'highlightRect', paramObject, opt_callback);
    },
    highlightNode: function(nodeId, highlightConfig, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'highlightConfig': highlightConfig,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'highlightNode', paramObject, opt_callback);
    },
    hideHighlight: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('DOM', 'hideHighlight', paramObject, opt_callback);
    },
    /* unsupported */ highlightFrame: function(frameId, contentColor, contentOutlineColor, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'contentColor': contentColor,
             'contentOutlineColor': contentOutlineColor,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'highlightFrame', paramObject, opt_callback);
    },
    /* unsupported */ pushNodeByPathToFrontend: function(path, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'path': path,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'pushNodeByPathToFrontend', paramObject, opt_callback);
    },
    resolveNode: function(nodeId, objectGroup, opt_callback/*(object)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'objectGroup': objectGroup,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'resolveNode', paramObject, opt_callback);
    },
    getAttributes: function(nodeId, opt_callback/*(attributes)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'getAttributes', paramObject, opt_callback);
    },
    moveTo: function(nodeId, targetNodeId, insertBeforeNodeId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'targetNodeId': targetNodeId,
             'insertBeforeNodeId': insertBeforeNodeId,
         };
        chrome.devtools.proxy.sendCommand('DOM', 'moveTo', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    documentUpdated: function() {},
    setChildNodes: function(parentId, nodes) {},
    attributeModified: function(nodeId, name, value) {},
    attributeRemoved: function(nodeId, name) {},
    /* unsupported */ inlineStyleInvalidated: function(nodeIds) {},
    characterDataModified: function(nodeId, characterData) {},
    childNodeCountUpdated: function(nodeId, childNodeCount) {},
    childNodeInserted: function(parentNodeId, previousNodeId, node) {},
    childNodeRemoved: function(parentNodeId, nodeId) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('DOM', this);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'documentUpdated', 
            ['']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'setChildNodes', 
            ['parentId', 'nodes']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'attributeModified', 
            ['nodeId', 'name', 'value']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'attributeRemoved', 
            ['nodeId', 'name']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'inlineStyleInvalidated', 
            ['nodeIds']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'characterDataModified', 
            ['nodeId', 'characterData']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'childNodeCountUpdated', 
            ['nodeId', 'childNodeCount']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'childNodeInserted', 
            ['parentNodeId', 'previousNodeId', 'node']);
        chrome.devtools.proxy.registerEvent(
            'DOM', 
            'childNodeRemoved', 
            ['parentNodeId', 'nodeId']);
    },
};

/* unsupported */ 
chrome.devtools.proxy.CSS = {};
chrome.devtools.proxy.CSS.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('CSS', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('CSS', 'disable', paramObject, opt_callback);
    },
    getMatchedStylesForNode: function(nodeId, forcedPseudoClasses, includePseudo, includeInherited, opt_callback/*(matchedCSSRules,pseudoElements,inherited)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
             'includePseudo': includePseudo,
             'includeInherited': includeInherited,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'getMatchedStylesForNode', paramObject, opt_callback);
    },
    getInlineStylesForNode: function(nodeId, opt_callback/*(inlineStyle,styleAttributes)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'getInlineStylesForNode', paramObject, opt_callback);
    },
    getComputedStyleForNode: function(nodeId, forcedPseudoClasses, opt_callback/*(computedStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'getComputedStyleForNode', paramObject, opt_callback);
    },
    getAllStyleSheets: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('CSS', 'getAllStyleSheets', paramObject, opt_callback);
    },
    getStyleSheet: function(styleSheetId, opt_callback/*(styleSheet)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'getStyleSheet', paramObject, opt_callback);
    },
    getStyleSheetText: function(styleSheetId, opt_callback/*(text)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'getStyleSheetText', paramObject, opt_callback);
    },
    setStyleSheetText: function(styleSheetId, text, opt_callback) {
        var paramObject = {
             'styleSheetId': styleSheetId,
             'text': text,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'setStyleSheetText', paramObject, opt_callback);
    },
    setPropertyText: function(styleId, propertyIndex, text, overwrite, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'text': text,
             'overwrite': overwrite,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'setPropertyText', paramObject, opt_callback);
    },
    toggleProperty: function(styleId, propertyIndex, disable, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'disable': disable,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'toggleProperty', paramObject, opt_callback);
    },
    setRuleSelector: function(ruleId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'ruleId': ruleId,
             'selector': selector,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'setRuleSelector', paramObject, opt_callback);
    },
    addRule: function(contextNodeId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'contextNodeId': contextNodeId,
             'selector': selector,
         };
        chrome.devtools.proxy.sendCommand('CSS', 'addRule', paramObject, opt_callback);
    },
    getSupportedCSSProperties: function(opt_callback/*(cssProperties)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('CSS', 'getSupportedCSSProperties', paramObject, opt_callback);
    },
    startSelectorProfiler: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('CSS', 'startSelectorProfiler', paramObject, opt_callback);
    },
    stopSelectorProfiler: function(opt_callback/*(profile)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('CSS', 'stopSelectorProfiler', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    mediaQueryResultChanged: function() {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('CSS', this);
        chrome.devtools.proxy.registerEvent(
            'CSS', 
            'mediaQueryResultChanged', 
            ['']);
    },
};


chrome.devtools.proxy.Timeline = {};
chrome.devtools.proxy.Timeline.prototype = {

    // Commands: 
    start: function(maxCallStackDepth, opt_callback) {
        var paramObject = {
             'maxCallStackDepth': maxCallStackDepth,
         };
        chrome.devtools.proxy.sendCommand('Timeline', 'start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Timeline', 'stop', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    eventRecorded: function(record) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Timeline', this);
        chrome.devtools.proxy.registerEvent(
            'Timeline', 
            'eventRecorded', 
            ['record']);
    },
};


chrome.devtools.proxy.Debugger = {};
chrome.devtools.proxy.Debugger.prototype = {

    // Commands: 
    /* unsupported */ causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'causesRecompilation', paramObject, opt_callback);
    },
    /* unsupported */ supportsNativeBreakpoints: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'supportsNativeBreakpoints', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'disable', paramObject, opt_callback);
    },
    setBreakpointsActive: function(active, opt_callback) {
        var paramObject = {
             'active': active,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'setBreakpointsActive', paramObject, opt_callback);
    },
    setBreakpointByUrl: function(lineNumber, url, urlRegex, columnNumber, condition, opt_callback/*(breakpointId,locations)*/) {
        var paramObject = {
             'lineNumber': lineNumber,
             'url': url,
             'urlRegex': urlRegex,
             'columnNumber': columnNumber,
             'condition': condition,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'setBreakpointByUrl', paramObject, opt_callback);
    },
    setBreakpoint: function(location, condition, opt_callback/*(breakpointId,actualLocation)*/) {
        var paramObject = {
             'location': location,
             'condition': condition,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'setBreakpoint', paramObject, opt_callback);
    },
    removeBreakpoint: function(breakpointId, opt_callback) {
        var paramObject = {
             'breakpointId': breakpointId,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'removeBreakpoint', paramObject, opt_callback);
    },
    continueToLocation: function(location, opt_callback) {
        var paramObject = {
             'location': location,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'continueToLocation', paramObject, opt_callback);
    },
    stepOver: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'stepOver', paramObject, opt_callback);
    },
    stepInto: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'stepInto', paramObject, opt_callback);
    },
    stepOut: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'stepOut', paramObject, opt_callback);
    },
    pause: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'pause', paramObject, opt_callback);
    },
    resume: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'resume', paramObject, opt_callback);
    },
    searchInContent: function(scriptId, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'searchInContent', paramObject, opt_callback);
    },
    canSetScriptSource: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'canSetScriptSource', paramObject, opt_callback);
    },
    setScriptSource: function(scriptId, scriptSource, preview, opt_callback/*(callFrames,result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'scriptSource': scriptSource,
             'preview': preview,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'setScriptSource', paramObject, opt_callback);
    },
    getScriptSource: function(scriptId, opt_callback/*(scriptSource)*/) {
        var paramObject = {
             'scriptId': scriptId,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'getScriptSource', paramObject, opt_callback);
    },
    getFunctionLocation: function(functionId, opt_callback/*(location)*/) {
        var paramObject = {
             'functionId': functionId,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'getFunctionLocation', paramObject, opt_callback);
    },
    setPauseOnExceptions: function(state, opt_callback) {
        var paramObject = {
             'state': state,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'setPauseOnExceptions', paramObject, opt_callback);
    },
    evaluateOnCallFrame: function(callFrameId, expression, objectGroup, includeCommandLineAPI, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'callFrameId': callFrameId,
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'returnByValue': returnByValue,
         };
        chrome.devtools.proxy.sendCommand('Debugger', 'evaluateOnCallFrame', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    globalObjectCleared: function() {},
    scriptParsed: function(scriptId, url, startLine, startColumn, endLine, endColumn, isContentScript, sourceMapURL) {},
    scriptFailedToParse: function(url, scriptSource, startLine, errorLine, errorMessage) {},
    breakpointResolved: function(breakpointId, location) {},
    paused: function(callFrames, reason, data) {},
    resumed: function() {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Debugger', this);
        chrome.devtools.proxy.registerEvent(
            'Debugger', 
            'globalObjectCleared', 
            ['']);
        chrome.devtools.proxy.registerEvent(
            'Debugger', 
            'scriptParsed', 
            ['scriptId', 'url', 'startLine', 'startColumn', 'endLine', 'endColumn', 'isContentScript', 'sourceMapURL']);
        chrome.devtools.proxy.registerEvent(
            'Debugger', 
            'scriptFailedToParse', 
            ['url', 'scriptSource', 'startLine', 'errorLine', 'errorMessage']);
        chrome.devtools.proxy.registerEvent(
            'Debugger', 
            'breakpointResolved', 
            ['breakpointId', 'location']);
        chrome.devtools.proxy.registerEvent(
            'Debugger', 
            'paused', 
            ['callFrames', 'reason', 'data']);
        chrome.devtools.proxy.registerEvent(
            'Debugger', 
            'resumed', 
            ['']);
    },
};


chrome.devtools.proxy.DOMDebugger = {};
chrome.devtools.proxy.DOMDebugger.prototype = {

    // Commands: 
    setDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.devtools.proxy.sendCommand('DOMDebugger', 'setDOMBreakpoint', paramObject, opt_callback);
    },
    removeDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.devtools.proxy.sendCommand('DOMDebugger', 'removeDOMBreakpoint', paramObject, opt_callback);
    },
    setEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.proxy.sendCommand('DOMDebugger', 'setEventListenerBreakpoint', paramObject, opt_callback);
    },
    removeEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.devtools.proxy.sendCommand('DOMDebugger', 'removeEventListenerBreakpoint', paramObject, opt_callback);
    },
    setXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.proxy.sendCommand('DOMDebugger', 'setXHRBreakpoint', paramObject, opt_callback);
    },
    removeXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.proxy.sendCommand('DOMDebugger', 'removeXHRBreakpoint', paramObject, opt_callback);
    },
};

/* unsupported */ 
chrome.devtools.proxy.Profiler = {};
chrome.devtools.proxy.Profiler.prototype = {

    // Commands: 
    causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'causesRecompilation', paramObject, opt_callback);
    },
    isSampling: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'isSampling', paramObject, opt_callback);
    },
    hasHeapProfiler: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'hasHeapProfiler', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'disable', paramObject, opt_callback);
    },
    start: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'stop', paramObject, opt_callback);
    },
    getProfileHeaders: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'getProfileHeaders', paramObject, opt_callback);
    },
    getProfile: function(type, uid, opt_callback/*(profile)*/) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'getProfile', paramObject, opt_callback);
    },
    removeProfile: function(type, uid, opt_callback) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'removeProfile', paramObject, opt_callback);
    },
    clearProfiles: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'clearProfiles', paramObject, opt_callback);
    },
    takeHeapSnapshot: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'takeHeapSnapshot', paramObject, opt_callback);
    },
    collectGarbage: function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'collectGarbage', paramObject, opt_callback);
    },
    getObjectByHeapObjectId: function(objectId, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.proxy.sendCommand('Profiler', 'getObjectByHeapObjectId', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    addProfileHeader: function(header) {},
    addHeapSnapshotChunk: function(uid, chunk) {},
    finishHeapSnapshot: function(uid) {},
    setRecordingProfile: function(isProfiling) {},
    resetProfiles: function() {},
    reportHeapSnapshotProgress: function(done, total) {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Profiler', this);
        chrome.devtools.proxy.registerEvent(
            'Profiler', 
            'addProfileHeader', 
            ['header']);
        chrome.devtools.proxy.registerEvent(
            'Profiler', 
            'addHeapSnapshotChunk', 
            ['uid', 'chunk']);
        chrome.devtools.proxy.registerEvent(
            'Profiler', 
            'finishHeapSnapshot', 
            ['uid']);
        chrome.devtools.proxy.registerEvent(
            'Profiler', 
            'setRecordingProfile', 
            ['isProfiling']);
        chrome.devtools.proxy.registerEvent(
            'Profiler', 
            'resetProfiles', 
            ['']);
        chrome.devtools.proxy.registerEvent(
            'Profiler', 
            'reportHeapSnapshotProgress', 
            ['done', 'total']);
    },
};

/* unsupported */ 
chrome.devtools.proxy.Worker = {};
chrome.devtools.proxy.Worker.prototype = {

    // Commands: 
    setWorkerInspectionEnabled: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.devtools.proxy.sendCommand('Worker', 'setWorkerInspectionEnabled', paramObject, opt_callback);
    },
    sendMessageToWorker: function(workerId, message, opt_callback) {
        var paramObject = {
             'workerId': workerId,
             'message': message,
         };
        chrome.devtools.proxy.sendCommand('Worker', 'sendMessageToWorker', paramObject, opt_callback);
    },
    connectToWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.devtools.proxy.sendCommand('Worker', 'connectToWorker', paramObject, opt_callback);
    },
    disconnectFromWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.devtools.proxy.sendCommand('Worker', 'disconnectFromWorker', paramObject, opt_callback);
    },
    setAutoconnectToWorkers: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.devtools.proxy.sendCommand('Worker', 'setAutoconnectToWorkers', paramObject, opt_callback);
    },

    // Event handlers to override, then call initialize
    workerCreated: function(workerId, url, inspectorConnected) {},
    workerTerminated: function(workerId) {},
    dispatchMessageFromWorker: function(workerId, message) {},
    disconnectedFromWorker: function() {},

    // Call in your constructor to register for this events in domain
    initialize: function() {
        chrome.devtools.proxy.onEvent('Worker', this);
        chrome.devtools.proxy.registerEvent(
            'Worker', 
            'workerCreated', 
            ['workerId', 'url', 'inspectorConnected']);
        chrome.devtools.proxy.registerEvent(
            'Worker', 
            'workerTerminated', 
            ['workerId']);
        chrome.devtools.proxy.registerEvent(
            'Worker', 
            'dispatchMessageFromWorker', 
            ['workerId', 'message']);
        chrome.devtools.proxy.registerEvent(
            'Worker', 
            'disconnectedFromWorker', 
            ['']);
    },
};

return chrome.devtools.proxy;

/* copyright 2011 Google, inc. johnjbarton@google.com Google BSD License */
/* See https://github.com/johnjbarton/atopwi/blob/master/APIGeneration/generateRemoteDebugAPI.html */
}());
