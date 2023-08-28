const axios = require('axios');
const mailer = require('nodemailer');

const URL_TO_MONITOR = "https://www.quebec.ca/immigration/travailler-quebec/travailleurs-qualifies/programme-regulier-travailleurs-qualifies/invitation";
const EMAIL_ADDRESS = "jbr.jihad@gmail.com";
const EMAIL_SUBJECT = "Monitored page updated";

function configureMail() {
    return mailer.createTransport({
        host: "smtp.gmail.com",
        port: "465",
        scure: true,
        auth: {
            user: EMAIL_ADDRESS,
            pass: "riuhogmtnqbsrgvc"
        },
        tls: {
            rejectUnauthorized: false
        }
    })
}

function sendMail(to, subject, text) {
    const transport = configureMail();

    const email = {
        from: EMAIL_ADDRESS,
        to,
        subject,
        text
    };

    transport.sendMail(email, (error, info) => {
        if(error) {
            console.log("Failed to send email");
        } else {
            console.log("Email sent successfully");
            transport.close();
        }
    })
}

function monitorPage(url) {
    axios.get(url).then((response) => {
        if(response.data.includes("16 août 2023")) {
            console.log("No update yet");
        } else {
            console.log("Page updated.");
            sendMail(EMAIL_ADDRESS, EMAIL_SUBJECT, "Page updated, visit: " + URL_TO_MONITOR);
        }
    }).catch((error) => {
        console.log(error);
    })
}

console.log("Starting page monitoring");
monitorPage(URL_TO_MONITOR);
setInterval(() => monitorPage(URL_TO_MONITOR), 2000*60*60);