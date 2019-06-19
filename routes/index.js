const express = require('express');
const router = express.Router();
const{ ensureAuthenticated } = require('../config/auth');
router.get('/', (req,res) => {
    res.render('index', {title: 'Welcome'});
});
router.get('/dashboard',ensureAuthenticated, (req,res) => {
    res.render('dashboards', {title: 'Your Dashboard', user: req.user.name});
})

module.exports = router;