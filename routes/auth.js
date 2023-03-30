const router = require("express").Router();
const { Tutor } = require("../models/registeredTutorsModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/registeredUsersModel");

router.post("/auth", async (req, res) => {
  try {
    console.log("auth", req.body)
    const { error } = validate(req.body);
    if (error) {
      return res.status(401).send(error.details[0].message);
    }
    console.log(req.body)
    const tutor = await User.findOne({ email: req.body.email });
    // const tutor = await Tutor.findOne({ email: req.body.email });

    if (!tutor) {
      return res.status(401).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      tutor.password
    );
    if (!validPassword) {
      return res.status(401).send("Invalid email or password.");
    }
    const token = tutor.generateAuthToken();
    res.status(200).send({data: token,message:"login Successfull"});

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
