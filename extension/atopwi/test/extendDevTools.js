// This code is loaded by 'options' settings in Sirius
// It loads into devtools.html as a devtools extension.

chrome.devtools.panels.create("Test", '', 'atopwi/test/testPanel.html', function(PanelAPI) {
  console.log('extendDevTools.html PANEL callback', arguments);
  PanelAPI.onShown.addListener(function(win) {
    console.log('extendDevTools.html panel.onShown callback', arguments);
  });
});