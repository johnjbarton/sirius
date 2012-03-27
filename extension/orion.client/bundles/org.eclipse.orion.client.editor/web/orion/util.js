/*global define window document navigator*/

define([], function() {
                
	/**
	 * This is hack
	 */

	/**
	 * Returns whether the given event should cause a reference
	 * to open in a new window or not.
	 * @param {Object} event The key event
	 * @name orion.util#openInNewWindow
	 * @function
	 */
	function openInNewWindow(event) {
		var isMac = window.navigator.platform.indexOf("Mac") !== -1;
		return (isMac && event.metaKey) || (!isMac && event.ctrlKey);
	}
	
	/**
	 * Opens a link in response to some event. Whether the link
	 * is opened in the same window or a new window depends on the event
	 * @param {String} href The link location
	 * @name orion.util#followLink
	 * @function
	 */
	function followLink(href, event) {
		if (event && openInNewWindow(event)) {
			window.open(href);
		} else {
			window.location = href;
		}
	}

	function makeRelative(location) {
		if (!location) {
			return location;
		}
		var nonHash = window.location.href.split('#')[0];
		var hostName = nonHash.substring(0, nonHash.length - window.location.pathname.length);
		if (location.indexOf(hostName) === 0) {
			return location.substring(hostName.length);
		}
		return location;
	}
	
	function makeFullPath(location) {
		if (!location) {
			return location;
		}
		var nonHash = window.location.href.split('#')[0];
		var hostName = nonHash.substring(0, nonHash.length - window.location.pathname.length);
		return (hostName + location);
	}
	
	/**
	 * Determines if the path represents the workspace root
	 * @name orion.util#isAtRoot
	 * @function
	 */
	function isAtRoot(path) {
		var relative = this.makeRelative(path);
		// TODO better way?
		// I thought it should be the line below but is actually the root of all workspaces
		//  return relative == '/file/';
		return relative.indexOf('/workspace') === 0;
	}
	
	
	function processNavigatorParent(parent, children) {
		//link the parent and children together
		parent.children = children;
		for (var e in children) {
			var child = children[e];
			child.parent=parent;
		}
		// not ideal, but for now, sort here so it's done in one place.
		// this should really be something pluggable that the UI defines
		parent.children.sort(function(a, b) {
			var isDir1 = a.Directory;
			var isDir2 = b.Directory;
			if (isDir1 !== isDir2) {
				return isDir1 ? -1 : 1;
			}
			var n1 = a.Name && a.Name.toLowerCase();
			var n2 = b.Name && b.Name.toLowerCase();
			if (n1 < n2) { return -1; }
			if (n1 > n2) { return 1; }
			return 0;
		}); 
	}
	
	function rememberSuccessfulTraversal(item, registry) {
		if (item.Parents && item.Parents.length === 0) {
			registry.getService("orion.core.preference").getPreferences("/window/recent").then(function(prefs){
				var projects = prefs.get("projects");
				if (typeof projects === "string") {
					projects = JSON.parse(projects);
				}
				var storedProjects = [];
				if (projects && projects.length && projects.length > 0) {
					for (var k=0; k<projects.length; k++) {
						if (projects[k].location !== item.ChildrenLocation && projects[k].name !== item.Name) {
							storedProjects.push(projects[k]);
						}
					}
					storedProjects.push({name: item.Name, location: item.ChildrenLocation});
				} else {
					storedProjects.push({name: item.Name, location: item.ChildrenLocation});
				}
				if (storedProjects.length > 5) {
					storedProjects= storedProjects.slice(-5, storedProjects.length);
				}
				prefs.put("projects", storedProjects);
			});
		}
	}
	
	/**
	 * Returns the text contained by a DOM node.
	 * @param {DomNode} node
	 * @returns {String} The text contained by node. Note that treatment of whitespace 
	 * and child nodes is not consistent across browsers.
	 * @name orion.util#getText
	 * @function
	 */
	function getText(node) {
		return typeof(node.textContent) !== "undefined" ? node.textContent : node.innerText;
	}
	
	/**
	 * Escapes HTML in string. Use this to sanitize user input that is destined for innerHTML.
	 * @param {String} string
	 * @returns {String} The string with HTML safely escaped.
	 * @name orion.util#safeText
	 * @function
	 */
	function safeText(string) {
		return getText(document.createTextNode(string));
	}
	
	/**
	 * Removes all children of node and replaces them with a single text node containing text.
	 * HTML is safely escaped.
	 * @param {DomNode} node
	 * @param {String} text
	 */
	function setText(node, text) {
		if (typeof(node.textContent) !== "undefined") {
			node.textContent = text;
		} else {
			node.innerText = text;
		}
	}
	
	/**
	 * Utility method for saving file contents to a specified location
	 */
	function saveFileContents(fileClient, targetMetadata, contents, afterSave) {
		var etag = targetMetadata.ETag;
		var args = { "ETag" : etag };
		fileClient.write(targetMetadata.Location, contents, args).then(
			function(result) {
				if (afterSave) {
					afterSave();
				}
			},
			/* error handling */
			function(error) {
				// expected error - HTTP 412 Precondition Failed 
				// occurs when file is out of sync with the server
				if (error.status === 412) {
					var forceSave = window.confirm("Resource is out of sync with the server. Do you want to save it anyway?");
					if (forceSave) {
						// repeat save operation, but without ETag 
						fileClient.write(targetMetadata.Location, contents).then(
							function(result) {
									targetMetadata.ETag = result.ETag;
									if (afterSave) {
										afterSave();
									}
							}
						);
					}
				}
				// unknown error
				else {
					error.log = true;
				}
			}
		);
	}
	
	/**
	 * Split file contents into lines. It also handles the mixed line endings with "\n", "\r" and "\r\n".
	 *
	 * @param {String} text The file contetns.
	 * @returns {Array} Split file lines. 
	 * @name orion.util#splitFile
	 * @function
	 */
	function splitFile(text) {
		var cr = 0, lf = 0, index = 0, start = 0;
		var splitLines = [];
		while (true) {
			if (cr !== -1 && cr <= index) { 
				cr = text.indexOf("\r", index); 
			}
			if (lf !== -1 && lf <= index) { 
				lf = text.indexOf("\n", index); 
			}
			if (lf === -1 && cr === -1) {
				break; 
			}
			var offset = 1;
			if (cr !== -1 && lf !== -1) {
				if (cr + 1 === lf) {
					offset = 2;
					index = lf + 1;
				} else {
					index = (cr < lf ? cr : lf) + 1;
				}
			} else if (cr !== -1) {
				index = cr + 1;
			} else {
				index = lf + 1;
			}
			splitLines.push(text.substring(start, index - offset));
			start = index;
		}
		return splitLines;
	}
	
	function formatMessage(msg) {
		var args = arguments;
		return msg.replace(/\$\{([^\}]+)\}/g, function(str, index) { return args[(index << 0) + 1]; });
	}
	
	//return module exports
	return {
		openInNewWindow: openInNewWindow,
		followLink: followLink,
		makeRelative: makeRelative,
		makeFullPath: makeFullPath,
		isAtRoot: isAtRoot,
		processNavigatorParent: processNavigatorParent,
		rememberSuccessfulTraversal: rememberSuccessfulTraversal,
		getText: getText,
		safeText: safeText,
		setText: setText,
		saveFileContents: saveFileContents,
		splitFile: splitFile,
		formatMessage: formatMessage
	};
});
