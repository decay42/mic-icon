window.onload = function() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	audioContext = new AudioContext();

	var _level = document.getElementById('level'),
		_levelValue = document.getElementById('level-value'),
		session_level = localStorage.getItem('level');

	if (session_level) {
		level.value = +session_level;
		_levelValue.innerHTML = session_level;
	}
	level.addEventListener('change', function(e) {
		_levelValue.innerHTML = e.target.value;
		localStorage.setItem('level', e.target.value);
		refresh();
	});

	var _timeout = document.getElementById('timeout'),
		_timeoutValue = document.getElementById('timeout-value'),
		session_timeout = localStorage.getItem('timeout');
	if (session_timeout) {
		timeout.value = +session_timeout;
		_timeoutValue.innerHTML = session_timeout;
	}
	_timeout.addEventListener('change', function(e) {
		_timeoutValue.innerHTML = e.target.value + 'ms';
		localStorage.setItem('timeout', e.target.value);
		refresh();
	});

	var _bgcolor = document.getElementById('bg-color'),
		session_bgcolor = localStorage.getItem('bgcolor'),
		_mic = document.getElementById('mic-activity');
	if (session_bgcolor) {
		_bgcolor.value = session_bgcolor;
		_bgcolor.style.backgroundColor = '#' + session_bgcolor;
		_mic.style.backgroundColor = '#' + session_bgcolor;
		_mic.style.color = '#' + session_bgcolor;
	}
	_bgcolor.addEventListener('change', function(e) {
		_mic.style.backgroundColor = '#' + e.target.value;
		_mic.style.color = '#' + e.target.value;
		localStorage.setItem('bgcolor', e.target.value);
	});

	var _activecolor = document.getElementById('active-color'),
		session_activecolor = localStorage.getItem('activecolor');
	if (session_activecolor) {
		_activecolor.value = session_activecolor;
		_activecolor.style.backgroundColor = '#' + session_activecolor;
		var tmp = document.styleSheets[2].cssRules;

		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i].selectorText === '.mic-on') {
				tmp[i].style.color = '#' + session_activecolor;
			}
		}
	}
	_activecolor.addEventListener('change', function(e) {
		var tmp = document.styleSheets[2].cssRules;

		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i].selectorText === '.mic-on') {
				tmp[i].style.color = '#' + e.target.value;
				localStorage.setItem('activecolor', e.target.value);
			}
		}
	});

	var _fontsize = document.getElementById('fontsize'),
		_fontsizeValue = document.getElementById('fontsize-value'),
		session_fontsize = localStorage.getItem('fontsize');
	if (session_fontsize) {
		_mic.style.fontSize = session_fontsize + 'pt';
		_fontsize.value = session_fontsize;
		_fontsizeValue.innerHTML = session_fontsize + 'pt';
	}
	_fontsize.addEventListener('change', function(e) {
		_mic.style.fontSize = e.target.value + 'pt';
		_fontsizeValue.innerHTML = e.target.value + 'pt';
		localStorage.setItem('fontsize', e.target.value);
	});

	document.getElementById('reset').addEventListener('click', function (e) {
		localStorage.clear();
	});

	start();
}

function refresh() {
	stop();
	setTimeout(function() {
		start();
	}, 100);
}

function start() {
	try {
	    navigator.getUserMedia = 
	    	navigator.getUserMedia ||
	    	navigator.webkitGetUserMedia ||
	    	navigator.mozGetUserMedia;

	    navigator.getUserMedia(
	    {
	        "audio": {
	            "mandatory": {
	                "googEchoCancellation": "false",
	                "googAutoGainControl": "false",
	                "googNoiseSuppression": "false",
	                "googHighpassFilter": "false"
	            },
	            "optional": []
	        },
	    }, gotStream, didntGetStream);
	} catch (e) {
	    alert('getUserMedia threw exception:' + e);
	}
}

function stop() {
	window.cancelAnimationFrame(rafID);
}

function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    clipLvl = +document.getElementById('level').value;
    timeoutVal = +document.getElementById('timeout').value;
    meter = createAudioMeter(audioContext, clipLvl, 0.95, timeoutVal);
    mediaStreamSource.connect(meter);

    activityLoop();
}

function activityLoop(time) {

    if (meter.checkClipping())
        document.getElementById('mic-activity').firstElementChild.className = 'mic-on';
    else
    	document.getElementById('mic-activity').firstElementChild.className = '';

    rafID = window.requestAnimationFrame(activityLoop);
}