$(document).ready(function () {		
	$("a").click(function (event) {

		if (this.hash!=="") {
			event.preventDefault();
			var hash = this.hash;
			
			$('html').animate({
				scrollTop: $(hash).offset().top

			},500, function () {
				window.location.hash = hash;
			});
		}

	});

});

var letterArr = [];

document.onkeyup = function (event) {
	var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
	letterArr.push(event.keyCode);
	if (letterArr.length>11) {
		letterArr.shift();
	}
	if (konami.join('')===letterArr.join('')) {
		document.getElementById('main').setAttribute('src', '../images/contra.jpg')
		var snd  = new Audio();
		var src  = document.createElement("source");
		src.type = "audio/mpeg";
		src.src  = "../audio/Contra.mp3";
		snd.appendChild(src);
		snd.play();
		alert('Congratulations! 30 extra lives!');
	}
}

$('body').on('click','.cubeRotate', function () {

	var value = $(this).text();
	if (value==='PORTFOLIO'){
		$('#cube').css({
			'transform': 'rotateY(-90deg) scale(0.9)',
			// 'padding-top': '2.5%'
		});
	}
	else if (value==='CONTACT') {
		$('#cube').css({
			'transform': 'rotateY(90deg) scale(0.9)',
			// 'padding-top': '2.5%'
		});
	}

	else if (value==='ABOUT') {
		$('#cube').css({
			'transform': 'rotateY(0deg) scale(0.9)',
			// 'padding-top': '2.5%'
		});
	}
});

