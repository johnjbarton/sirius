/*******************************************************************************
 * @license
 * Copyright (c) 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

/*globals define window document  */

//Without this line almond wont work
define.unordered = true;

define("js/orionformatter", [
		"../orion/textview/textModel",
		"../orion/textview/textView", 
		"../orion/textview/rulers",
		"../orion/editor/textMateStyler",
		"../orion/editor/htmlGrammar",
		"../examples/textview/textStyler",
		"i18n"],
 
function(mTextModel, mTextView, mRulers, mTextMateStyler, mHtmlGrammar, mTextStyler) {

	function addTextView(parent, text, lang, writable, ruler) {
		var model = new mTextModel.TextModel(text);

  		//Note that almond does not support toUrl
  		var host = "";
  		var options = {
  			parent: parent,
  			model: model,
//			stylesheet: [
//				require.toUrl("orion/textview/textview.css"),
//				require.toUrl("orion/textview/rulers.css"),
//				require.toUrl("examples/textview/textstyler.css")
//			],
  			// stylesheet: [
  			//   	host+"/textview.css", 
  			//   	host+"/rulers.css",
  			//   	host+"/textstyler.css",
  			//   	host+"/htmlStyles.css"
  			// ],	
  			readonly: !writable,
  			tabSize: 4
  		};
  		var view = new mTextView.TextView(options);
  		if (ruler) {
  			var linesRuler = new mRulers.LineNumberRuler(null, "left", {styleClass: "ruler lines"}, {styleClass: "rulerLines odd"}, {styleClass: "rulerLines even"});
  			view.addRuler(linesRuler);
  		}
  		var styler;
  		switch (lang) {
  			case "js":
  			case "java":
  			case "css":
  				styler = new mTextStyler.TextStyler(view, "js");
  				styler.setHighlightCaretLine(writable);
  				break;
  			case "html":
  				styler = new mTextMateStyler.TextMateStyler(view, mHtmlGrammar.HtmlGrammar().grammar);
  				break;
  		}
  		view.addEventListener("Load", function () {
  			parent.style.height = (view.getLineHeight() * view.getModel().getLineCount() + 4) + 'px';
  		});
  	}

	function getTextFromElement(element) {
		if (!window.getSelection) {
			return element.innerText || element.textContent;
		}
		var newRange = document.createRange();
		newRange.selectNode(element);
		var selection = window.getSelection();
		var oldRanges = [], i;
		for (i = 0; i < selection.rangeCount; i++) {
			oldRanges.push(selection.getRangeAt(i));
		}
		selection.removeAllRanges();
		selection.addRange(newRange);
		var text = selection.toString();
		selection.removeAllRanges();
		for (i = 0; i < oldRanges.length; i++) {
			selection.addRange(oldRanges[i]);
		}
		return text;
	}

	function findElements() {
		var elements = document.getElementsByTagName("PRE");
		if (elements) {
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i];
				if (element.getAttribute("name") === "orion") {
					var writable = false;
					var lang = "";
					var ruler = false;
					var options = element.getAttribute("class");
					if (options) {
						var match = options.match(/writable/);
						if (match && match.length > 0) {
							writable = true;
						}
						match = options.match(/js|java|css|html/);
						if (match && match.length > 0) {
							lang = match[0];
						}
						match = options.match(/ruler/);
						if (match && match.length > 0) {
							ruler = true;
						}
					}
					addTextView(element, getTextFromElement(element), lang, writable, ruler);
				}
			}
		}
	}

	findElements();
});