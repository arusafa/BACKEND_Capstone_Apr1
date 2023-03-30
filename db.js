const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
        mongoose.connect("mongodb+srv://fall2022_comp3123:SAFA.aru1993@cluster0.lclqo7i.mongodb.net/CAPSTONE?retryWrites=true&w=majority", connectionParams)
        .then((connection) => {
            console.log("DB CONNECTED")
           // console.log('\n\t***Connected to database*** \n', connection);
        })
        .catch((err) => {
            console.log('Error connecting to the database. \n', err);
        })
 }

 //mongodb+srv://fall2022_comp3123:SAFA.aru1993@cluster0.lclqo7i.mongodb.net/CAPSTONE?retryWrites=true&w=majority


 //mongodb+srv://101345468:votzeC-wowxar-hibme1@final-project.i71p7ty.mongodb.net/?retryWrites=true&w=majority