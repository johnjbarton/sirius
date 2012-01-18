var chrome = chrome || {};
chrome.debugger = chrome.debugger || {};

chrome.debugger.Inspector = {

    enable: function(),
    disable: function(),
    events: {
        evaluateForTestInFrontend: function(testCallId, script)
        inspect: function(object, hints)
        didCreateWorker: function(id, url, isShared)
        didDestroyWorker: function(id)
    }
};

chrome.debugger.Memory = {

    /* returns: count*/
    getDOMNodeCount: function(),
};

chrome.debugger.Page = {

    enable: function(),
    disable: function(),
    /* returns: identifier*/
    addScriptToEvaluateOnLoad: function(scriptSource),
    removeScriptToEvaluateOnLoad: function(identifier),
    reload: function(ignoreCache, scriptToEvaluateOnLoad),
    open: function(url, newWindow),
    /* returns: cookies,cookiesString*/
    getCookies: function(),
    deleteCookie: function(cookieName, domain),
    /* returns: frameTree*/
    getResourceTree: function(),
    /* returns: content,base64Encoded*/
    getResourceContent: function(frameId, url),
    /* returns: result*/
    searchInResource: function(frameId, url, query, caseSensitive, isRegex),
    /* returns: result*/
    searchInResources: function(text, caseSensitive, isRegex),
    events: {
        domContentEventFired: function(timestamp)
        loadEventFired: function(timestamp)
        frameNavigated: function(frame)
        frameDetached: function(frameId)
    }
};

chrome.debugger.Runtime = {

    /* returns: result,wasThrown*/
    evaluate: function(expression, objectGroup, includeCommandLineAPI, doNotPauseOnExceptions, frameId, returnByValue),
    /* returns: result,wasThrown*/
    callFunctionOn: function(objectId, functionDeclaration, arguments, returnByValue),
    /* returns: result*/
    getProperties: function(objectId, ownProperties),
    releaseObject: function(objectId),
    releaseObjectGroup: function(objectGroup),
    run: function(),
};

chrome.debugger.Console = {

    enable: function(),
    disable: function(),
    clearMessages: function(),
    setMonitoringXHREnabled: function(enabled),
    addInspectedNode: function(nodeId),
    events: {
        messageAdded: function(message)
        messageRepeatCountUpdated: function(count)
        messagesCleared: function()
    }
};

chrome.debugger.Network = {

    enable: function(),
    disable: function(),
    setUserAgentOverride: function(userAgent),
    setExtraHTTPHeaders: function(headers),
    /* returns: body,base64Encoded*/
    getResponseBody: function(requestId),
    /* returns: result*/
    canClearBrowserCache: function(),
    clearBrowserCache: function(),
    /* returns: result*/
    canClearBrowserCookies: function(),
    clearBrowserCookies: function(),
    setCacheDisabled: function(cacheDisabled),
    events: {
        requestWillBeSent: function(requestId, frameId, loaderId, documentURL, request, timestamp, initiator, stackTrace, redirectResponse)
        requestServedFromCache: function(requestId)
        responseReceived: function(requestId, frameId, loaderId, timestamp, type, response)
        dataReceived: function(requestId, timestamp, dataLength, encodedDataLength)
        loadingFinished: function(requestId, timestamp)
        loadingFailed: function(requestId, timestamp, errorText, canceled)
        requestServedFromMemoryCache: function(requestId, frameId, loaderId, documentURL, timestamp, initiator, resource)
        webSocketWillSendHandshakeRequest: function(requestId, timestamp, request)
        webSocketHandshakeResponseReceived: function(requestId, timestamp, response)
        webSocketCreated: function(requestId, url)
        webSocketClosed: function(requestId, timestamp)
    }
};

chrome.debugger.Database = {

    enable: function(),
    disable: function(),
    /* returns: tableNames*/
    getDatabaseTableNames: function(databaseId),
    /* returns: success,transactionId*/
    executeSQL: function(databaseId, query),
    events: {
        addDatabase: function(database)
        sqlTransactionSucceeded: function(transactionId, columnNames, values)
        sqlTransactionFailed: function(transactionId, sqlError)
    }
};

