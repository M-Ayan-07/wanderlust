const User = require('../models/user');


module.exports.renderSignup = (req, res) => {
  res.render('users/signup');
}

module.exports.signup = async (req, res, next) => {
    try {   
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Wonderlust!');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('signup');
    }

};

module.exports.renderLogin = (req, res) => {
  res.render('users/login.ejs');
};

module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back!');
  res.redirect(res.locals.redirectUrl || '/listings');
};

module.exports.logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success', "you have logged out");
    res.redirect('/listings');
  });
};