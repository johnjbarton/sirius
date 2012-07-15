

var SiriusBase = 'chrome-extension://fkhgelnmojgnpahkeemhnbjndeeocehc';

window.crx2appBase = SiriusBase + '/crx2app/extension'; // for workaround 

require({
    paths: {
      'crx2app': '../../../crx2app/extension',
      'devtoolsAdapter': '../../devtoolsAdapter',
    }
});

require(['devtoolsAdapter/Debuggee'], function(Debuggee) {
    var debuggee = new Debuggee(SiriusBase);
    debuggee.attachToParent();
});
