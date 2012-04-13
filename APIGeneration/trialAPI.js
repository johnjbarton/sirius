/* Machine generated from ../inspector/Inspector.json version: 0.1 on Fri Apr 13 2012 14:40:37 GMT-0700 (PDT) */

var ChromeDevtools = (function () {

var ChromeDevtools = ChromeDevtools || {};
ChromeDevtools.version = 0.1;

/* unsupported */ 
ChromeDevtools.Inspector = {};
ChromeDevtools.Inspector.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Inspector.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Inspector.disable', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    evaluateForTestInFrontend: function(testCallId, script) {},
    inspect: function(object, hints) {},
    didCreateWorker: function(id, url, isShared) {},
    didDestroyWorker: function(id) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Inspector', this);
        ChromeDevtools.registerEvent(
            'Inspector.evaluateForTestInFrontend', 
            ['testCallId', 'script']);
        ChromeDevtools.registerEvent(
            'Inspector.inspect', 
            ['object', 'hints']);
        ChromeDevtools.registerEvent(
            'Inspector.didCreateWorker', 
            ['id', 'url', 'isShared']);
        ChromeDevtools.registerEvent(
            'Inspector.didDestroyWorker', 
            ['id']);
    },
};

/* unsupported */ 
ChromeDevtools.Memory = {};
ChromeDevtools.Memory.prototype = {

    // Commands: 
    getDOMNodeCount: function(opt_callback/*(count)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Memory.getDOMNodeCount', paramObject, opt_callback);
    },
};


ChromeDevtools.Page = {};
ChromeDevtools.Page.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Page.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Page.disable', paramObject, opt_callback);
    },
    /* unsupported */ addScriptToEvaluateOnLoad: function(scriptSource, opt_callback/*(identifier)*/) {
        var paramObject = {
             'scriptSource': scriptSource,
         };
        ChromeDevtools.proxy.sendCommand('Page.addScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    /* unsupported */ removeScriptToEvaluateOnLoad: function(identifier, opt_callback) {
        var paramObject = {
             'identifier': identifier,
         };
        ChromeDevtools.proxy.sendCommand('Page.removeScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    reload: function(ignoreCache, scriptToEvaluateOnLoad, opt_callback) {
        var paramObject = {
             'ignoreCache': ignoreCache,
             'scriptToEvaluateOnLoad': scriptToEvaluateOnLoad,
         };
        ChromeDevtools.proxy.sendCommand('Page.reload', paramObject, opt_callback);
    },
    /* unsupported */ open: function(url, newWindow, opt_callback) {
        var paramObject = {
             'url': url,
             'newWindow': newWindow,
         };
        ChromeDevtools.proxy.sendCommand('Page.open', paramObject, opt_callback);
    },
    /* unsupported */ getCookies: function(opt_callback/*(cookies,cookiesString)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Page.getCookies', paramObject, opt_callback);
    },
    /* unsupported */ deleteCookie: function(cookieName, domain, opt_callback) {
        var paramObject = {
             'cookieName': cookieName,
             'domain': domain,
         };
        ChromeDevtools.proxy.sendCommand('Page.deleteCookie', paramObject, opt_callback);
    },
    /* unsupported */ getResourceTree: function(opt_callback/*(frameTree)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Page.getResourceTree', paramObject, opt_callback);
    },
    /* unsupported */ getResourceContent: function(frameId, url, opt_callback/*(content,base64Encoded)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
         };
        ChromeDevtools.proxy.sendCommand('Page.getResourceContent', paramObject, opt_callback);
    },
    /* unsupported */ searchInResource: function(frameId, url, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        ChromeDevtools.proxy.sendCommand('Page.searchInResource', paramObject, opt_callback);
    },
    /* unsupported */ searchInResources: function(text, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'text': text,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        ChromeDevtools.proxy.sendCommand('Page.searchInResources', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    domContentEventFired: function(timestamp) {},
    loadEventFired: function(timestamp) {},
    /* unsupported */ frameNavigated: function(frame) {},
    /* unsupported */ frameDetached: function(frameId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Page', this);
        ChromeDevtools.registerEvent(
            'Page.domContentEventFired', 
            ['timestamp']);
        ChromeDevtools.registerEvent(
            'Page.loadEventFired', 
            ['timestamp']);
        ChromeDevtools.registerEvent(
            'Page.frameNavigated', 
            ['frame']);
        ChromeDevtools.registerEvent(
            'Page.frameDetached', 
            ['frameId']);
    },
};


ChromeDevtools.Runtime = {};
ChromeDevtools.Runtime.prototype = {

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
        ChromeDevtools.proxy.sendCommand('Runtime.evaluate', paramObject, opt_callback);
    },
    callFunctionOn: function(objectId, functionDeclaration, arguments, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'objectId': objectId,
             'functionDeclaration': functionDeclaration,
             'arguments': arguments,
             'returnByValue': returnByValue,
         };
        ChromeDevtools.proxy.sendCommand('Runtime.callFunctionOn', paramObject, opt_callback);
    },
    getProperties: function(objectId, ownProperties, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'ownProperties': ownProperties,
         };
        ChromeDevtools.proxy.sendCommand('Runtime.getProperties', paramObject, opt_callback);
    },
    releaseObject: function(objectId, opt_callback) {
        var paramObject = {
             'objectId': objectId,
         };
        ChromeDevtools.proxy.sendCommand('Runtime.releaseObject', paramObject, opt_callback);
    },
    releaseObjectGroup: function(objectGroup, opt_callback) {
        var paramObject = {
             'objectGroup': objectGroup,
         };
        ChromeDevtools.proxy.sendCommand('Runtime.releaseObjectGroup', paramObject, opt_callback);
    },
    /* unsupported */ run: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Runtime.run', paramObject, opt_callback);
    },
};


ChromeDevtools.Console = {};
ChromeDevtools.Console.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Console.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Console.disable', paramObject, opt_callback);
    },
    clearMessages: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Console.clearMessages', paramObject, opt_callback);
    },
    /* unsupported */ setMonitoringXHREnabled: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        ChromeDevtools.proxy.sendCommand('Console.setMonitoringXHREnabled', paramObject, opt_callback);
    },
    /* unsupported */ addInspectedNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('Console.addInspectedNode', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    messageAdded: function(message) {},
    messageRepeatCountUpdated: function(count) {},
    messagesCleared: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Console', this);
        ChromeDevtools.registerEvent(
            'Console.messageAdded', 
            ['message']);
        ChromeDevtools.registerEvent(
            'Console.messageRepeatCountUpdated', 
            ['count']);
        ChromeDevtools.registerEvent(
            'Console.messagesCleared', 
            ['']);
    },
};


