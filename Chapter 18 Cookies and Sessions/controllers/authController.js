exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    editing: false,
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", "true");
  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session: ", err);
    }
    // res.clearCookie("isLoggedIn");
    res.redirect("/login");
  });
}