chrome.debugger.DOMStorage = {

    enable: function(),
    disable: function(),
    /* returns: entries*/
    getDOMStorageEntries: function(storageId),
    /* returns: success*/
    setDOMStorageItem: function(storageId, key, value),
    /* returns: success*/
    removeDOMStorageItem: function(storageId, key),
    events: {
        addDOMStorage: function(storage)
        updateDOMStorage: function(storageId)
    }
};

chrome.debugger.ApplicationCache = {

    /* returns: frameIds*/
    getFramesWithManifests: function(),
    enable: function(),
    /* returns: manifestURL*/
    getManifestForFrame: function(frameId),
    /* returns: applicationCache*/
    getApplicationCacheForFrame: function(frameId),
    events: {
        applicationCacheStatusUpdated: function(frameId, manifestURL, status)
        networkStateUpdated: function(isNowOnline)
    }
};

chrome.debugger.FileSystem = {

    enable: function(),
    disable: function(),
    events: {}
};

chrome.debugger.DOM = {

    /* returns: root*/
    getDocument: function(),
    requestChildNodes: function(nodeId),
    /* returns: nodeId*/
    querySelector: function(nodeId, selector),
    /* returns: nodeIds*/
    querySelectorAll: function(nodeId, selector),
    /* returns: nodeId*/
    setNodeName: function(nodeId, name),
    setNodeValue: function(nodeId, value),
    removeNode: function(nodeId),
    setAttributeValue: function(nodeId, name, value),
    setAttributesAsText: function(nodeId, text, name),
    removeAttribute: function(nodeId, name),
    /* returns: listeners*/
    getEventListenersForNode: function(nodeId),
    copyNode: function(nodeId),
    /* returns: outerHTML*/
    getOuterHTML: function(nodeId),
    /* returns: nodeId*/
    setOuterHTML: function(nodeId, outerHTML),
    /* returns: searchId,resultCount*/
    performSearch: function(query),
    /* returns: nodeIds*/
    getSearchResults: function(searchId, fromIndex, toIndex),
    discardSearchResults: function(searchId),
    /* returns: nodeId*/
    requestNode: function(objectId),
    setInspectModeEnabled: function(enabled, highlightConfig),
    highlightRect: function(x, y, width, height, color, outlineColor),
    highlightNode: function(nodeId, highlightConfig),
    hideHighlight: function(),
    highlightFrame: function(frameId, contentColor, contentOutlineColor),
    /* returns: nodeId*/
    pushNodeByPathToFrontend: function(path),
    /* returns: object*/
    resolveNode: function(nodeId, objectGroup),
    /* returns: attributes*/
    getAttributes: function(nodeId),
    /* returns: nodeId*/
    moveTo: function(nodeId, targetNodeId, insertBeforeNodeId),
    events: {
        documentUpdated: function()
        setChildNodes: function(parentId, nodes)
        attributeModified: function(nodeId, name, value)
        attributeRemoved: function(nodeId, name)
        inlineStyleInvalidated: function(nodeIds)
        characterDataModified: function(nodeId, characterData)
        childNodeCountUpdated: function(nodeId, childNodeCount)
        childNodeInserted: function(parentNodeId, previousNodeId, node)
        childNodeRemoved: function(parentNodeId, nodeId)
    }
};

chrome.debugger.CSS = {

    enable: function(),
    disable: function(),
    /* returns: matchedCSSRules,pseudoElements,inherited*/
    getMatchedStylesForNode: function(nodeId, forcedPseudoClasses, includePseudo, includeInherited),
    /* returns: inlineStyle,styleAttributes*/
    getInlineStylesForNode: function(nodeId),
    /* returns: computedStyle*/
    getComputedStyleForNode: function(nodeId, forcedPseudoClasses),
    /* returns: headers*/
    getAllStyleSheets: function(),
    /* returns: styleSheet*/
    getStyleSheet: function(styleSheetId),
    /* returns: text*/
    getStyleSheetText: function(styleSheetId),
    setStyleSheetText: function(styleSheetId, text),
    /* returns: style*/
    setPropertyText: function(styleId, propertyIndex, text, overwrite),
    /* returns: style*/
    toggleProperty: function(styleId, propertyIndex, disable),
    /* returns: rule*/
    setRuleSelector: function(ruleId, selector),
    /* returns: rule*/
    addRule: function(contextNodeId, selector),
    /* returns: cssProperties*/
    getSupportedCSSProperties: function(),
    startSelectorProfiler: function(),
    /* returns: profile*/
    stopSelectorProfiler: function(),
    events: {
        mediaQueryResultChanged: function()
    }
};

