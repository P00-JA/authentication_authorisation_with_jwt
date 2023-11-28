const express = require('express');
const sequelize = require('./config/database');
const UserData = require('./models/UserData');
const Team = require('./models/Team');
const Project = require('./models/Project');
const validateUser = require('./validators/registerValidator');
const HomeController = require('./controllers/HomeController');
const validateUserLogin = require('./validators/loginValidator');
const updateUserValidator = require('./validators/updateUserValidator');
const JWTController = require('./controllers/JWTController');

const app = express();

// Define associations between models
Team.hasMany(Project, {
  foreignKey: {
    allowNull: true
  }
});
Team.hasMany(UserData, {
  foreignKey: {
    name: 'team_id',
    allowNull: true
  }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: "done",
    message: "This API is working!!"
  });
});

// Sync program with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('All models are synchronized successfully');
  })
  .catch(error => {
    console.log('Error occurred during model synchronization:', error);
  });

// Post request for user registration
app.post('/register', validateUser,HomeController.register);

//post request for user login
app.post('/user-login',validateUserLogin,HomeController.login);

//put request to update user
app.put('/user/:id',JWTController.verifyAccessToken.bind(JWTController),updateUserValidator,HomeController.updateUser);

//user get request by id
app.get('/user/:id',JWTController.verifyAccessToken.bind(JWTController),HomeController.getUser);

//delete user
app.delete('/user/:id',JWTController.verifyAccessToken.bind(JWTController),HomeController.deleteUser);

//get new access token
app.get('/new-access-token',JWTController.grantNewAccessToken.bind(JWTController));

const PORT = 3700;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
