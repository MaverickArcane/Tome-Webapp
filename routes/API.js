var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


// Import the functions from mastercontrol.js
var masterControl = require('../utils/mastercontrol');

// Middleware to check if the user is authenticated before accessing /kalispawn
function requireAuth(req, res, next) {
    const token = req.cookies.token;
  
    if (token) {
      jwt.verify(token, '1234', (err, decoded) => { // Change this
        if (err) {
          return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }
        req.user = decoded.username;
        next();
      });
    } else {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
  }

router.get('/health', (req, res) => {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
  
    res.status(200).send(data);
  });
  
// This specific route should be placed before wildcard routes
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (masterControl.checkCredentials(username, password)) {
    const token = masterControl.generateToken(username);
    res.cookie('token', token, { httpOnly: true });
    res.json({ status: 'success', message: 'Signed in successfully', token: token });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid credentials' });
  }
});

router.get('/logout', requireAuth, async (req, res) => {
  try {
    const username = req.user;
    const user = masterControl.getUserByUsername(username);

    // Check if the user has an active instance
    if (user.instanceId) {
      const terminatedInstance = await masterControl.terminateUserInstance(username);
      res.json({
        status: 'success',
        message: 'Signed out successfully',
        terminatedInstanceId: terminatedInstance.instanceId,
      });
    } else {
      // If the user does not have an active instance, just clear the token
      res.clearCookie('token');
      res.json({
        status: 'success',
        message: 'Signed out successfully',
        terminatedInstanceId: null,
      });
    }
  } catch (error) {
    console.error('Error during signout:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

router.get('/spawnlab', requireAuth, (req, res) => {
  const username = req.user;

  const user = masterControl.getUserByUsername(username);

  if (user.instanceId) {
    return res.status(403).json({ status: 'error', message: 'User already has an active instance' });
  }
  

  masterControl.createAndTagEC2Instance(username)
    .then(instanceId => {
      // Set the instanceId for the user
      user.instanceId = instanceId;
      return masterControl.getUserInstance(username);
    })
    .then(instanceInfo => {
      // TODO: Generate password dynamically using secretsmanager
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SecretsManager.html
      var pass = "s~2C|1`1{xUP";
      var link = `http://${instanceInfo.publicIpAddress}:6080/vnc.html?password=${pass}&autoconnect=true&resize=remote`;
      res.json({ status: 'success', message: 'Instance created and tagged successfully', link: link });
    })
    .catch(error => {
      console.error('Bad Request:', error);
      res.status(400).json({ status: 'error', message: 'Bad Request' });
    });
});

router.get('/termlab', requireAuth, async (req, res) => {
  try {
    const username = req.user;
    const user = masterControl.getUserByUsername(username);

    // Check if the user has an active instance
    if (user.instanceId) {
      const terminatedInstance = await masterControl.terminateUserInstance(username);
      res.json({
        status: 'success',
        message: 'Instance terminated successfully',
        terminatedInstanceId: terminatedInstance.instanceId,
      });
    } else {
      // If the user does not have an active instance, just clear the token
      res.json({
        status: 'Error',
        message: 'No User Instance',
        terminatedInstanceId: null,
      });
    }
  } catch (error) {
    console.error('Error during signout:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


router.get('/lab/:labId', requireAuth, (req, res) => {
  try {
    const username = req.user;
    const labId = req.params.labId;
    
    const labContent = masterControl.getLabContent(username, labId);
    res.json({ status: 'success', message: 'Lab content retrieved successfully', labContent: labContent });
  } catch (error) {
    console.error('Error retrieving lab content:', error);

    // Set a proper status code based on the error type
    let statusCode = 500;
    if (error.status === 'error' && error.message === 'Lab not found') {
      statusCode = 404; // Not Found
    }

    res.status(statusCode).json({ status: 'error', message: error.message });
  }
});

module.exports = router;