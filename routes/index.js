require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const User = mongoose.model('User', {username: String, password: String})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', async function(req, res, next) {
  const username = req.body.username;
  const pw = req.body.password;
  const repeatedPw = req.body.verify_pw;
  const existingUser = await User.findOne({username: username});
  if (existingUser) {
    return res.render('index', {error: 'Tunnus on jo olemassa'});
  }
  if (pw != repeatedPw) {
    return res.render('index', {error: 'Salasanat eivät täsmää'});
  }
  const hashedPw = await bcrypt.hash(pw, 12);
  const user = new User({username: username, password: hashedPw});
  user.save().then(response => {
    res.redirect('login');
  });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', async function (req, res, next) {
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    console.error('käyttäjää ei löytynyt');
    return res.render('login', {error: 'Käyttäjätunnus tai salasana väärin'});
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    console.error('salasanat eivät täsmää');
    console.log(user.password);
    console.log(req.body.password);
    return res.render('login', {error: 'Käyttäjätunnus tai salasana väärin'});
  }
  res.render('logged_in', {user: user.username, pw_hash: user.password});
});

module.exports = router;
