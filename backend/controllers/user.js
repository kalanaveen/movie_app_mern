const User = require("../models/user");

exports.create = async(req, res) => {
    const { name, email, password } = req.body;
    const oldUser = await User.findOne({ email });
   
    if (oldUser) return res.status(401).json({ error: "This email is already taken" });
    
    const newUser = new User({ name, email, password });
    await newUser.save();

    // var transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "ad33388dbccbec",
    //       pass: "c9d93d38d61d34"
    //     }
    // });
    
    res.json({ user: newUser });
};