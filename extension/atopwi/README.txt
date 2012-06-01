atopwi - atop Web Inspector (a-top-wee)

Requires Chrome 20+

This is the Web Inspector aka Chrome DevTools front end running in a web page.

Now part of the Sirius project. See https://github.com/johnjbarton/sirius



Testing:
-------

This info is for testing patches to WebKit from atopwi/inspector/front-end

Where the tests live:
  chromium/src/third_party/WebKit/LayoutTests/inspector
  chromium/src/third_party/WebKit/LayoutTests/http/tests/inspector
  chromium/src/chrome/browser/debugger/devtools_sanity_unittest.cc

How to run them:

First build

make -j10 BUILDTYPE=Release DumpRenderTree

webkit/tools/layout_tests/run_webkit_tests.sh inspector

make -j10 BUILDTYPE=Release interactive_ui_tests

out/Release/interactive_ui_tests --gtest_help
  
