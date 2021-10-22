const students = require("../controllers/student.controller");
const users = require("../controllers/user.controller");
const router = require("express").Router();

// const { verifyUserToken, IsAdmin, IsUser } = require("../middleware/auth");
// const userController = require('../controllers/user');

// Register a new User
// router.post('/register', userController.register);

// Login
// router.post('/login', userController.login);

// Auth user only
// router.get('/events', verifyUserToken, IsUser, users.userEvent);

// Auth Admin only
// router.get('/special', verifyUserToken, IsAdmin, users.adminEvent);

// module.exports = router;

  // Create a new Student
  router.post("/", students.create);

  // Retrieve all Students
  router.get("/", students.findAll);

  // Retrieve a Name
  router.get("/findName", students.findAName);

  // Retrieve a single Student with id
  router.get("/:id", students.findOne);

  // Update a Student with id
  router.put("/:id", students.update);

  // Delete a Student with id
  router.delete("/:id", students.delete);

  // Delete all Student
  router.delete("/", students.deleteAll);

   router.post("/createUser", users.createUser);
  
   router.post("/loginUser", users.loginUser);

//   // router.get("/getUsers", users.getUsers);
  
module.exports = router
