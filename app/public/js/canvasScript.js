var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var mouseX;
var mouseY;
var mouseDistance = 200;
var starDistance = 70;
var particleIterator = 1
var particleCount = 130;
var velocityDivisor = 3;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

function Particle(x,y,dx,dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;

	this.update = function () {

		this.x+= this.dx;
		this.y+= this.dy;

		if (this.x>canvas.width || this.x <0) {
			this.dx = -this.dx;
		}

		if (this.y>canvas.height || this.y <0) {
			this.dy = -this.dy;
		}

		this.draw()

		if (mouse.x - this.x  < mouseDistance 
			&& mouse.x - this.x  > -mouseDistance 
			&& mouse.y - this.y < mouseDistance 
			&& mouse.y - this.y > -mouseDistance) {
				c.beginPath();
				c.moveTo(mouse.x, mouse.y);
				c.lineTo(this.x, this.y);
				c.lineWidth = 0.5;
				c.strokeStyle = 'lightcyan';
				c.stroke();	
		}

		for (var i = 0; i< particleArr.length; i+=particleIterator){
			if (particleArr[i].x - this.x  < starDistance 
				&& particleArr[i].x - this.x  > -starDistance 
				&& particleArr[i].y - this.y < starDistance 
				&& particleArr[i].y - this.y > -starDistance) {
					c.beginPath();
					c.moveTo(particleArr[i].x, particleArr[i].y);
					c.lineTo(this.x, this.y);
					c.lineWidth = 0.5;
					c.strokeStyle = 'lightcyan';
					c.stroke();	
			}

			if (particleArr[i].x - this.x  < 30 
				&& particleArr[i].x - this.x  > -30 
				&& particleArr[i].y - this.y < 30 
				&& particleArr[i].y - this.y > -30) {
				

					this.x+=1
				this.x-=1
			}
		}
	} //end of update function 

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, 3, 0, 2 * Math.PI);
		c.stroke();
	}
} //end of Particle constructor

var particleArr = [];

for (var i = 0; i<particleCount; i++) {
	var radius = Math.random() * 10 + 1;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var speed = 0.5;
	var dx = (Math.random() - 0.5)/velocityDivisor;
	var dy = (Math.random() - 0.5)/velocityDivisor;

	particleArr.push(new Particle(x,y,dx,dy));


}


window.resize = function () {

	console.log('resize firing');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
// document.addEventListener('resize', function () {
// 	console.log('resize firing');
// 		canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// });

function animate() {
	c.clearRect(0,0, window.innerWidth, window.innerHeight);
	requestAnimationFrame(animate);

	for (var i = 0; i<particleArr.length; i++) {
		particleArr[i].update();
	}

}

animate();