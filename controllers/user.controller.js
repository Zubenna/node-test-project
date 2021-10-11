const { User } = require('../models/user');
const bcrypt = require('bcrypt');

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
      res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='/login'>login</a></div><br><br><div align='center'><a href='/registration'>Register another user</a></div>");
      // res.send(data);
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
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        // res.status(200).json({ message: "Valid password" });
        res.send("<div align ='center'><h2>Login successful</h2></div><br><br><div align='center'><a href='/secretPage'>Go to Secret Page</a></div><br>");
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  };

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

