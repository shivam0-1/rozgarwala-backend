import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

/* PUBLIC: Submit contact */
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ADMIN: Get all contacts */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ADMIN: Reply to contact */
export const replyToContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    if (!replyMessage) {
      return res.status(400).json({ message: "Reply message required" });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"RozgarWala Support" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: "Reply from RozgarWala Support",
      text: replyMessage,
    });

    contact.status = "Replied";
    await contact.save();

    res.json({ message: "Reply sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Reply failed" });
  }
};

/* ADMIN: Delete contact */
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.deleteOne();

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
