atopwi - atop Web Inspector (a-top-wee)
01AUG11 johnjbarton

atopwi forks the Chrome Developer Tools version of WebKit Inspector.
 /WebKit tracks  http://svn.webkit.org/repository/webkit/branches/chromium/<aNumber>/Source/WebCore/inspector/front-end
 /chromium tracks http://svn.webkit.org/repository/webkit/branches/chromium/<aNumber>/Source/WebKit/chromium/src/js
where <aNumber> is the third stanza in the Chrome version number, eg 782 in 13.0.782.107

As much as possible the goal will be to track the latest source. In cases where the devtools_frontend.zip 
will not connect with the back end, atopwi will lag. See http://www.chromium.org/devtools

Actual commands in /atopwi 
svn checkout http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/inspector/front-end/ WebKit
svn checkout http://svn.webkit.org/repository/webkit/trunk/Source/WebKit/chromium/src/js/ chromium

http://svn.webkit.org/repository/webkit/trunk/Source/WebKit/chromium/src/js/ chromium
http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/inspector/front-end/ WebKit

-----------------------------
Notes

InspectorBackendStub.js is pulled from $(obj)/gen/webcore during devtools.js concatentation in concatenated_devtools_js.target.mk
InspectorBackendStub.js is a dependent of a rule in inspector_protocol_sources.target.mk. 