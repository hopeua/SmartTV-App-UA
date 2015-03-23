function SceneVideoPlayerFull(options) {

}

SceneVideoPlayerFull.prototype.initialize = function() {
	alert("SceneVideoPlayerFull.initialize()");
}

SceneVideoPlayerFull.prototype.handleShow = function() {
	alert("SceneVideoPlayerFull.handleShow()");

	var opt = {};
	var _THIS_ = this;
	opt.onerror = function(error, info) {
		var err = {};
		err[sf.service.VideoPlayer.ERR_NOERROR] = 'NoError';
		err[sf.service.VideoPlayer.ERR_NETWORK] = 'Network';
		err[sf.service.VideoPlayer.ERR_NOT_SUPPORTED] = 'Not Supported';
		_THIS_.printEvent('ERROR : ' + (err[error] || error)
				+ (info ? ' (' + info + ')' : ''));
	};

	opt.onend = function() {
		_THIS_.printEvent('END');
	};
	opt.onstatechange = function(state, info) {
		var stat = {};
		stat[sf.service.VideoPlayer.STATE_PLAYING] = 'Playing';
		stat[sf.service.VideoPlayer.STATE_STOPPED] = 'Stoped';
		stat[sf.service.VideoPlayer.STATE_PAUSED] = 'Paused';
		stat[sf.service.VideoPlayer.STATE_BUFFERING] = 'Buffering';
		stat[sf.service.VideoPlayer.STATE_SCANNING] = 'Scanning';

		_THIS_.printEvent('StateChange : ' + (stat[state] || state)
				+ (info ? ' (' + info + ')' : ''));
	};

	sf.service.VideoPlayer.init(opt);
	sf.service.VideoPlayer
			.play({
				url : 'http://91.90.23.69:1935/live/livestream_1/playlist.m3u8|COMPONENT=HLS',
				fullScreen : true,
				title : 'ТК Надія',
				liveStream : true,
			});
	sf.service.setScreenSaver(true, 100);

	sf.service.VideoPlayer.setKeyHandler(sf.key.RETURN, function() {
		// sf.service.VideoPlayer.stop();
		sf.service.setScreenSaver(false);
		sf.core.exit(false);
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.EXIT, function() {
		// sf.service.VideoPlayer.stop();
		sf.service.setScreenSaver(false);
		sf.core.exit(false);
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.STOP, function() {
		// sf.service.VideoPlayer.stop();
		sf.service.setScreenSaver(false);
		sf.core.exit(false);
	});

}

SceneVideoPlayerFull.prototype.handleHide = function() {
	alert("SceneVideoPlayerFull.handleHide()");
}

SceneVideoPlayerFull.prototype.handleFocus = function() {
	alert("SceneVideoPlayerFull.handleFocus()");
	$("#keyhelp").sfKeyHelp({
		UPDOWN : 'Move Item',
		ENTER : 'Play',
		RETURN : 'Return'
	});
	$("#lstVideoPlayer").sfList('focus');
}

SceneVideoPlayerFull.prototype.handleBlur = function() {
	alert("SceneVideoPlayerFull.handleBlur()");
	$("#lstVideoPlayer").sfList('blur');
}

SceneVideoPlayerFull.prototype.handleKeyDown = function(keyCode) {
	alert("SceneVideoPlayerFull.handleKeyDown(" + keyCode + ")");
}

SceneVideoPlayerFull.prototype.printEvent = function(msg) {
	alert("SceneVideoPlayerFull.prototype.printEvent(" + msg + ")");
	document.getElementById("VideoPlayerEvent").innerHTML = msg + '<br>'
			+ document.getElementById("VideoPlayerEvent").innerHTML;
}

var networkPlugin = document.getElementById('pluginObjectNetwork');
var offlineMode = false;

function cyclicInternetConnectionCheck() {

	if (!checkConnection()) {
		if (!offlineMode) {
			swal({
				title : "Проблема с подключением",
				text : "Проверьте своё интернет-соединение",
				type : "error",
				timer: 5000,
				showConfirmButton : false,
				showCancelButton : false
			});

			setTimeout(function() { sf.service.VideoPlayer.stop() }, 20000);
		}

		offlineMode = true;

	} else {
		console.log('internet connnection up');
		if (offlineMode){
			sf.service.VideoPlayer.play();
		}

		offlineMode = false;
	}

}

setInterval(cyclicInternetConnectionCheck, 1000);

function checkConnection() {
	console.log('checkConnection');
	var gatewayStatus = 0,

	// Get active connection type - wired or wireless.

	currentInterface = networkPlugin.GetActiveType();

	// If no active connection.
	console.log(currentInterface);
	if (currentInterface === -1) {
		console.log('currentInterface -1');
		return false;

	}

	// Check Gateway connection of current interface.

	gatewayStatus = networkPlugin.CheckGateway(currentInterface);
	console.log(gatewayStatus);
	// If not connected or error.

	if (gatewayStatus !== 1) {
		console.log('gatewayStatus -1');
		return false;

	}

	// Everything went OK.
	console.log('OK');
	return true;

}