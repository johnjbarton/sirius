/* Machine generated from Inspector.json version: 1.0 on Fri Jun 08 2012 16:46:58 GMT-0700 (PDT) */

(function () {
// create chrome.devtools
if (!chrome || !chrome.devtools) return;

chrome.devtools.protocol = {};
chrome.devtools.protocol.version = 1.0;

/* unsupported */ 
chrome.devtools.protocol.Inspector = {};
chrome.devtools.protocol.Inspector.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Inspector.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Inspector.disable', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    evaluateForTestInFrontend: function(testCallId, script) {},
    inspect: function(object, hints) {},
    didCreateWorker: function(id, url, isShared) {},
    didDestroyWorker: function(id) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.evaluateForTestInFrontend', 
            ['testCallId', 'script']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.inspect', 
            ['object', 'hints']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.didCreateWorker', 
            ['id', 'url', 'isShared']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.didDestroyWorker', 
            ['id']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Inspector', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Memory = {};
chrome.devtools.protocol.Memory.prototype = {

    // Commands: 
    getDOMNodeCount: function(opt_callback/*(domGroups,strings)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Memory.getDOMNodeCount', paramObject, opt_callback);
    },
    getProcessMemoryDistribution: function(opt_callback/*(distribution)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Memory.getProcessMemoryDistribution', paramObject, opt_callback);
    },
};


chrome.devtools.protocol.Page = {};
chrome.devtools.protocol.Page.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.disable', paramObject, opt_callback);
    },
    /* unsupported */ addScriptToEvaluateOnLoad: function(scriptSource, opt_callback/*(identifier)*/) {
        var paramObject = {
             'scriptSource': scriptSource,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.addScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    /* unsupported */ removeScriptToEvaluateOnLoad: function(identifier, opt_callback) {
        var paramObject = {
             'identifier': identifier,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.removeScriptToEvaluateOnLoad', paramObject, opt_callback);
    },
    reload: function(ignoreCache, scriptToEvaluateOnLoad, opt_callback) {
        var paramObject = {
             'ignoreCache': ignoreCache,
             'scriptToEvaluateOnLoad': scriptToEvaluateOnLoad,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.reload', paramObject, opt_callback);
    },
    navigate: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.navigate', paramObject, opt_callback);
    },
    /* unsupported */ getCookies: function(opt_callback/*(cookies,cookiesString)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.getCookies', paramObject, opt_callback);
    },
    /* unsupported */ deleteCookie: function(cookieName, domain, opt_callback) {
        var paramObject = {
             'cookieName': cookieName,
             'domain': domain,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.deleteCookie', paramObject, opt_callback);
    },
    /* unsupported */ getResourceTree: function(opt_callback/*(frameTree)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.getResourceTree', paramObject, opt_callback);
    },
    /* unsupported */ getResourceContent: function(frameId, url, opt_callback/*(content,base64Encoded)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.getResourceContent', paramObject, opt_callback);
    },
    /* unsupported */ searchInResource: function(frameId, url, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.searchInResource', paramObject, opt_callback);
    },
    /* unsupported */ searchInResources: function(text, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'text': text,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.searchInResources', paramObject, opt_callback);
    },
    /* unsupported */ setDocumentContent: function(frameId, html, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'html': html,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.setDocumentContent', paramObject, opt_callback);
    },
    /* unsupported */ canOverrideDeviceMetrics: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.canOverrideDeviceMetrics', paramObject, opt_callback);
    },
    /* unsupported */ setDeviceMetricsOverride: function(width, height, fontScaleFactor, fitWindow, opt_callback) {
        var paramObject = {
             'width': width,
             'height': height,
             'fontScaleFactor': fontScaleFactor,
             'fitWindow': fitWindow,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.setDeviceMetricsOverride', paramObject, opt_callback);
    },
    /* unsupported */ setShowPaintRects: function(result, opt_callback) {
        var paramObject = {
             'result': result,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.setShowPaintRects', paramObject, opt_callback);
    },
    getScriptExecutionStatus: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.getScriptExecutionStatus', paramObject, opt_callback);
    },
    setScriptExecutionDisabled: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.setScriptExecutionDisabled', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    domContentEventFired: function(timestamp) {},
    loadEventFired: function(timestamp) {},
    /* unsupported */ frameNavigated: function(frame) {},
    /* unsupported */ frameDetached: function(frameId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.domContentEventFired', 
            ['timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.loadEventFired', 
            ['timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.frameNavigated', 
            ['frame']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.frameDetached', 
            ['frameId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Page', this);
    },
};


chrome.devtools.protocol.Runtime = {};
chrome.devtools.protocol.Runtime.prototype = {

    // Commands: 
    evaluate: function(expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptionsAndMuteConsole, contextId, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'contextId': contextId,
             'returnByValue': returnByValue,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.evaluate', paramObject, opt_callback);
    },
    callFunctionOn: function(objectId, functionDeclaration, arguments, doNotPauseOnExceptionsAndMuteConsole, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'objectId': objectId,
             'functionDeclaration': functionDeclaration,
             'arguments': arguments,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'returnByValue': returnByValue,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.callFunctionOn', paramObject, opt_callback);
    },
    getProperties: function(objectId, ownProperties, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'ownProperties': ownProperties,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.getProperties', paramObject, opt_callback);
    },
    releaseObject: function(objectId, opt_callback) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.releaseObject', paramObject, opt_callback);
    },
    releaseObjectGroup: function(objectGroup, opt_callback) {
        var paramObject = {
             'objectGroup': objectGroup,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.releaseObjectGroup', paramObject, opt_callback);
    },
    /* unsupported */ run: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.run', paramObject, opt_callback);
    },
    /* unsupported */ setReportExecutionContextCreation: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.setReportExecutionContextCreation', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    isolatedContextCreated: function(context) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Runtime.isolatedContextCreated', 
            ['context']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Runtime', this);
    },
};


chrome.devtools.protocol.Console = {};
chrome.devtools.protocol.Console.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.disable', paramObject, opt_callback);
    },
    clearMessages: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.clearMessages', paramObject, opt_callback);
    },
    /* unsupported */ setMonitoringXHREnabled: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.setMonitoringXHREnabled', paramObject, opt_callback);
    },
    /* unsupported */ addInspectedNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.addInspectedNode', paramObject, opt_callback);
    },
    addInspectedHeapObject: function(heapObjectId, opt_callback) {
        var paramObject = {
             'heapObjectId': heapObjectId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.addInspectedHeapObject', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    messageAdded: function(message) {},
    messageRepeatCountUpdated: function(count) {},
    messagesCleared: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Console.messageAdded', 
            ['message']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Console.messageRepeatCountUpdated', 
            ['count']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Console.messagesCleared', 
            ['']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Console', this);
    },
};


chrome.devtools.protocol.Network = {};
chrome.devtools.protocol.Network.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.disable', paramObject, opt_callback);
    },
    setUserAgentOverride: function(userAgent, opt_callback) {
        var paramObject = {
             'userAgent': userAgent,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.setUserAgentOverride', paramObject, opt_callback);
    },
    setExtraHTTPHeaders: function(headers, opt_callback) {
        var paramObject = {
             'headers': headers,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.setExtraHTTPHeaders', paramObject, opt_callback);
    },
    getResponseBody: function(requestId, opt_callback/*(body,base64Encoded)*/) {
        var paramObject = {
             'requestId': requestId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.getResponseBody', paramObject, opt_callback);
    },
    canClearBrowserCache: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.canClearBrowserCache', paramObject, opt_callback);
    },
    clearBrowserCache: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.clearBrowserCache', paramObject, opt_callback);
    },
    canClearBrowserCookies: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.canClearBrowserCookies', paramObject, opt_callback);
    },
    clearBrowserCookies: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.clearBrowserCookies', paramObject, opt_callback);
    },
    setCacheDisabled: function(cacheDisabled, opt_callback) {
        var paramObject = {
             'cacheDisabled': cacheDisabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.setCacheDisabled', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    requestWillBeSent: function(requestId, frameId, loaderId, documentURL, request, timestamp, initiator, redirectResponse) {},
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
    /* unsupported */ webSocketFrameReceived: function(requestId, timestamp, response) {},
    /* unsupported */ webSocketFrameError: function(requestId, timestamp, errorMessage) {},
    /* unsupported */ webSocketFrameSent: function(requestId, timestamp, response) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.requestWillBeSent', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'request', 'timestamp', 'initiator', 'redirectResponse']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromCache', 
            ['requestId']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.responseReceived', 
            ['requestId', 'frameId', 'loaderId', 'timestamp', 'type', 'response']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.dataReceived', 
            ['requestId', 'timestamp', 'dataLength', 'encodedDataLength']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.loadingFinished', 
            ['requestId', 'timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.loadingFailed', 
            ['requestId', 'timestamp', 'errorText', 'canceled']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromMemoryCache', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'timestamp', 'initiator', 'resource']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketWillSendHandshakeRequest', 
            ['requestId', 'timestamp', 'request']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketHandshakeResponseReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketCreated', 
            ['requestId', 'url']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketClosed', 
            ['requestId', 'timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameError', 
            ['requestId', 'timestamp', 'errorMessage']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameSent', 
            ['requestId', 'timestamp', 'response']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Network', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Database = {};
chrome.devtools.protocol.Database.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Database.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Database.disable', paramObject, opt_callback);
    },
    getDatabaseTableNames: function(databaseId, opt_callback/*(tableNames)*/) {
        var paramObject = {
             'databaseId': databaseId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Database.getDatabaseTableNames', paramObject, opt_callback);
    },
    executeSQL: function(databaseId, query, opt_callback/*(success,transactionId)*/) {
        var paramObject = {
             'databaseId': databaseId,
             'query': query,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Database.executeSQL', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addDatabase: function(database) {},
    sqlTransactionSucceeded: function(transactionId, columnNames, values) {},
    sqlTransactionFailed: function(transactionId, sqlError) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Database.addDatabase', 
            ['database']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Database.sqlTransactionSucceeded', 
            ['transactionId', 'columnNames', 'values']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Database.sqlTransactionFailed', 
            ['transactionId', 'sqlError']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Database', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.IndexedDB = {};
chrome.devtools.protocol.IndexedDB.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.disable', paramObject, opt_callback);
    },
    requestDatabaseNamesForFrame: function(requestId, frameId, opt_callback) {
        var paramObject = {
             'requestId': requestId,
             'frameId': frameId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.requestDatabaseNamesForFrame', paramObject, opt_callback);
    },
    requestDatabase: function(requestId, frameId, databaseName, opt_callback) {
        var paramObject = {
             'requestId': requestId,
             'frameId': frameId,
             'databaseName': databaseName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.requestDatabase', paramObject, opt_callback);
    },
    requestData: function(requestId, frameId, databaseName, objectStoreName, indexName, skipCount, pageSize, keyRange, opt_callback) {
        var paramObject = {
             'requestId': requestId,
             'frameId': frameId,
             'databaseName': databaseName,
             'objectStoreName': objectStoreName,
             'indexName': indexName,
             'skipCount': skipCount,
             'pageSize': pageSize,
             'keyRange': keyRange,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('IndexedDB.requestData', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    databaseNamesLoaded: function(requestId, securityOriginWithDatabaseNames) {},
    databaseLoaded: function(requestId, databaseWithObjectStores) {},
    objectStoreDataLoaded: function(requestId, objectStoreDataEntries, hasMore) {},
    indexDataLoaded: function(requestId, indexDataEntries, hasMore) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.databaseNamesLoaded', 
            ['requestId', 'securityOriginWithDatabaseNames']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.databaseLoaded', 
            ['requestId', 'databaseWithObjectStores']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.objectStoreDataLoaded', 
            ['requestId', 'objectStoreDataEntries', 'hasMore']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.indexDataLoaded', 
            ['requestId', 'indexDataEntries', 'hasMore']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('IndexedDB', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.DOMStorage = {};
chrome.devtools.protocol.DOMStorage.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.disable', paramObject, opt_callback);
    },
    getDOMStorageEntries: function(storageId, opt_callback/*(entries)*/) {
        var paramObject = {
             'storageId': storageId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.getDOMStorageEntries', paramObject, opt_callback);
    },
    setDOMStorageItem: function(storageId, key, value, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.setDOMStorageItem', paramObject, opt_callback);
    },
    removeDOMStorageItem: function(storageId, key, opt_callback/*(success)*/) {
        var paramObject = {
             'storageId': storageId,
             'key': key,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.removeDOMStorageItem', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    addDOMStorage: function(storage) {},
    domStorageUpdated: function(storageId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOMStorage.addDOMStorage', 
            ['storage']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOMStorage.domStorageUpdated', 
            ['storageId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('DOMStorage', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.ApplicationCache = {};
chrome.devtools.protocol.ApplicationCache.prototype = {

    // Commands: 
    getFramesWithManifests: function(opt_callback/*(frameIds)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('ApplicationCache.getFramesWithManifests', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('ApplicationCache.enable', paramObject, opt_callback);
    },
    getManifestForFrame: function(frameId, opt_callback/*(manifestURL)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('ApplicationCache.getManifestForFrame', paramObject, opt_callback);
    },
    getApplicationCacheForFrame: function(frameId, opt_callback/*(applicationCache)*/) {
        var paramObject = {
             'frameId': frameId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('ApplicationCache.getApplicationCacheForFrame', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    applicationCacheStatusUpdated: function(frameId, manifestURL, status) {},
    networkStateUpdated: function(isNowOnline) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'ApplicationCache.applicationCacheStatusUpdated', 
            ['frameId', 'manifestURL', 'status']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'ApplicationCache.networkStateUpdated', 
            ['isNowOnline']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('ApplicationCache', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.FileSystem = {};
chrome.devtools.protocol.FileSystem.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('FileSystem.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('FileSystem.disable', paramObject, opt_callback);
    },
};


chrome.devtools.protocol.DOM = {};
chrome.devtools.protocol.DOM.prototype = {

    // Commands: 
    getDocument: function(opt_callback/*(root)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getDocument', paramObject, opt_callback);
    },
    requestChildNodes: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.requestChildNodes', paramObject, opt_callback);
    },
    querySelector: function(nodeId, selector, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.querySelector', paramObject, opt_callback);
    },
    querySelectorAll: function(nodeId, selector, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.querySelectorAll', paramObject, opt_callback);
    },
    setNodeName: function(nodeId, name, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setNodeName', paramObject, opt_callback);
    },
    setNodeValue: function(nodeId, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setNodeValue', paramObject, opt_callback);
    },
    removeNode: function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.removeNode', paramObject, opt_callback);
    },
    setAttributeValue: function(nodeId, name, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setAttributeValue', paramObject, opt_callback);
    },
    setAttributesAsText: function(nodeId, text, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'text': text,
             'name': name,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setAttributesAsText', paramObject, opt_callback);
    },
    removeAttribute: function(nodeId, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.removeAttribute', paramObject, opt_callback);
    },
    /* unsupported */ getEventListenersForNode: function(nodeId, opt_callback/*(listeners)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getEventListenersForNode', paramObject, opt_callback);
    },
    getOuterHTML: function(nodeId, opt_callback/*(outerHTML)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getOuterHTML', paramObject, opt_callback);
    },
    setOuterHTML: function(nodeId, outerHTML, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'outerHTML': outerHTML,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setOuterHTML', paramObject, opt_callback);
    },
    /* unsupported */ performSearch: function(query, opt_callback/*(searchId,resultCount)*/) {
        var paramObject = {
             'query': query,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.performSearch', paramObject, opt_callback);
    },
    /* unsupported */ getSearchResults: function(searchId, fromIndex, toIndex, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'searchId': searchId,
             'fromIndex': fromIndex,
             'toIndex': toIndex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getSearchResults', paramObject, opt_callback);
    },
    /* unsupported */ discardSearchResults: function(searchId, opt_callback) {
        var paramObject = {
             'searchId': searchId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.discardSearchResults', paramObject, opt_callback);
    },
    requestNode: function(objectId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.requestNode', paramObject, opt_callback);
    },
    /* unsupported */ setInspectModeEnabled: function(enabled, highlightConfig, opt_callback) {
        var paramObject = {
             'enabled': enabled,
             'highlightConfig': highlightConfig,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setInspectModeEnabled', paramObject, opt_callback);
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
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.highlightRect', paramObject, opt_callback);
    },
    highlightNode: function(nodeId, highlightConfig, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'highlightConfig': highlightConfig,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.highlightNode', paramObject, opt_callback);
    },
    hideHighlight: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.hideHighlight', paramObject, opt_callback);
    },
    /* unsupported */ highlightFrame: function(frameId, contentColor, contentOutlineColor, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'contentColor': contentColor,
             'contentOutlineColor': contentOutlineColor,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.highlightFrame', paramObject, opt_callback);
    },
    /* unsupported */ pushNodeByPathToFrontend: function(path, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'path': path,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.pushNodeByPathToFrontend', paramObject, opt_callback);
    },
    resolveNode: function(nodeId, objectGroup, opt_callback/*(object)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'objectGroup': objectGroup,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.resolveNode', paramObject, opt_callback);
    },
    getAttributes: function(nodeId, opt_callback/*(attributes)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getAttributes', paramObject, opt_callback);
    },
    moveTo: function(nodeId, targetNodeId, insertBeforeNodeId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'targetNodeId': targetNodeId,
             'insertBeforeNodeId': insertBeforeNodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.moveTo', paramObject, opt_callback);
    },
    /* unsupported */ setTouchEmulationEnabled: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setTouchEmulationEnabled', paramObject, opt_callback);
    },
    /* unsupported */ undo: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.undo', paramObject, opt_callback);
    },
    /* unsupported */ redo: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.redo', paramObject, opt_callback);
    },
    /* unsupported */ markUndoableState: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.markUndoableState', paramObject, opt_callback);
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
    /* unsupported */ shadowRootPushed: function(hostId, root) {},
    /* unsupported */ shadowRootPopped: function(hostId, rootId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.documentUpdated', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.setChildNodes', 
            ['parentId', 'nodes']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.attributeModified', 
            ['nodeId', 'name', 'value']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.attributeRemoved', 
            ['nodeId', 'name']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.inlineStyleInvalidated', 
            ['nodeIds']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.characterDataModified', 
            ['nodeId', 'characterData']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.childNodeCountUpdated', 
            ['nodeId', 'childNodeCount']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.childNodeInserted', 
            ['parentNodeId', 'previousNodeId', 'node']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.childNodeRemoved', 
            ['parentNodeId', 'nodeId']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPushed', 
            ['hostId', 'root']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPopped', 
            ['hostId', 'rootId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('DOM', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.CSS = {};
chrome.devtools.protocol.CSS.prototype = {

    // Commands: 
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.disable', paramObject, opt_callback);
    },
    getMatchedStylesForNode: function(nodeId, forcedPseudoClasses, includePseudo, includeInherited, opt_callback/*(matchedCSSRules,pseudoElements,inherited)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
             'includePseudo': includePseudo,
             'includeInherited': includeInherited,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getMatchedStylesForNode', paramObject, opt_callback);
    },
    getInlineStylesForNode: function(nodeId, opt_callback/*(inlineStyle,attributesStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getInlineStylesForNode', paramObject, opt_callback);
    },
    getComputedStyleForNode: function(nodeId, forcedPseudoClasses, opt_callback/*(computedStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'forcedPseudoClasses': forcedPseudoClasses,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getComputedStyleForNode', paramObject, opt_callback);
    },
    getAllStyleSheets: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getAllStyleSheets', paramObject, opt_callback);
    },
    getStyleSheet: function(styleSheetId, opt_callback/*(styleSheet)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getStyleSheet', paramObject, opt_callback);
    },
    getStyleSheetText: function(styleSheetId, opt_callback/*(text)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getStyleSheetText', paramObject, opt_callback);
    },
    setStyleSheetText: function(styleSheetId, text, opt_callback) {
        var paramObject = {
             'styleSheetId': styleSheetId,
             'text': text,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.setStyleSheetText', paramObject, opt_callback);
    },
    setPropertyText: function(styleId, propertyIndex, text, overwrite, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'text': text,
             'overwrite': overwrite,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.setPropertyText', paramObject, opt_callback);
    },
    toggleProperty: function(styleId, propertyIndex, disable, opt_callback/*(style)*/) {
        var paramObject = {
             'styleId': styleId,
             'propertyIndex': propertyIndex,
             'disable': disable,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.toggleProperty', paramObject, opt_callback);
    },
    setRuleSelector: function(ruleId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'ruleId': ruleId,
             'selector': selector,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.setRuleSelector', paramObject, opt_callback);
    },
    addRule: function(contextNodeId, selector, opt_callback/*(rule)*/) {
        var paramObject = {
             'contextNodeId': contextNodeId,
             'selector': selector,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.addRule', paramObject, opt_callback);
    },
    getSupportedCSSProperties: function(opt_callback/*(cssProperties)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getSupportedCSSProperties', paramObject, opt_callback);
    },
    startSelectorProfiler: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.startSelectorProfiler', paramObject, opt_callback);
    },
    stopSelectorProfiler: function(opt_callback/*(profile)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.stopSelectorProfiler', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    mediaQueryResultChanged: function() {},
    styleSheetChanged: function(styleSheetId) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'CSS.mediaQueryResultChanged', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'CSS.styleSheetChanged', 
            ['styleSheetId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('CSS', this);
    },
};


chrome.devtools.protocol.Timeline = {};
chrome.devtools.protocol.Timeline.prototype = {

    // Commands: 
    start: function(maxCallStackDepth, opt_callback) {
        var paramObject = {
             'maxCallStackDepth': maxCallStackDepth,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Timeline.start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Timeline.stop', paramObject, opt_callback);
    },
    /* unsupported */ setIncludeMemoryDetails: function(enabled, opt_callback) {
        var paramObject = {
             'enabled': enabled,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Timeline.setIncludeMemoryDetails', paramObject, opt_callback);
    },
    /* unsupported */ supportsFrameInstrumentation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Timeline.supportsFrameInstrumentation', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    eventRecorded: function(record) {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Timeline.eventRecorded', 
            ['record']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Timeline', this);
    },
};


chrome.devtools.protocol.Debugger = {};
chrome.devtools.protocol.Debugger.prototype = {

    // Commands: 
    /* unsupported */ causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.causesRecompilation', paramObject, opt_callback);
    },
    /* unsupported */ supportsNativeBreakpoints: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.supportsNativeBreakpoints', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.disable', paramObject, opt_callback);
    },
    setBreakpointsActive: function(active, opt_callback) {
        var paramObject = {
             'active': active,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setBreakpointsActive', paramObject, opt_callback);
    },
    setBreakpointByUrl: function(lineNumber, url, urlRegex, columnNumber, condition, opt_callback/*(breakpointId,locations)*/) {
        var paramObject = {
             'lineNumber': lineNumber,
             'url': url,
             'urlRegex': urlRegex,
             'columnNumber': columnNumber,
             'condition': condition,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setBreakpointByUrl', paramObject, opt_callback);
    },
    setBreakpoint: function(location, condition, opt_callback/*(breakpointId,actualLocation)*/) {
        var paramObject = {
             'location': location,
             'condition': condition,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setBreakpoint', paramObject, opt_callback);
    },
    removeBreakpoint: function(breakpointId, opt_callback) {
        var paramObject = {
             'breakpointId': breakpointId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.removeBreakpoint', paramObject, opt_callback);
    },
    continueToLocation: function(location, opt_callback) {
        var paramObject = {
             'location': location,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.continueToLocation', paramObject, opt_callback);
    },
    stepOver: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.stepOver', paramObject, opt_callback);
    },
    stepInto: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.stepInto', paramObject, opt_callback);
    },
    stepOut: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.stepOut', paramObject, opt_callback);
    },
    pause: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.pause', paramObject, opt_callback);
    },
    resume: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.resume', paramObject, opt_callback);
    },
    searchInContent: function(scriptId, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.searchInContent', paramObject, opt_callback);
    },
    canSetScriptSource: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.canSetScriptSource', paramObject, opt_callback);
    },
    setScriptSource: function(scriptId, scriptSource, preview, opt_callback/*(callFrames,result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'scriptSource': scriptSource,
             'preview': preview,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setScriptSource', paramObject, opt_callback);
    },
    getScriptSource: function(scriptId, opt_callback/*(scriptSource)*/) {
        var paramObject = {
             'scriptId': scriptId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.getScriptSource', paramObject, opt_callback);
    },
    /* unsupported */ getFunctionDetails: function(functionId, opt_callback/*(details)*/) {
        var paramObject = {
             'functionId': functionId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.getFunctionDetails', paramObject, opt_callback);
    },
    setPauseOnExceptions: function(state, opt_callback) {
        var paramObject = {
             'state': state,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setPauseOnExceptions', paramObject, opt_callback);
    },
    evaluateOnCallFrame: function(callFrameId, expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptionsAndMuteConsole, returnByValue, opt_callback/*(result,wasThrown)*/) {
        var paramObject = {
             'callFrameId': callFrameId,
             'expression': expression,
             'objectGroup': objectGroup,
             'includeCommandLineAPI': includeCommandLineAPI,
             'doNotPauseOnExceptionsAndMuteConsole': doNotPauseOnExceptionsAndMuteConsole,
             'returnByValue': returnByValue,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.evaluateOnCallFrame', paramObject, opt_callback);
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
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.globalObjectCleared', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.scriptParsed', 
            ['scriptId', 'url', 'startLine', 'startColumn', 'endLine', 'endColumn', 'isContentScript', 'sourceMapURL']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.scriptFailedToParse', 
            ['url', 'scriptSource', 'startLine', 'errorLine', 'errorMessage']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.breakpointResolved', 
            ['breakpointId', 'location']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.paused', 
            ['callFrames', 'reason', 'data']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.resumed', 
            ['']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Debugger', this);
    },
};


chrome.devtools.protocol.DOMDebugger = {};
chrome.devtools.protocol.DOMDebugger.prototype = {

    // Commands: 
    setDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.setDOMBreakpoint', paramObject, opt_callback);
    },
    removeDOMBreakpoint: function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.removeDOMBreakpoint', paramObject, opt_callback);
    },
    setEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.setEventListenerBreakpoint', paramObject, opt_callback);
    },
    removeEventListenerBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.removeEventListenerBreakpoint', paramObject, opt_callback);
    },
    /* unsupported */ setInstrumentationBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.setInstrumentationBreakpoint', paramObject, opt_callback);
    },
    /* unsupported */ removeInstrumentationBreakpoint: function(eventName, opt_callback) {
        var paramObject = {
             'eventName': eventName,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.removeInstrumentationBreakpoint', paramObject, opt_callback);
    },
    setXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.setXHRBreakpoint', paramObject, opt_callback);
    },
    removeXHRBreakpoint: function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.removeXHRBreakpoint', paramObject, opt_callback);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Profiler = {};
chrome.devtools.protocol.Profiler.prototype = {

    // Commands: 
    causesRecompilation: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.causesRecompilation', paramObject, opt_callback);
    },
    isSampling: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.isSampling', paramObject, opt_callback);
    },
    hasHeapProfiler: function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.hasHeapProfiler', paramObject, opt_callback);
    },
    enable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.enable', paramObject, opt_callback);
    },
    disable: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.disable', paramObject, opt_callback);
    },
    start: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.start', paramObject, opt_callback);
    },
    stop: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.stop', paramObject, opt_callback);
    },
    getProfileHeaders: function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.getProfileHeaders', paramObject, opt_callback);
    },
    getProfile: function(type, uid, opt_callback/*(profile)*/) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.getProfile', paramObject, opt_callback);
    },
    removeProfile: function(type, uid, opt_callback) {
        var paramObject = {
             'type': type,
             'uid': uid,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.removeProfile', paramObject, opt_callback);
    },
    clearProfiles: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.clearProfiles', paramObject, opt_callback);
    },
    takeHeapSnapshot: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.takeHeapSnapshot', paramObject, opt_callback);
    },
    collectGarbage: function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.collectGarbage', paramObject, opt_callback);
    },
    getObjectByHeapObjectId: function(objectId, objectGroup, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'objectGroup': objectGroup,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.getObjectByHeapObjectId', paramObject, opt_callback);
    },
    getHeapObjectId: function(objectId, opt_callback/*(heapSnapshotObjectId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Profiler.getHeapObjectId', paramObject, opt_callback);
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
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.addProfileHeader', 
            ['header']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.addHeapSnapshotChunk', 
            ['uid', 'chunk']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.finishHeapSnapshot', 
            ['uid']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.setRecordingProfile', 
            ['isProfiling']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.resetProfiles', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.reportHeapSnapshotProgress', 
            ['done', 'total']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Profiler', this);
    },
};

/* unsupported */ 
chrome.devtools.protocol.Worker = {};
chrome.devtools.protocol.Worker.prototype = {

    // Commands: 
    setWorkerInspectionEnabled: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.setWorkerInspectionEnabled', paramObject, opt_callback);
    },
    sendMessageToWorker: function(workerId, message, opt_callback) {
        var paramObject = {
             'workerId': workerId,
             'message': message,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.sendMessageToWorker', paramObject, opt_callback);
    },
    connectToWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.connectToWorker', paramObject, opt_callback);
    },
    disconnectFromWorker: function(workerId, opt_callback) {
        var paramObject = {
             'workerId': workerId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.disconnectFromWorker', paramObject, opt_callback);
    },
    setAutoconnectToWorkers: function(value, opt_callback) {
        var paramObject = {
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Worker.setAutoconnectToWorkers', paramObject, opt_callback);
    },

    // Event handlers to override, then call addListeners
    workerCreated: function(workerId, url, inspectorConnected) {},
    workerTerminated: function(workerId) {},
    dispatchMessageFromWorker: function(workerId, message) {},
    disconnectedFromWorker: function() {},

    // Call in your constructor to register for this events in domain
    addListeners: function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.workerCreated', 
            ['workerId', 'url', 'inspectorConnected']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.workerTerminated', 
            ['workerId']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.dispatchMessageFromWorker', 
            ['workerId', 'message']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.disconnectedFromWorker', 
            ['']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Worker', this);
    },
};

/* copyright 2011 Google, inc. johnjbarton@google.com Google BSD License */
/* See https://github.com/johnjbarton/atopwi/blob/master/APIGeneration/generateRemoteDebugAPI.html */
}());
