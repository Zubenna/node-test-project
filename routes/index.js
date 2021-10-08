// const express = require('express');
// const router = express.Router();

// const { Student } = require('../models/student')

// // Get all students
// router.get('/api/student', (req, res) => {
//     Student.find({}, (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             console.log(err);
//         }
//     });
// });

// // Save Student
// router.post('/api/student/add', (req, res) => {
//     const stu = new Student({
//         name: req.body.name,
//         ssn: req.body.ssn,
//         email: req.body.email,
//         mobile: req.body.mobile,
//         status: req.body.status
//     });
//     stu.save((err, data) => {
//         res.status(200).json({
//             code: 200, message: 'Student added successfully',
//             addStudent: data
//         })
//     });
// });

// // Get single student
// router.get('/api/student/:id', (req, res) => {
//     Student.findById(req.params.id, (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             console.log(err);
//         }
//     });
// });

// // Update a student
// router.put('/api/student/edit/:id', (req, res) => {
//     const stu = new Student({
//         name: req.body.name,
//         ssn: req.body.ssn,
//         email: req.body.email,
//         mobile: req.body.mobile,
//         status: req.body.status
//     });
//     Student.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot update Student with id=${id}`
//                 });
//             } else {
//                 res.send({ message: "Student was updated successfully." });
//             }      
//         })
//         .catch(err => {
//         res.status(500).send({
//         message: "Error updating Student with id=" + req.params.id
//       });
//     });
// });

// // Delete a student
// router.delete('/api/student/deleteone/:id', (req, res) => {
//     Student.findByIdAndRemove(req.params.id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot delete Student with id=${req.params.id}. Maybe Student was not found!`
//                 });
//             } else {
//                 res.send({
//                     message: "Student was deleted successfully!"
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Student with id=" + req.params.id
//             });
//         });
// });

// // Delete all student 
// router.delete('/api/student/deleteall', (req, res) => {
//     Student.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Students were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all students."
//       });
//     });
// });

// module.exports = router;


// Find Student with condition
// router.get('/api/student/findone', (req, res) => {
//     Student.find({name: "frank obi"}, (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             console.log(err);
//         }
//     });
//     // Student.find({ name: "frank obi" })
//     // .then(data => {
//     //   res.send(data);
//     // })
//     // .catch(err => {
//     //   res.status(500).send({
//     //     message:
//     //       err.message || "Some error occurred while retrieving student"
//     //   });
//     // });
// });

 // if (!err) {
        //     res.status(200).json({
        //         code: 200, message: 'Student updated successfully',
        //         updateStudent: data
        //     })
        // } else {
        //     console.log(err);
        // }
    // });



// Using Controller 

// /api/students: GET, POST, DELETE
// /api/students/:id: GET, PUT, DELETE
// /api/students/findName: GET
  // module.exports = app => {
  const students = require("../controllers/student.controller");

  const router = require("express").Router();

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

  // app.use('/api/students', router);
// };

module.exports = router
