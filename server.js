const express = require("express");
const dotenv = require('dotenv');
const routes = require("./routes/index");
// const register = require("./routes/user")
// const cors = require("cors");
const app = express()

// parse requests of content-type - application/json
app.use(express.json());

// Static file
app.use(express.static('public'))
// app.use('./css', express.static(__dirname + 'public/css'))
// app.use('./js', express.static(__dirname + 'public/js'))
// app.use('./img', express.static(__dirname + 'public/img'))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// let corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

app.use('/api/students', routes);
// app.use('/api/registration', register);


app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/views/index.ejs')
   res.render('index');
})

app.get('/home', (req, res) => {
   res.render('home');
})

app.get('/registration', (req, res) => {
   res.render('registration');
})

app.get('/login', (req, res) => {
   res.render('login');
})

app.get('/secretPage', (req, res) => {
  res.render('secretPage');
})






// Set views 
app.set('views', './views')
app.set('view engine', 'ejs')

// app.get('', (req, res) => {
//   res.render('index', { text: 'This is EJS test'})
// })

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to NodeJs test application." });
// });

const connectDB = require('./config/db');

// Load Config
dotenv.config({ path: './config/config.env' });

connectDB();

// Routes
// app.use('/', require('./routes/index'));

// Routes with controller
//  app.use('/api/students', routes);

// /api/students: GET, POST, DELETE
// /api/students/:id: GET, PUT, DELETE
// /api/students/findName: GET

app.post('/api/students', (req, res) => {
  return res.redirect('');
})

app.post('/api/students/createUser', (req, res) => {
})

app.post('/api/students/loginUser', (req, res) => {
} )


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});