ChromeDevtools.Network = {};
ChromeDevtools.Network.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Network.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Network.disable', paramObject, opt_callback);
    },
    setUserAgentOverride: function(userAgent, opt_callback) {
        var paramObject = {
             'userAgent': userAgent,
         };
        ChromeDevtools.proxy.sendCommand('Network.setUserAgentOverride', paramObject, opt_callback);
    },
    setExtraHTTPHeaders: function(headers, opt_callback) {
        var paramObject = {
             'headers': headers,
         };
        ChromeDevtools.proxy.sendCommand('Network.setExtraHTTPHeaders', paramObject, opt_callback);
    },
    getResponseBody: function(requestId, opt_callback/*(body,base64Encoded)*/) {
        var paramObject = {
             'requestId': requestId,
         };
        ChromeDevtools.proxy.sendCommand('Network.getResponseBody', paramObject, opt_callback);
    },
    canClearBrowserCache: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Network.canClearBrowserCache', paramObject, opt_callback);
    },
    clearBrowserCache: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Network.clearBrowserCache', paramObject, opt_callback);
    },
    canClearBrowserCookies: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Network.canClearBrowserCookies', paramObject, opt_callback);
    },
    clearBrowserCookies: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Network.clearBrowserCookies', paramObject, opt_callback);
    },
    setCacheDisabled: function(cacheDisabled, opt_callback) {
        var paramObject = {
             'cacheDisabled': cacheDisabled,
         };
        ChromeDevtools.proxy.sendCommand('Network.setCacheDisabled', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
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
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Network', this);
        ChromeDevtools.registerEvent(
            'Network.requestWillBeSent', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'request', 'timestamp', 'initiator', 'stackTrace', 'redirectResponse']);
        ChromeDevtools.registerEvent(
            'Network.requestServedFromCache', 
            ['requestId']);
        ChromeDevtools.registerEvent(
            'Network.responseReceived', 
            ['requestId', 'frameId', 'loaderId', 'timestamp', 'type', 'response']);
        ChromeDevtools.registerEvent(
            'Network.dataReceived', 
            ['requestId', 'timestamp', 'dataLength', 'encodedDataLength']);
        ChromeDevtools.registerEvent(
            'Network.loadingFinished', 
            ['requestId', 'timestamp']);
        ChromeDevtools.registerEvent(
            'Network.loadingFailed', 
            ['requestId', 'timestamp', 'errorText', 'canceled']);
        ChromeDevtools.registerEvent(
            'Network.requestServedFromMemoryCache', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'timestamp', 'initiator', 'resource']);
        ChromeDevtools.registerEvent(
            'Network.webSocketWillSendHandshakeRequest', 
            ['requestId', 'timestamp', 'request']);
        ChromeDevtools.registerEvent(
            'Network.webSocketHandshakeResponseReceived', 
            ['requestId', 'timestamp', 'response']);
        ChromeDevtools.registerEvent(
            'Network.webSocketCreated', 
            ['requestId', 'url']);
        ChromeDevtools.registerEvent(
            'Network.webSocketClosed', 
            ['requestId', 'timestamp']);
    },
};

