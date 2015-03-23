function onStart() {
	alert('onStart()');

	sf.scene.show('VideoPlayerFull');
	sf.scene.focus('VideoPlayerFull');
}

function onDestroy () {
	alert('onDestroy()');
}
alert("init.js loaded.");
