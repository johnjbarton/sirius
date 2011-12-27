/*globals console document window */

function changeMe() {
  return 35;
}

function runTest() {
  var value = changeMe();
  console.log("The current value is "+value);
}

function onLoad() {
  var elt = document.getElementById('changeTest');
  elt.addEventListener('click', runTest, true);
}

window.addEventListener('load', onLoad, false);