chrome.debugger.Timeline = {

    start: function(maxCallStackDepth),
    stop: function(),
    events: {
        eventRecorded: function(record)
    }
};

chrome.debugger.Debugger = {

    /* returns: result*/
    causesRecompilation: function(),
    /* returns: result*/
    supportsNativeBreakpoints: function(),
    enable: function(),
    disable: function(),
    setBreakpointsActive: function(active),
    /* returns: breakpointId,locations*/
    setBreakpointByUrl: function(lineNumber, url, urlRegex, columnNumber, condition),
    /* returns: breakpointId,actualLocation*/
    setBreakpoint: function(location, condition),
    removeBreakpoint: function(breakpointId),
    continueToLocation: function(location),
    stepOver: function(),
    stepInto: function(),
    stepOut: function(),
    pause: function(),
    resume: function(),
    /* returns: result*/
    searchInContent: function(scriptId, query, caseSensitive, isRegex),
    /* returns: result*/
    canSetScriptSource: function(),
    /* returns: callFrames,result*/
    setScriptSource: function(scriptId, scriptSource, preview),
    /* returns: scriptSource*/
    getScriptSource: function(scriptId),
    /* returns: location*/
    getFunctionLocation: function(functionId),
    setPauseOnExceptions: function(state),
    /* returns: result,wasThrown*/
    evaluateOnCallFrame: function(callFrameId, expression, objectGroup, includeCommandLineAPI, returnByValue),
    events: {
        globalObjectCleared: function()
        scriptParsed: function(scriptId, url, startLine, startColumn, endLine, endColumn, isContentScript, sourceMapURL)
        scriptFailedToParse: function(url, scriptSource, startLine, errorLine, errorMessage)
        breakpointResolved: function(breakpointId, location)
        paused: function(callFrames, reason, data)
        resumed: function()
    }
};

chrome.debugger.DOMDebugger = {

    setDOMBreakpoint: function(nodeId, type),
    removeDOMBreakpoint: function(nodeId, type),
    setEventListenerBreakpoint: function(eventName),
    removeEventListenerBreakpoint: function(eventName),
    setXHRBreakpoint: function(url),
    removeXHRBreakpoint: function(url),
};

chrome.debugger.Profiler = {

    /* returns: result*/
    causesRecompilation: function(),
    /* returns: result*/
    isSampling: function(),
    /* returns: result*/
    hasHeapProfiler: function(),
    enable: function(),
    disable: function(),
    start: function(),
    stop: function(),
    /* returns: headers*/
    getProfileHeaders: function(),
    /* returns: profile*/
    getProfile: function(type, uid),
    removeProfile: function(type, uid),
    clearProfiles: function(),
    takeHeapSnapshot: function(),
    collectGarbage: function(),
    /* returns: result*/
    getObjectByHeapObjectId: function(objectId),
    events: {
        addProfileHeader: function(header)
        addHeapSnapshotChunk: function(uid, chunk)
        finishHeapSnapshot: function(uid)
        setRecordingProfile: function(isProfiling)
        resetProfiles: function()
        reportHeapSnapshotProgress: function(done, total)
    }
};

chrome.debugger.Worker = {

    setWorkerInspectionEnabled: function(value),
    sendMessageToWorker: function(workerId, message),
    connectToWorker: function(workerId),
    disconnectFromWorker: function(workerId),
    setAutoconnectToWorkers: function(value),
    events: {
        workerCreated: function(workerId, url, inspectorConnected)
        workerTerminated: function(workerId)
        dispatchMessageFromWorker: function(workerId, message)
        disconnectedFromWorker: function()
    }
};