/* unsupported */ 
ChromeDevtools.Database = {};
ChromeDevtools.Database.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Database.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Database.disable', paramObject, opt_callback);
    },
    getDatabaseTableNames: function(databaseId, opt_callback/*(tableNames)*/) {
        var paramObject = {
             'databaseId': databaseId,
         };
        ChromeDevtools.proxy.sendCommand('Database.getDatabaseTableNames', paramObject, opt_callback);
    },
    executeSQL: function(databaseId, query, opt_callback/*(success,transactionId)*/) {
        var paramObject = {
             'databaseId': databaseId,
             'query': query,
         };
        ChromeDevtools.proxy.sendCommand('Database.executeSQL', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addDatabase: function(database) {},
    sqlTransactionSucceeded: function(transactionId, columnNames, values) {},
    sqlTransactionFailed: function(transactionId, sqlError) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Database', this);
        ChromeDevtools.registerEvent(
            'Database.addDatabase', 
            ['database']);
        ChromeDevtools.registerEvent(
            'Database.sqlTransactionSucceeded', 
            ['transactionId', 'columnNames', 'values']);
        ChromeDevtools.registerEvent(
            'Database.sqlTransactionFailed', 
            ['transactionId', 'sqlError']);
    },
};

/* unsupported */ 
ChromeDevtools.DOMStorage = {};
ChromeDevtools.DOMStorage.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('DOMStorage.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('DOMStorage.disable', paramObject, opt_callback);
    },
    getDOMStorageEntries: function(storageId, opt_callback/*(entries)*/) {
        var paramObject = {
             'storageId': storageId,
         };
        ChromeDevtools.proxy.sendCommand('DOMStorage.getDOMStorageEntries', paramObject, opt_callback);
    },
    setDOMStorageItem: function(storageId, key, value, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
             'value': value,
         };
        ChromeDevtools.proxy.sendCommand('DOMStorage.setDOMStorageItem', paramObject, opt_callback);
    },
    removeDOMStorageItem: function(storageId, key, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
         };
        ChromeDevtools.proxy.sendCommand('DOMStorage.removeDOMStorageItem', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addDOMStorage: function(storage) {},
    updateDOMStorage: function(storageId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('DOMStorage', this);
        ChromeDevtools.registerEvent(
            'DOMStorage.addDOMStorage', 
            ['storage']);
        ChromeDevtools.registerEvent(
            'DOMStorage.updateDOMStorage', 
            ['storageId']);
    },
};

