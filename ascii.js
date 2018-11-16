/*
	This file powers ascii.html, displaying animations according to user input.
	Animations are loaded from animations.js and myanimation.js.
*/

"use strict";

(function () {

	var timer;
	var initialAscii;

	/* begins timer and displays current animation, triggered by "Start" Play Control */
	function startAscii() {
		
		/* correctly keep track of button displays */
		document.getElementById("start").disabled = true;
		document.getElementById("stop").disabled = false;

		/* setup animation */
		var textarea = document.getElementById("asciiarea");
		initialAscii = textarea.value; /* reflect any user changes */
		var allFrames = textarea.value.split("=====\n");
		var frameSpeed;
		var count = 0;
		var userSpeed = document.getElementsByName("speed");
		var speeds = userSpeed.length;
		for (var i = 0; i < speeds; i++) {
			if (userSpeed[i].checked) {
				frameSpeed = userSpeed[i].value;
			}
		}
		timer = setInterval(updateAscii, frameSpeed);

		/* used by the timer to update animation on each timestep */
		function updateAscii() {
			for (var i = 0; i < speeds; i++) {
				if (userSpeed[i].checked && frameSpeed != userSpeed[i].value) {
					frameSpeed = userSpeed[i].value;
					clearInterval(timer);
					timer = setInterval(updateAscii, frameSpeed);
				}
			}
			textarea.value = allFrames[count];
			count++;
			if (count > allFrames.length - 1) {
				count = 0;
			}
		}
	}

	/* ceases the current animation, triggered by "Stop" Play Control */
	function stopAscii() {
		document.getElementById("start").disabled = false;
		document.getElementById("stop").disabled = true;
		clearInterval(timer);
		document.getElementById("asciiarea").value = initialAscii;
	}

	/* loads the initial ASCII art into the text area */
	function drawAscii() {
		var animation = document.getElementById("animation");
		var animationChoice = animation.options[animation.selectedIndex].innerHTML;
		document.getElementById("asciiarea").value = ANIMATIONS[animationChoice];
	}

	/* changes font size of the ASCII art in text area, triggered by Size drop-down list */
	function sizeChange() {
		var size = document.getElementById("size");
		var newSize = size.options[size.selectedIndex].value;
		document.getElementById("asciiarea").style.fontSize = newSize + "pt";
	}

	/* setup event listeners when window loads */
	window.onload = function() {
		var start = document.getElementById("start");
		start.onclick = startAscii;

		var stop = document.getElementById("stop");
		stop.onclick = stopAscii;
		stop.disabled = true;

		var animation = document.getElementById("animation");
		animation.onchange = drawAscii;

		var size = document.getElementById("size");
		size.onchange = sizeChange;
	}
})();
