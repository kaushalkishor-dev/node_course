const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      editing: true,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, rating, location, photoUrl, description } = req.body;

  const home = new Home(
    houseName,
    price,
    rating,
    location,
    photoUrl,
    description,
  );
  home
    .save()
    .then(() => console.log('Home saved successfully'));
    res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, rating, location, photoUrl, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    rating,
    location,
    photoUrl,
    description,
    id,
  );
  home
    .save()
    .then(result => {
      console.log("Home Updated",result);
    })
    res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to delete ", homeId);
  Home.deleteById(homeId).then (() => {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log('Error while deleting',error);
  });
};
