const router = require("express").Router();
const { User, validateUser } = require("../models/registeredUsersModel.js");
const bcrypt = require("bcrypt");


// REGISTER User
router.post("/signup", async (req, res) => {
  try {
    console.log('signup user ===', req.body)
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(401).send(error.details[0].message);
    }


    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(401).send("User already registered.");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashedPassword }).save();
    res.status(201).send({ message: "User registered successfully." });
  } 
  catch (err) {
    res.status(500).send(err.message);
  }
});



// GET ALL REGISTERED UserS
router.get("/user/result", async (req, res) => {
  try {
    const data = await User.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ data });
  }
});

// update User
router.post("/update-payment", async (req, res) => {
  try {
    const update= req.body
    console.log('update', update)
    const user = await User.findOneAndUpdate({_id: req.body.id}, update);
    console.log('update3', user)
    res.status(201).send({ message: "User updated successfully.", data: user });
  } catch (error) {
    res.status(500).send(err.message);
  }
})

router.post("/update", async (req, res) => {
  try {
    const filter= {email: req.body.email}
    console.log('filter', filter)
    const update = {
      ...req.body,
    }
    const doc = await User.findOneAndUpdate(filter, update);
    console.log('data', doc)

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await doc.update({password: hashedPassword});

    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ data });
  }
})

router.delete('/user/:id', async (req, res) => {
   try {
    const data = await User.findByIdAndDelete(id, function (err, User) {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
        else {
            console.log("User deleted successfully");
            res.status(201).send("User deleted");
        }
    })
    res.status(201).json(data);
   } catch (error) {
        res.status(500).send(error.message);
   }
});


router.get('/signout',  (req, res) => {
  try {
    res.status(201).send({ message: "User logged out successfully." });  
  } catch (error) {
    res.status(500).send(error.message); 
  }
})

router.delete('/delete', async (req, res) => {
  const data =  req.data;
  console.log('data1', req.body);
  try {
    const data = await User.findOneAndDelete({email: req.body.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
        if (!user){
          res.status(201).send("User Not Found");
        }
        else {
            console.log("User deleted successfully");
            res.status(201).send("User deleted");
        }
    })
   } catch (error) {
        res.status(500).send(error.message);
   }
})
module.exports = router;
