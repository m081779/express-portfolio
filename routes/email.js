var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

let message = {};

router.post('/', function(req, res) {
	if (req.body) {
		mail(req.body);
	}
	else {
		let error = new Error('Something went wrong with your message');
		res.json(error);
	}
	res.status(200).end();
});

function mail(message) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.live.com',
		port: 587,
		secure: false,
		auth: {
			user: 'marcoprincipio@hotmail.com',
			pass: '!map4921'
		}
	});

	let mailOptions = {
		from: `"${message.name}" <marcoprincipio@hotmail.com>`,
		to: 'marcoprincipio@hotmail.com',
		subject: 'New contact from your portfolio site!',
		text: `From: ${message.name} email: ${message.email} Phone Number: ${message.number} message: ${message.text}`,
		html: `<b>From: ${message.name}<br> <b>email: ${message.email}<br> <b>Phone Number: ${message.number}<br> <b>message: ${message.text}`
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);

	});
}

module.exports = router;
