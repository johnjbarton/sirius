// watch when resource contents are committed
chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
  console.log('resource content committed', resource, content);
});

// create the CodeMirror panel
chrome.devtools.panels.create('CodeMirror', 'img/mirror32.png', 'index.html', function(panel) {
  console.log('panel',JSON.stringify(panel),panel);

  var res = null,
      editor = null,
      buffer = null;

  // load resource code into the editor
  function load(content, type, line) {
    if (editor) {
      console.log('loading', content, type, line);
      editor.setValue(content);
      editor.setOption('mode', (type === 'script' ? 'javascript' : 'css'));
      editor.setCursor({line:line||0, ch:0});
    } else {
      buffer = {content:content, type:type, line:line};
      console.log('buffering load', buffer);
    }
  }

  // commit changes made to resource code
  function save() {
    if (editor) {
      console.log('saving', editor.getValue());
      res.setContent(editor.getValue(), true, function(status){
        if (status && status.isError) console.error('Could\'t save Resource:', status);
        else console.log('Resource saved!');
      });
    }
  }

  // use CodeMirror panel to open resources
  chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
    console.log('open resource', resource, resource.url, resource.type, line);

    res = resource;
    res.getContent(function(content, encoding) {
      console.log('encoding', encoding);
      load(content, res.type, line);
    });

    panel.show();
  });

  // as panels load lazily, grab the editor when it's ready
  panel.onShown.addListener(function(window) {
    if (!editor) {
      console.log('setting editor', window.editor);
      editor = window.editor;
    }
    if (buffer) {
      console.log('loading buffer');
      load(buffer.content, buffer.line);
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

  var buttonsave = panel.createStatusBarButton('img/mirror32.png', 'Save', false);
  buttonsave.onClicked.addListener(save);

  // test inspectedWindow.getResources
  /*var buttonres = panel.createStatusBarButton('img/mirror16.png', 'Resources', false);
  buttonres.onClicked.addListener(function() {
    chrome.devtools.inspectedWindow.getResources(function(res){
      console.log(res);
    });
  });*/
});

