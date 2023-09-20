const express = require('express');
const app = express();

const path = require("path");
const hbs = require("hbs");
// const cors = require("cors");
const bcrypt = require("bcrypt");
require('../src/db/conn')
const employee = require('../src/models/employee')
const staticpath = path.join(__dirname, "./public");
const templatePath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");
app.use(express.static(staticpath)); 
// app.use(cors());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("registration");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) { 
            const employee1 = new employee({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: password,
                cpassword: cpassword,
                gender: req.body.gender
            })
 //middleware
            console.log("this success part"+employee1);
            const token = await employee1.generateAuthToken();
        
            console.log("this token part is"+token);
  

            res.cookie("jwt",token,{
                expires:new Date(Date.now()  + 50000),
                httpOnly:true
            })
            // console.log(cookie);

            const result = await employee1.save();
            res.status(201).send(result);
        }
       

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        password =req.body.password;
        email = req.body.email;
        const result = await employee.findOne({ email: email });

        const isMatch = await bcrypt.compare(password,result.password);
        const token = await result.generateAuthToken();
        console.log("this token part is"+token);
        
        
         if (isMatch) {
            res.status(200).render("index");
        } else {
            res.send("invalid details");
        }

    }
    catch (err) {
        console.log(err);
        // res.status(501).send("error");
    }
})

app.listen(2000,()=>{
    console.log("listening is port")
})

// encryption
// hashing

// password 1212 => 234909dfk
// 234909dfk => 1212
// two way communication

// hashing
// bycrypt hack 200day 4 12 400
// const bcrypt = require("bcrypt")

// const shubham = async (password) => {

//     const hashedpassword = await bcrypt.hash(password, 10);
//     console.log(hashedpassword);
    


//     const wapis = await bcrypt.compare(pashfsword, hashedpassword);
//     console.log(wapis)
// }


// shubham("jeevan");

// const jwt = require("jsonwebtoken");
// const webtoken = async () =>{
//     const token = await jwt.sign({id:"64kjhgdsas9876547643jfl"},
//     "abcdefghijklmonpqrstuvwxyzkjhjhghfyujii",{
//       expiresIn:"2 seconds"});

//       console.log(token);

//       const compare = await jwt.verify(token,"abcdefghijklmonpqrstuvwxyzkjhjhghfyujii");

//       console.log(compare);

    // }

   
//     const result = await employee.save();
//     res.status(200).send(result);
// }
//     res.send("invalid input");
// } 
//   Catch (error){
//     res.status(502).send(error);

// }




    // webtoken();

   