/* unsupported */ 
ChromeDevtools.ApplicationCache = {};
ChromeDevtools.ApplicationCache.prototype = {

    // Commands: 
    getFramesWithManifests: function(opt_callback/*(frameIds)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('ApplicationCache.getFramesWithManifests', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('ApplicationCache.enable', paramObject, opt_callback);
    },
    getManifestForFrame: function(frameId, opt_callback/*(manifestURL)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        ChromeDevtools.proxy.sendCommand('ApplicationCache.getManifestForFrame', paramObject, opt_callback);
    },
    getApplicationCacheForFrame: function(frameId, opt_callback/*(applicationCache)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        ChromeDevtools.proxy.sendCommand('ApplicationCache.getApplicationCacheForFrame', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    applicationCacheStatusUpdated: function(frameId, manifestURL, status) {},
    networkStateUpdated: function(isNowOnline) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('ApplicationCache', this);
        ChromeDevtools.registerEvent(
            'ApplicationCache.applicationCacheStatusUpdated', 
            ['frameId', 'manifestURL', 'status']);
        ChromeDevtools.registerEvent(
            'ApplicationCache.networkStateUpdated', 
            ['isNowOnline']);
    },
};

/* unsupported */ 
ChromeDevtools.FileSystem = {};
ChromeDevtools.FileSystem.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('FileSystem.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('FileSystem.disable', paramObject, opt_callback);
    },
};


ChromeDevtools.DOM = {};
ChromeDevtools.DOM.prototype = {

    // Commands: 
    getDocument: function(opt_callback/*(root)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('DOM.getDocument', paramObject, opt_callback);
    },
    requestChildNodes: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.requestChildNodes', paramObject, opt_callback);
    },
    querySelector: function(nodeId, selector, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        ChromeDevtools.proxy.sendCommand('DOM.querySelector', paramObject, opt_callback);
    },
    querySelectorAll: function(nodeId, selector, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        ChromeDevtools.proxy.sendCommand('DOM.querySelectorAll', paramObject, opt_callback);
    },
    setNodeName: function(nodeId, name, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        ChromeDevtools.proxy.sendCommand('DOM.setNodeName', paramObject, opt_callback);
    },
    setNodeValue: function(nodeId, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'value': value,
         };
        ChromeDevtools.proxy.sendCommand('DOM.setNodeValue', paramObject, opt_callback);
    },
    removeNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.removeNode', paramObject, opt_callback);
    },
    setAttributeValue: function(nodeId, name, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
             'value': value,
         };
        ChromeDevtools.proxy.sendCommand('DOM.setAttributeValue', paramObject, opt_callback);
    },
    setAttributesAsText: function(nodeId, text, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'text': text,
             'name': name,
         };
        ChromeDevtools.proxy.sendCommand('DOM.setAttributesAsText', paramObject, opt_callback);
    },
    removeAttribute: function(nodeId, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        ChromeDevtools.proxy.sendCommand('DOM.removeAttribute', paramObject, opt_callback);
    },
    /* unsupported */ getEventListenersForNode: function(nodeId, opt_callback/*(listeners)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.getEventListenersForNode', paramObject, opt_callback);
    },
    /* unsupported */ copyNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.copyNode', paramObject, opt_callback);
    },
    getOuterHTML: function(nodeId, opt_callback/*(outerHTML)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.getOuterHTML', paramObject, opt_callback);
    },
    setOuterHTML: function(nodeId, outerHTML, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'outerHTML': outerHTML,
         };
        ChromeDevtools.proxy.sendCommand('DOM.setOuterHTML', paramObject, opt_callback);
    },
    /* unsupported */ performSearch: function(query, opt_callback/*(searchId,resultCount)*/) {
        var paramObject = {
             'query': query,
         };
        ChromeDevtools.proxy.sendCommand('DOM.performSearch', paramObject, opt_callback);
    },
    /* unsupported */ getSearchResults: function(searchId, fromIndex, toIndex, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'searchId': searchId,
             'fromIndex': fromIndex,
             'toIndex': toIndex,
         };
        ChromeDevtools.proxy.sendCommand('DOM.getSearchResults', paramObject, opt_callback);
    },
    /* unsupported */ discardSearchResults: function(searchId, opt_callback) {
        var paramObject = {
             'searchId': searchId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.discardSearchResults', paramObject, opt_callback);
    },
    requestNode: function(objectId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.requestNode', paramObject, opt_callback);
    },
    /* unsupported */ setInspectModeEnabled: function(enabled, highlightConfig, opt_callback) {
        var paramObject = {
             'enabled': enabled,
             'highlightConfig': highlightConfig,
         };
        ChromeDevtools.proxy.sendCommand('DOM.setInspectModeEnabled', paramObject, opt_callback);
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
        ChromeDevtools.proxy.sendCommand('DOM.highlightRect', paramObject, opt_callback);
    },
    highlightNode: function(nodeId, highlightConfig, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'highlightConfig': highlightConfig,
         };
        ChromeDevtools.proxy.sendCommand('DOM.highlightNode', paramObject, opt_callback);
    },
    hideHighlight: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('DOM.hideHighlight', paramObject, opt_callback);
    },
    /* unsupported */ highlightFrame: function(frameId, contentColor, contentOutlineColor, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'contentColor': contentColor,
             'contentOutlineColor': contentOutlineColor,
         };
        ChromeDevtools.proxy.sendCommand('DOM.highlightFrame', paramObject, opt_callback);
    },
    /* unsupported */ pushNodeByPathToFrontend: function(path, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'path': path,
         };
        ChromeDevtools.proxy.sendCommand('DOM.pushNodeByPathToFrontend', paramObject, opt_callback);
    },
    resolveNode: function(nodeId, objectGroup, opt_callback/*(object)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'objectGroup': objectGroup,
         };
        ChromeDevtools.proxy.sendCommand('DOM.resolveNode', paramObject, opt_callback);
    },
    getAttributes: function(nodeId, opt_callback/*(attributes)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.getAttributes', paramObject, opt_callback);
    },
    moveTo: function(nodeId, targetNodeId, insertBeforeNodeId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'targetNodeId': targetNodeId,
             'insertBeforeNodeId': insertBeforeNodeId,
         };
        ChromeDevtools.proxy.sendCommand('DOM.moveTo', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
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
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('DOM', this);
        ChromeDevtools.registerEvent(
            'DOM.documentUpdated', 
            ['']);
        ChromeDevtools.registerEvent(
            'DOM.setChildNodes', 
            ['parentId', 'nodes']);
        ChromeDevtools.registerEvent(
            'DOM.attributeModified', 
            ['nodeId', 'name', 'value']);
        ChromeDevtools.registerEvent(
            'DOM.attributeRemoved', 
            ['nodeId', 'name']);
        ChromeDevtools.registerEvent(
            'DOM.inlineStyleInvalidated', 
            ['nodeIds']);
        ChromeDevtools.registerEvent(
            'DOM.characterDataModified', 
            ['nodeId', 'characterData']);
        ChromeDevtools.registerEvent(
            'DOM.childNodeCountUpdated', 
            ['nodeId', 'childNodeCount']);
        ChromeDevtools.registerEvent(
            'DOM.childNodeInserted', 
            ['parentNodeId', 'previousNodeId', 'node']);
        ChromeDevtools.registerEvent(
            'DOM.childNodeRemoved', 
            ['parentNodeId', 'nodeId']);
    },
};

/* unsupported */ 
ChromeDevtools.CSS = {};
ChromeDevtools.CSS.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('CSS.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('CSS.disable', paramObject, opt_callback);
    },
    getMatchedStylesForNode: function(nodeId, forcedPseudoClasses, includePseudo, includeInherited, opt_callback/*(matchedCSSRules,pseudoElements,inherited)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
             'includePseudo': includePseudo,
             'includeInherited': includeInherited,
         };
        ChromeDevtools.proxy.sendCommand('CSS.getMatchedStylesForNode', paramObject, opt_callback);
    },
    getInlineStylesForNode: function(nodeId, opt_callback/*(inlineStyle,styleAttributes)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        ChromeDevtools.proxy.sendCommand('CSS.getInlineStylesForNode', paramObject, opt_callback);
    },
    getComputedStyleForNode: function(nodeId, forcedPseudoClasses, opt_callback/*(computedStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
         };
        ChromeDevtools.proxy.sendCommand('CSS.getComputedStyleForNode', paramObject, opt_callback);
    },
    getAllStyleSheets: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('CSS.getAllStyleSheets', paramObject, opt_callback);
    },
    getStyleSheet: function(styleSheetId, opt_callback/*(styleSheet)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        ChromeDevtools.proxy.sendCommand('CSS.getStyleSheet', paramObject, opt_callback);
    },
    getStyleSheetText: function(styleSheetId, opt_callback/*(text)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        ChromeDevtools.proxy.sendCommand('CSS.getStyleSheetText', paramObject, opt_callback);
    },
    setStyleSheetText: function(styleSheetId, text, opt_callback) {
        var paramObject = {
             'styleSheetId': styleSheetId,
             'text': text,
         };
        ChromeDevtools.proxy.sendCommand('CSS.setStyleSheetText', paramObject, opt_callback);
    },
    setPropertyText: function(styleId, propertyIndex, text, overwrite, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'text': text,
             'overwrite': overwrite,
         };
        ChromeDevtools.proxy.sendCommand('CSS.setPropertyText', paramObject, opt_callback);
    },
    toggleProperty: function(styleId, propertyIndex, disable, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'disable': disable,
         };
        ChromeDevtools.proxy.sendCommand('CSS.toggleProperty', paramObject, opt_callback);
    },
    setRuleSelector: function(ruleId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'ruleId': ruleId,
             'selector': selector,
         };
        ChromeDevtools.proxy.sendCommand('CSS.setRuleSelector', paramObject, opt_callback);
    },
    addRule: function(contextNodeId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'contextNodeId': contextNodeId,
             'selector': selector,
         };
        ChromeDevtools.proxy.sendCommand('CSS.addRule', paramObject, opt_callback);
    },
    getSupportedCSSProperties: function(opt_callback/*(cssProperties)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('CSS.getSupportedCSSProperties', paramObject, opt_callback);
    },
    startSelectorProfiler: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('CSS.startSelectorProfiler', paramObject, opt_callback);
    },
    stopSelectorProfiler: function(opt_callback/*(profile)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('CSS.stopSelectorProfiler', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    mediaQueryResultChanged: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('CSS', this);
        ChromeDevtools.registerEvent(
            'CSS.mediaQueryResultChanged', 
            ['']);
    },
};


ChromeDevtools.Timeline = {};
ChromeDevtools.Timeline.prototype = {

    // Commands: 
    start: function(maxCallStackDepth, opt_callback) {
        var paramObject = {
             'maxCallStackDepth': maxCallStackDepth,
         };
        ChromeDevtools.proxy.sendCommand('Timeline.start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Timeline.stop', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    eventRecorded: function(record) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Timeline', this);
        ChromeDevtools.registerEvent(
            'Timeline.eventRecorded', 
            ['record']);
    },
};


ChromeDevtools.Debugger = {};
ChromeDevtools.Debugger.prototype = {

    // Commands: 
    /* unsupported */ causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.causesRecompilation', paramObject, opt_callback);
    },
    /* unsupported */ supportsNativeBreakpoints: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.supportsNativeBreakpoints', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.disable', paramObject, opt_callback);
    },
    setBreakpointsActive: function(active, opt_callback) {
        var paramObject = {
             'active': active,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.setBreakpointsActive', paramObject, opt_callback);
    },
    setBreakpointByUrl: function(lineNumber, url, urlRegex, columnNumber, condition, opt_callback/*(breakpointId,locations)*/) {
        var paramObject = {
             'lineNumber': lineNumber,
             'url': url,
             'urlRegex': urlRegex,
             'columnNumber': columnNumber,
             'condition': condition,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.setBreakpointByUrl', paramObject, opt_callback);
    },
    setBreakpoint: function(location, condition, opt_callback/*(breakpointId,actualLocation)*/) {
        var paramObject = {
             'location': location,
             'condition': condition,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.setBreakpoint', paramObject, opt_callback);
    },
    removeBreakpoint: function(breakpointId, opt_callback) {
        var paramObject = {
             'breakpointId': breakpointId,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.removeBreakpoint', paramObject, opt_callback);
    },
    continueToLocation: function(location, opt_callback) {
        var paramObject = {
             'location': location,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.continueToLocation', paramObject, opt_callback);
    },
    stepOver: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.stepOver', paramObject, opt_callback);
    },
    stepInto: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.stepInto', paramObject, opt_callback);
    },
    stepOut: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.stepOut', paramObject, opt_callback);
    },
    pause: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.pause', paramObject, opt_callback);
    },
    resume: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.resume', paramObject, opt_callback);
    },
    searchInContent: function(scriptId, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.searchInContent', paramObject, opt_callback);
    },
    canSetScriptSource: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Debugger.canSetScriptSource', paramObject, opt_callback);
    },
    setScriptSource: function(scriptId, scriptSource, preview, opt_callback/*(callFrames,result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'scriptSource': scriptSource,
             'preview': preview,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.setScriptSource', paramObject, opt_callback);
    },
    getScriptSource: function(scriptId, opt_callback/*(scriptSource)*/) {
        var paramObject = {
             'scriptId': scriptId,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.getScriptSource', paramObject, opt_callback);
    },
    getFunctionLocation: function(functionId, opt_callback/*(location)*/) {
        var paramObject = {
             'functionId': functionId,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.getFunctionLocation', paramObject, opt_callback);
    },
    setPauseOnExceptions: function(state, opt_callback) {
        var paramObject = {
             'state': state,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.setPauseOnExceptions', paramObject, opt_callback);
    },
    evaluateOnCallFrame: function(callFrameId, expression, objectGroup, includeCommandLineAPI, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'callFrameId': callFrameId,
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'returnByValue': returnByValue,
         };
        ChromeDevtools.proxy.sendCommand('Debugger.evaluateOnCallFrame', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    globalObjectCleared: function() {},
    scriptParsed: function(scriptId, url, startLine, startColumn, endLine, endColumn, isContentScript, sourceMapURL) {},
    scriptFailedToParse: function(url, scriptSource, startLine, errorLine, errorMessage) {},
    breakpointResolved: function(breakpointId, location) {},
    paused: function(callFrames, reason, data) {},
    resumed: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Debugger', this);
        ChromeDevtools.registerEvent(
            'Debugger.globalObjectCleared', 
            ['']);
        ChromeDevtools.registerEvent(
            'Debugger.scriptParsed', 
            ['scriptId', 'url', 'startLine', 'startColumn', 'endLine', 'endColumn', 'isContentScript', 'sourceMapURL']);
        ChromeDevtools.registerEvent(
            'Debugger.scriptFailedToParse', 
            ['url', 'scriptSource', 'startLine', 'errorLine', 'errorMessage']);
        ChromeDevtools.registerEvent(
            'Debugger.breakpointResolved', 
            ['breakpointId', 'location']);
        ChromeDevtools.registerEvent(
            'Debugger.paused', 
            ['callFrames', 'reason', 'data']);
        ChromeDevtools.registerEvent(
            'Debugger.resumed', 
            ['']);
    },
};


ChromeDevtools.DOMDebugger = {};
ChromeDevtools.DOMDebugger.prototype = {

    // Commands: 
    setDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        ChromeDevtools.proxy.sendCommand('DOMDebugger.setDOMBreakpoint', paramObject, opt_callback);
    },
    removeDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        ChromeDevtools.proxy.sendCommand('DOMDebugger.removeDOMBreakpoint', paramObject, opt_callback);
    },
    setEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        ChromeDevtools.proxy.sendCommand('DOMDebugger.setEventListenerBreakpoint', paramObject, opt_callback);
    },
    removeEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        ChromeDevtools.proxy.sendCommand('DOMDebugger.removeEventListenerBreakpoint', paramObject, opt_callback);
    },
    setXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        ChromeDevtools.proxy.sendCommand('DOMDebugger.setXHRBreakpoint', paramObject, opt_callback);
    },
    removeXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        ChromeDevtools.proxy.sendCommand('DOMDebugger.removeXHRBreakpoint', paramObject, opt_callback);
    },
};

