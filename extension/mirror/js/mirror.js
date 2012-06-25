var editor = CodeMirror(document.body, {
  value: '',
  mode:  'javascript',
  lineNumbers: true,
  lineWrapping: true,
  onGutterClick: function(cm, line) {
    var info = cm.lineInfo(line);
    if (info.markerText) {
      cm.clearMarker(line);
    } else {
      cm.setMarker(line, "<span style=\"color: #0AF; font-weight: bold;\">%N%</span>");
    }
  }
});
