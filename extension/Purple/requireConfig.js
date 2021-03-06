// See license.txt for Google BSD license
// Copyright 2012 Google, Inc. johnjbarton@chromium.org

/*global require */

var paths = {
      'OrionEditorEmbedded': '../../OrionEditorEmbedded',
      'orion': '../orion.client/bundles/org.eclipse.orion.client.editor/web/orion',
      'text': '../orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/text',
      'i18n': '../orion.client/bundles/org.eclipse.orion.client.core/web/requirejs/i18n',
       'log': "log",
       'resources': "resources",
       'reps': "reps",
       'domplate': "ui/domplate",
       'MetaObject': '../MetaObject/'
    };
    

require({
    paths: paths,
    waitSeconds: 0 // DEBUG
});

require.onError = function (err) {
        console.error("requirejs ", err);
    };