/* unsupported */ 
ChromeDevtools.Profiler = {};
ChromeDevtools.Profiler.prototype = {

    // Commands: 
    causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.causesRecompilation', paramObject, opt_callback);
    },
    isSampling: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.isSampling', paramObject, opt_callback);
    },
    hasHeapProfiler: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.hasHeapProfiler', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.disable', paramObject, opt_callback);
    },
    start: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.stop', paramObject, opt_callback);
    },
    getProfileHeaders: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.getProfileHeaders', paramObject, opt_callback);
    },
    getProfile: function(type, uid, opt_callback/*(profile)*/) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        ChromeDevtools.proxy.sendCommand('Profiler.getProfile', paramObject, opt_callback);
    },
    removeProfile: function(type, uid, opt_callback) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        ChromeDevtools.proxy.sendCommand('Profiler.removeProfile', paramObject, opt_callback);
    },
    clearProfiles: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.clearProfiles', paramObject, opt_callback);
    },
    takeHeapSnapshot: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.takeHeapSnapshot', paramObject, opt_callback);
    },
    collectGarbage: function(opt_callback) {
        var paramObject = {
         };
        ChromeDevtools.proxy.sendCommand('Profiler.collectGarbage', paramObject, opt_callback);
    },
    getObjectByHeapObjectId: function(objectId, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        ChromeDevtools.proxy.sendCommand('Profiler.getObjectByHeapObjectId', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addProfileHeader: function(header) {},
    addHeapSnapshotChunk: function(uid, chunk) {},
    finishHeapSnapshot: function(uid) {},
    setRecordingProfile: function(isProfiling) {},
    resetProfiles: function() {},
    reportHeapSnapshotProgress: function(done, total) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Profiler', this);
        ChromeDevtools.registerEvent(
            'Profiler.addProfileHeader', 
            ['header']);
        ChromeDevtools.registerEvent(
            'Profiler.addHeapSnapshotChunk', 
            ['uid', 'chunk']);
        ChromeDevtools.registerEvent(
            'Profiler.finishHeapSnapshot', 
            ['uid']);
        ChromeDevtools.registerEvent(
            'Profiler.setRecordingProfile', 
            ['isProfiling']);
        ChromeDevtools.registerEvent(
            'Profiler.resetProfiles', 
            ['']);
        ChromeDevtools.registerEvent(
            'Profiler.reportHeapSnapshotProgress', 
            ['done', 'total']);
    },
};

