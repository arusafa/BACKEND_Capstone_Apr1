const router = require("express").Router();
const { Tutor, validateTutor } = require("../models/registeredTutorsModel.js");
const bcrypt = require("bcrypt");


// REGISTER TUTOR
router.post("/signup/tutor", async (req, res) => {
  try {
    const { error } = validateTutor(req.body);
    if (error) {
        console.log(error)
      return res.status(401).send(error.details[0].message);
    }
    const tutor = await Tutor.findOne({ email: req.body.email });
    console.log('tutor1', tutor)
    if (tutor) {
      return res.status(401).send("Tutor already registered.");
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const doc = await new Tutor({ ...req.body, password: hashedPassword }).save();
    res.status(201).send({ message: "Tutor registered successfully.", data: doc });
  } 
  catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/tutor/update", async (req, res) => {
  try {
    const tutor = await Tutor.findOneAndUpdate({ _id: req.body.id}, req.body);
    res.status(201).send({ message: "Tutor updated successfully."});
  } catch (error) {
    res.status(500).send(err.message);
  }
});


// GET ALL REGISTERED TUTORS
router.get("/tutor/result", async (req, res) => {
  try {
    const data = await Tutor.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ data });
  }
});

router.delete('/tutor/:id', async (req, res) => {
    try {
     const data = await Tutor.findByIdAndDelete(id, function (err, Tutor) {
         if (err) {
             console.log(err);
             res.status(500).send(err.message);
         }
         else {
             console.log("User deleted successfully");
             res.status(201).send("Tutor deleted");
         }
     })
     res.status(201).json(data)
    } catch (error) {
         res.status(500).send(error.message);
    }
 });

 router.get('/tutor/signout',  (req, res) => {
  try {
    res.status(201).send({ message: "tutor logged out successfully." });  
  } catch (error) {
    res.status(500).send(error.message); 
  }
})


router.delete('/delete', async (req, res) => {
  const data =  req.data;
  console.log('data1', req.body);
  try {
    const data = await Tutor.findOneAndDelete({email: req.body.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(201).send(err.message);
        }
        if (!user){
          res.status(201).send("Tutor Not Found");
        }
        else {
            console.log("Tutor deleted successfully");
            res.status(201).send("Tutor deleted");
        }
    })
   } catch (error) {
        res.status(500).send(error.message);
   }
})

module.exports = router;
