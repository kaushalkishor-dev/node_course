const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      editing: true,
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.postAddHome = async (req, res, next) => {
  const { houseName, price, rating, location, photoUrl, description } =
    req.body;

  const home = new Home({
    houseName,
    price,
    rating,
    location,
    photoUrl,
    description,
  });

  try {
    await home.save(); // 👈 wait karega
    console.log("Home saved successfully");
    res.redirect("/host/host-home-list");
  } catch (err) {
    console.log("Error while saving home", err);
  }
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, rating, location, photoUrl, description } =
    req.body;

  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.rating = rating;
      home.location = location;
      home.photoUrl = photoUrl;
      home.description = description;
      home
        .save()
        .then((result) => {
          console.log("Home Updated", result);
        })
        .catch((error) => {
          console.log("Error while updating home", error);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while finding home for editing", error);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};
