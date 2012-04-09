

var SiriusBase = 'chrome-extension://fkhgelnmojgnpahkeemhnbjndeeocehc';

// TODO change crx2app to use ../..
window.crx2appBase = SiriusBase + '/crx2app/extension'; // for workaround 

require({
    paths: {
      'crx2app': SiriusBase + '/crx2app/extension',
      'atopwi': SiriusBase + '/atopwi',
      'RESTChannel': SiriusBase + '/RESTChannel'
    }
});

require(['../../devtoolsAdapter/Debuggee'], function(Debuggee) {
    var debuggee = new Debuggee(SiriusBase);
    debuggee.attachToParent();
});
