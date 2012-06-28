// As a Sirius extension we are in extension/Purple.
// If we migrate to a devtools extension we may need to change this.
var purplePath = "./Purple/";


// watch when resource contents are committed
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
  console.log('resource content committed', resource, content);
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

  var panel_window; // the panel does not load until shown
  var buffer;       // so we may need to buffer resource info

  var resource_cache = {};


  // load resource code into the editor
  function load(url, content, type, line) {
    if (panel_window) {
      var editor = panel_window.purple.createEditor(url, content, type);
      editor.goToLine(line || 1, 1);
    } else {
      buffer = Array.prototype.slice.apply(arguments);
      console.log('buffering load', buffer);
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
  
  // use CodeMirror panel to open resources
  chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
    console.log('open resource', resource, resource.url, resource.type, line);

    resource_cache[resource.url] = resource;

    resource.getContent(function(content, encoding) {
      console.log('encoding', encoding);
      load(resource.url, content, resource.type, line);
    });

    panel.show();
  });

  // as panels load lazily, grab the editor when it's ready
  panel.onShown.addListener(function(window) {
    panel_window = window;
    if (buffer) {
      console.log('loading buffer', buffer);
      load.apply(null, buffer);
      buffer = null;
    }
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

