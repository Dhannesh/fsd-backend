import nodemailer from "nodemailer";

// app password: nehs qtlb nonx lhf

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "dhanesh.abes@gmail.com",
    pass: "sknivhldpzsgcsem",
  },
});

export const sendEmail = async (email, otp) => {
  const info = {
    from: "ABES Canteen",
    to: email,
    subject: "OTP verification for ABES Canteen Registration", // Subject line
    html: `
            <div>
                <p>This is the security email from ABES Canteen App. Please DO NOT share the otp with anyone</p>
                <h4>OTP: ${otp}</h4>
                <p>Copyright@ABES-Canteen-App</p>
            </div>
        `,
  };

  try {
    const resp = await transporter.sendMail(info);
    console.log(Object.keys(resp));
    return true;
  } catch (error) {
    console.log("Error", error.message);
    return false;
  }

  console.log("Message sent: %s", resp.messageId);
};
