riot.compile(function(){
  var parent = document.getElementsByClassName("w-full f ft flex-between pl10 mb20 fs10 mt30")[0];
  console.log(parent);
  input = document.createElement('input');
  parent.appendChild(input);
  input.setAttribute('id', 'slider');
  input.setAttribute('type', 'range');
  input.setAttribute('min', '0');
  input.setAttribute('max', '255');
  input.setAttribute('value', '255');

  input.addEventListener('input', function(e) {
    app.player.audio.volume = Math.pow(e.target.value/255, 2.0);
  });
});
