import User from "../models/userModel.js";

/* Get User */
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(500).json({ message: "User not found!" });
    }
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Update User */
export const updateUser = async (req, res) => {
  try {
    const { mob, ...otherDetails } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      otherDetails,
      {
        new: 1,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Delete User */
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Delted Suuccessfullly");
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Add Contact */
export const addContact = async (req, res) => {
  try {
    if (!req.body.mob) {
      return res.status(500).json("Send Correct Mobile Number");
    }
    const contactExist = await User.findOne({ mob: req.body.mob });
    if (!contactExist) {
      return res.status(400).json("Contact Not Available!");
    }
    const user = await User.findById(req.params.id);

    if(user.contacts.includes(contactExist._id)){
      return res.status(505).json("It is already avaible in your contacts");
    }
    
    if (user.mob === contactExist.mob) {
      return res.status(500).json("Cannot add your own Mob. Number");
    }
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $push: { contacts: contactExist._id },
    },{new:1});
    res.status(200).json({updatedUser,contactExist});
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

/* Remove a Contact  */
export const deleteContact = async (req,res) => {
  try {
    const contact = await User.findOne({ _id: req.query.contactId });
    if (!contact) {
      return res.status(500).json("Contact Not Available!");
    }
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { contacts: contact._id },
    });
    res.status(200).json("Contact Removed!");
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

/* Get All Contacts */
export const getAllContacts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const contacts = await User.find({ _id: { $in: user.contacts } });
      res.status(200).json(contacts);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};