/* unsupported */ 
ChromeDevtools.Worker = {};
ChromeDevtools.Worker.prototype = {

    // Commands: 
    setWorkerInspectionEnabled: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        ChromeDevtools.proxy.sendCommand('Worker.setWorkerInspectionEnabled', paramObject, opt_callback);
    },
    sendMessageToWorker: function(workerId, message, opt_callback) {
        var paramObject = {
             'workerId': workerId,
             'message': message,
         };
        ChromeDevtools.proxy.sendCommand('Worker.sendMessageToWorker', paramObject, opt_callback);
    },
    connectToWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        ChromeDevtools.proxy.sendCommand('Worker.connectToWorker', paramObject, opt_callback);
    },
    disconnectFromWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        ChromeDevtools.proxy.sendCommand('Worker.disconnectFromWorker', paramObject, opt_callback);
    },
    setAutoconnectToWorkers: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        ChromeDevtools.proxy.sendCommand('Worker.setAutoconnectToWorkers', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    workerCreated: function(workerId, url, inspectorConnected) {},
    workerTerminated: function(workerId) {},
    dispatchMessageFromWorker: function(workerId, message) {},
    disconnectedFromWorker: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        ChromeDevtools.proxy.onEvent('Worker', this);
        ChromeDevtools.registerEvent(
            'Worker.workerCreated', 
            ['workerId', 'url', 'inspectorConnected']);
        ChromeDevtools.registerEvent(
            'Worker.workerTerminated', 
            ['workerId']);
        ChromeDevtools.registerEvent(
            'Worker.dispatchMessageFromWorker', 
            ['workerId', 'message']);
        ChromeDevtools.registerEvent(
            'Worker.disconnectedFromWorker', 
            ['']);
    },
};

return ChromeDevtools;

/* copyright 2011 Google, inc. johnjbarton@google.com Google BSD License */
/* See https://github.com/johnjbarton/atopwi/blob/master/APIGeneration/generateRemoteDebugAPI.html */
}());
