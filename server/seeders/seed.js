require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const db = require("../config/connection");
const { User, Listing } = require("../models");
const userSeeds = require("./userSeeds.json");
const listingSeeds = require("./listingSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Listing", "listings");
    await cleanDB("User", "users");

    await User.create(userSeeds);
    await Listing.create(listingSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
