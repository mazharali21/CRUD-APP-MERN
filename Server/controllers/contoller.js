const User = require("../model/user");

exports.getusers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getuserByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const singleUser = await User.findOne({ userID: id });

    if (!singleUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    res.status(200).json({ success: true, singleUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await User.findOneAndDelete({ userID: id });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, deletedUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const UpdatedUser = await User.findOneAndUpdate({ userID: id }, req.body, {
      new: true,
    });

    if (!UpdatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, UpdatedUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
