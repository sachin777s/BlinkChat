import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

/* Send Mesage */
export const sendMessage = async (req, res) => {
  try {
    const { message, sender, reciever } = req.body;
    if ((!message || !sender, !reciever)) {
      return res.status(500).json("Incomplete Credential");
    }
    if (sender === reciever) {
      return res.status(500).json("Cannot send to self!");
    }
    const senderExist = await User.findById(req.body.sender);
    const recieverExist = await User.findById(req.body.reciever);
    if (!senderExist && !recieverExist) {
      return res.status(500).json("Sender or Reciever is not exist in db");
    }
    const messageSent = await Message(req.body);
    await messageSent.save();
    res.status(201).json("Message Sent Successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Get Message for an User */
export const getMessages = async (req, res) => {
  try {
    const userId = req.params.id;
    const contactId = req.query.contactId;
    const userMessages = await Message.find({
      sender: userId,
      reciever: contactId,
    });
    const contactMessages = await Message.find({
      sender: contactId,
      reciever: userId,
    });
    const messages = [...userMessages, ...contactMessages];
    messages.sort((a, b) => a.createdAt - b.createdAt);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Crear Chats */

export const clearChats =  async (req,res) => {
  try {
    const userId = req.params.id;
    const contactId = req.query.contactId; 
    await Message.deleteMany({sender:userId, reciever:contactId})
    await Message.deleteMany({sender:contactId, reciever:userId})

    res.status(200).json("Chats Cleared Successfully!")
  } catch (err) {
    res.status(500).json(err);
  }
}
