// As a Sirius extension we are in extension/Purple.
// If we migrate to a devtools extension we may need to change this.
var purplePath = "./Purple/";


// watch when resource contents are committed
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
  console.log('resource content committed ' + resource.url);
});

var resource_cache = {};

chrome.devtools.inspectedWindow.onResourceAdded.addListener(function(resource) {
  resource_cache[resource.url] = resource;
});

chrome.devtools.inspectedWindow.getResources(function(resources) {
  resources.forEach(function(resource) {
    resource_cache[resource.url] = resource; 
  });
});


// create the purple panel
chrome.devtools.panels.create('Purple', purplePath + 'img/Purple32x32.png', purplePath + 'purplePanel.html', function(panel) {
  console.log('purple-panel',JSON.stringify(panel),panel);

  var panel_window; // the panel does not load until shown,
  var buffer;       // so we may need to buffer resource info,
  var panel_isReady; // until we flip this flag

  var resource_cache = {};

  // load resource code into the editor
  //
  function fireShowResource(resource, line) {
    if (panel_isReady) {
      panel_window.purple.onShowResource(resource, line);
    } else {
      buffer = Array.prototype.slice.apply(arguments);
      console.log('buffering resource', buffer);
    }
  }

  // commit changes made to resource code
  function save(url, content) {
    console.assert(editor);
    console.log('saving', editor.getValue());
    var resource = resource_cache[url];
    if (resource) {
      resource.setContent(content, true, function(status){
        if (status && status.isError) {
          console.error('Could\'t save Resource:', status);
          return false;
        } else {
          console.log('Resource saved!');
          return true;
        }
      });
    } else {
      console.error("devtools has no resource at "+url);
      return false;
    }
  }

  function onAttach(connection) {
    console.log(window.location + ' attach');


  }

  // as panels load lazily, grab the editor when it's ready
  panel.onShown.addListener(function(window) {
    console.log("panel.onShown");
    function onShown() {
      panel_window.purple.show();
    }
    if (!panel_window) { // Then this is the first time we opened the panel       
      panel_window = window;
    }
  });

  // use panel to open resources
  chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
    console.log('open resource handler', resource, resource.url, resource.type, line);
    fireShowResource(resource, line);
    panel.show();

  });

  // wire WebInspector search bar to the editor
  panel.onSearch.addListener(function(action, query) {
    console.log('search',action,query);
    if (editor) {
      var cursor = editor.getSearchCursor(query, null, true);
      cursor.findNext();
    }
  });

});

