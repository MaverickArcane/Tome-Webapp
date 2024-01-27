const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


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

router.get('/networkingLab', requireAuth, (req, res) => {
    res.render('networkingModule');
});


module.exports = router;