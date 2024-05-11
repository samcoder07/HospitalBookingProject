import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 587,
    auth: {
        user: "samarthsaluja007@gmail.com",
        pass: "qpubkgcpmpybgbjo",
    },
});


export const sendMailer = async (req, res) => {
    // res.send("I am sending a mail");
    console.log(req.body);

    const senderName = req.body.name;

    const info = await transporter.sendMail({
        from: '<samarthsaluja007@gmail.com>',
        to: req.body.email,
        subject: "Explore Our Hospital Portal!",
        text: "I hope this email finds you well. I wanted to extend an invitation for you to visit our hospital portal. It's a comprehensive platform designed to provide easy access to our services, resources, and more.You can explore a range of features, from scheduling appointments to accessing medical records, all in one convenient place.Feel free to click the link below to start exploring:Looking forward to having you onboard!Best regar[Your Name]",
        html: `Dear:- ${senderName}, <p>I hope this email finds you well. I wanted to extend an invitation for you to visit our hospital portal. It's a comprehensive platform designed to provide easy access to our services, resources, and more.</p><br>You can explore a range of features, from scheduling appointments to accessing medical records, all in one convenient place.Feel free to click the link below to start exploring</br><br>Looking forward to having you onboard!</br><br>Best Regards</br><br>Samarth Saluja</br>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.json(info);
};
