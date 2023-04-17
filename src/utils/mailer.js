import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

import dotenv from "dotenv";
dotenv.config()

//SMTP - Simple Mail Transfer Protocol is an internet standard communication protocol for mail transmission

let transporter = nodemailer.createTransport(smtpTransport({
	service: process.env["EMAIL_SMTP_SERVICE"],
	host: process.env["EMAIL_SMTP_HOST"],
	auth: {
		user: process.env["EMAIL_SMTP_USERNAME"],
		pass: process.env["EMAIL_SMTP_PASS"]
	}
}))

export default function(from,to,subject,html) {
	return transporter.sendMail({
		from,
		to,
		subject,
		html
	})
}
