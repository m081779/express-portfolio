$(document).ready(function () {

// ================================================================
// ======== Form submission code ==================================
// ================================================================

	function checkInput() {
		let counter = 0;
		let args = Array.prototype.slice.call(arguments);
		args.forEach(item => {
			let placeholder = $(item).attr('placeholder');
			if ($(item).val().trim()==='') {
				$(item).attr('placeholder', 'Pretty please enter!');
				setTimeout(()=>{$(item).attr('placeholder', placeholder);}, 1000*2);
			} else {
				counter++;
				$(item).attr('placeholder', placeholder);
			}
		});
		let bool =  counter===4 ? true : false;
		return bool;
	}

	function clearInputs() {
		let args = Array.prototype.slice.call(arguments);
		args.forEach(item => $(item).val(''));
	}

	$('#submit').on('click', function () {
		event.preventDefault();
		let message = {};
		let valid = checkInput('#name','#email', '#number', '#text');
		if(valid) {
			message.name = $('#name').val().trim();
			message.email = $('#email').val().trim();
			message.number = $('#number').val().trim();
			message.text = $('#text').val().trim();
			clearInputs('#name','#email', '#number', '#text');
			$.ajax("/email", {
				type: 'POST',
				data: message,
				success: function (data){
					let firstName = message.name.split(' ');
					firstName = firstName[0].charAt(0).toUpperCase() + firstName[0].slice(1);
					let str = `Your message was sent successfully, ${firstName}. Thanks for contacting me, I will be in touch shortly!`;
					$('#infoText').text(str);
					$('#cookie').addClass('animateCookie');
				},
				error: function (error){
					let firstName = message.name.split(' ');
					firstName = firstName[0].charAt(0).toUpperCase() + firstName[0].slice(1);
					let str = `Your message was not sent successfully, ${firstName}. Please try again soon!`;
					$('#infoText').text(str);
				}
			});
		}
	});

// ================================================================
// ======== Contra easter egg code ================================
// ================================================================

	var letterArr = [];

	document.onkeyup = function (event) {
		var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
		letterArr.push(event.keyCode);
		if (letterArr.length>11) {
			letterArr.shift();
		}
		if (konami.join('')===letterArr.join('')) {
			document.getElementById('main').setAttribute('src', '../images/contra.jpg');
			var snd  = new Audio();
			var src  = document.createElement("source");
			src.type = "audio/mpeg";
			src.src  = "../audio/Contra.mp3";
			snd.appendChild(src);
			snd.play();
			$('.contraModal').addClass('contraModalShow');
		}
	};

	$('#close').on('click', function () {
		$('.contraModal').removeClass('contraModalShow');
	});


// ================================================================
// ======== Cube rotation code ====================================
// ================================================================

	$('body').on('click','.cubeRotate', function () {

		var value = $(this).text();
		if (value==='PORTFOLIO'){
			$('#cube').css({
				'transform': 'rotateY(-90deg) scale(0.9)'
			});
		}
		else if (value==='CONTACT') {
			$('#cube').css({
				'transform': 'rotateY(90deg) scale(0.9)'
			});
		}

		else if (value==='ABOUT') {
			$('#cube').css({
				'transform': 'rotateY(0deg) scale(0.9)'
			});
		}

		else if (value==='GAME') {
			$('#cube').css({
				'transform': 'rotateY(180deg) scale(0.9)'
			});
		}

		else if (value==='TOP') {
			$('#cube').css({
				'transform': 'rotateX(90deg)  scale(0.9)'
			});
		}

		else if (value==='BOTTOM') {
			$('#cube').css({
				'transform': 'rotateX(-90deg) scale(0.9)'
			});
		}

	});

});
