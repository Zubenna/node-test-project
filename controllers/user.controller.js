const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

// Create and Save a new User
exports.createUser = async (req, res) => {
    // Create a user
  const body = req.body
  if (!(body.email && body.password)) {
    return res.status(400).send({error: "Data not formatted properly"})
  }
  
  const user = new User({
    username: body.username,
    email: body.email,
    password: body.password
  });

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  
  user.save()
    .then(data => {
      // res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='/login'>login</a></div><br><br><div align='center'><a href='/registration'>Register another user</a></div>");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.loginUser = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  console.log("The user", user)
  if (!user) {
    return res.status(404).send({
         message: 'User not found'
       })
     }
  if (!await bcrypt.compare(body.password, user.password)) {
      return res.status(400).send({
         message: 'Invalid Credentials'
       })
    }
      // check user password with hashed password stored in the database
      // const validPassword = await bcrypt.compare(body.password, user.password);
      // if (validPassword) {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        // res.cookies('jwt', token, {
        //   options: {
        //     httpOnly: true,
        //     maxAges: 24 * 60 * 60 * 1000 // Iday
        //   }
        // })
        res.setHeader('Set-Cookie','visited=true; Max-Age=3000; HttpOnly, Secure');
        res.send({
          body: {
            message: 'success'
          }
        })
        // res.send(token)
        // res.status(200).json({ message: "Valid password" });
        // res.send("<div align ='center'><h2>Login successful</h2></div><br><br><div align='center'><a href='/secretPage'>Go to Secret Page</a></div><br>");
        // res.redirect('/secretPage')
        // res.render('secretPage')
  };

exports.authUser = async (req, res) => {
  const cookie = req.cookies['jwt']

  const claims = jwt.verify(cookie, process.env.TOKEN_SECRE)
  if (!claims) {
    return res.status(401).send({
      message: 'Unauthenticated'
    })
  }

  const user = await User.findOne({_id:})
  res.send(cookie)
}

// exports.getUsers = (req, res) => {
//   User.find({})
//       .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving students."
//       });
//     });
// };

// const mongoose = require('mongoose');
// const config = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user.js");

// // Connect to DB
// const db = config.DB_HOST;
// mongoose.connect(db, function (err) {
//     if (err) {
//         console.error('Error! ' + err)
//     } else {
//         console.log('Connected to mongodb')
//     }
// });

// exports.register = async (req, res) => {

//     //Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hasPassword = await bcrypt.hash(req.body.password, salt);

//     // Create an user object
//     let user = new User({
//         email: req.body.email,
//         name: req.body.name,
//         password: hasPassword,
//         user_type_id: req.body.user_type_id
//     })

//     // Save User in the database
//     user.save((err, registeredUser) => {
//         if (err) {
//             console.log(err)
//         } else {
//             // create payload then Generate an access token
//             let payload = { id: registeredUser._id, user_type_id: req.body.user_type_id || 0 };
//             const token = jwt.sign(payload, config.TOKEN_SECRET);

//             res.status(200).send({ token })
//         }
//     })
// }

// exports.login = async (req, res) => {

//     User.findOne({ email: req.body.email }, async (err, user) => {
//         if (err) {
//             console.log(err)
//         } else {
//             if (user) {
//                 const validPass = await bcrypt.compare(req.body.password, user.password);
//                 if (!validPass) return res.status(401).send("Mobile/Email or Password is wrong");

//                 // Create and assign token
//                 let payload = { id: user._id, user_type_id: user.user_type_id };
//                 const token = jwt.sign(payload, config.TOKEN_SECRET);

//                 res.status(200).header("auth-token", token).send({ "token": token });
//             }
//             else {
//                 res.status(401).send('Invalid mobile')
//             }

//         }
//     })
// }

// // Access auth users only
// exports.userEvent = (req, res) => {
//     let events = [
//         {
//             "_id": "1",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "2",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "3",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         }
//     ]
//     res.json(events)
// };

// exports.adminEvent = (req, res) => {
//     let specialEvents = [
//         {
//             "_id": "1",
//             "name": "Auto Expo Special",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "2",
//             "name": "Auto Expo Special",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "3",
//             "name": "Auto Expo Special",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "4",
//             "name": "Auto Expo Special",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "5",
//             "name": "Auto Expo Special",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "6",
//             "name": "Auto Expo Special",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         }
//     ]
//     res.json(specialEvents)

// }