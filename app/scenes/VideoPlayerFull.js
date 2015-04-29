var playParams = {
	url : 'http://91.90.23.69:1935/live/livestream_1/playlist.m3u8|COMPONENT=HLS',
	fullScreen : true,
	title : 'ТК «Надія»',
	liveStream : true,
};

var pluginAPI = new Common.API.Plugin();

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
	};

	opt.onend = function() {
		// _THIS_.printEvent('END');
	};
	opt.onstatechange = function(state, info) {
		var stat = {};
		stat[sf.service.VideoPlayer.STATE_PLAYING] = 'Playing';
		stat[sf.service.VideoPlayer.STATE_STOPPED] = 'Stoped';
		stat[sf.service.VideoPlayer.STATE_PAUSED] = 'Paused';
		stat[sf.service.VideoPlayer.STATE_BUFFERING] = 'Buffering';
		stat[sf.service.VideoPlayer.STATE_SCANNING] = 'Scanning';
	};

	sf.service.VideoPlayer.init(opt);
	sf.service.VideoPlayer.play(playParams);
	pluginAPI.setOffScreenSaver();
	sf.service.setScreenSaver(false);

	sf.service.VideoPlayer.setKeyHandler(sf.key.RETURN, function() {
		sf.core.exit(false);
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.EXIT, function() {
		sf.core.exit(true);
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.LEFT, function() {
		alert("LEFT");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.RIGHT, function() {
		alert("RIGHT");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.UP, function() {
		alert("LEFT");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.DOWN, function() {
		alert("DOWN");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.ENTER, function() {
		alert("ENTER");
	});
}

SceneVideoPlayerFull.prototype.handleHide = function() {
	alert("SceneVideoPlayerFull.handleHide()");
}

SceneVideoPlayerFull.prototype.handleFocus = function() {
	alert("SceneVideoPlayerFull.handleFocus()");
}

SceneVideoPlayerFull.prototype.handleBlur = function() {
	alert("SceneVideoPlayerFull.handleBlur()");
}

SceneVideoPlayerFull.prototype.handleKeyDown = function(keyCode) {
	alert("SceneVideoPlayerFull.handleKeyDown(" + keyCode + ")");

	sf.service.VideoPlayer.setKeyHandler(sf.key.LEFT, function() {
		alert("LEFT");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.RIGHT, function() {
		alert("RIGHT");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.UP, function() {
		alert("LEFT");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.DOWN, function() {
		alert("DOWN");
	});

	sf.service.VideoPlayer.setKeyHandler(sf.key.ENTER, function() {
		alert("ENTER");
	});

	switch (keyCode) {

	case sf.key.ENTER:
		alert("ENTER");
	case sf.key.LEFT:
		alert("LEFT");
	case sf.key.RIGHT:
		alert("RIGHT");
	case sf.key.UP:
		alert("UP");
	case sf.key.DOWN:
		alert("DOWN");
	case sf.key.STOP:
		sf.service.VideoPlayer.stop();
		break;
	case sf.key.PLAY:
		sf.service.VideoPlayer.play(playParams);
		break;
	}
}

SceneVideoPlayerFull.prototype.printEvent = function(msg) {
	alert("SceneVideoPlayerFull.prototype.printEvent(" + msg + ")");
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
				showConfirmButton : false,
				showCancelButton : false
			});
			sf.service.VideoPlayer.stop();
		}

		offlineMode = true;

	} else {
		console.log('internet connnection up');
		if (offlineMode) {
			swal.close();
			sf.service.VideoPlayer.play(playParams);
		}
		offlineMode = false;
	}
}

setInterval(cyclicInternetConnectionCheck, 1000);

function checkConnection() {
	console.log('checkConnection');
	var gatewayStatus = 0,

	currentInterface = networkPlugin.GetActiveType();

	console.log(currentInterface);
	if (currentInterface === -1) {
		console.log('currentInterface -1');
		return false;
	}

	gatewayStatus = networkPlugin.CheckGateway(currentInterface);
	console.log(gatewayStatus);

	if (gatewayStatus !== 1) {
		console.log('gatewayStatus -1');
		return false;
	}

	console.log('OK');
	return true;
}