const req = require("request");
//Function to call to get the long and lat of a city in a object callback
const geocode = (address, callback) => {
  //Geocoding - take location and get longnatude and latitude
  const mapURL = "http://api.mapbox.com/geocoding/v5/mapbox.places/";
  const mapBoxKey =
    "pk.eyJ1IjoiamFjb2Jncm9oIiwiYSI6ImNrMjU2MG4zMjBjZmwzaG5yamswdTR6em8ifQ.YytABcVWqFuv5myKu3cIqA";
  const city = `${encodeURIComponent(address)}.json`;
  const addressQuery = `${mapURL}${city}?access_token=${mapBoxKey}`;

  req.get({ url: addressQuery, json: true }, (error, res) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (res.body.features.length === 0) {
      callback("The address given can not be found");
    } else {
      const { place_name, center } = res.body.features[0];
      const location = {
        location: place_name,
        long: center[0],
        lat: center[1]
      };
      callback(error, location);
    }
  });
};

module.exports = geocode;
