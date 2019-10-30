const req = require("request");

const forecast = (lat, long, callback) => {
  const baseUrl = `https://api.darksky.net/forecast/934ed32d2b22f908722fcfc50866325c/${lat},${long}`;
  req.get({ url: baseUrl, json: true }, (error, { body: data }) => {
    if (error) {
      callback(error);
    } else if (data.error) {
      callback("unable to find location");
    } else {
      const dataCurrently = data.currently;
      const dataDaily = data.daily;
      const dataString = `${dataDaily.data[0].summary} It is currently ${dataCurrently.temperature} outside and the chance of rain is ${dataCurrently.precipProbability}%`;
      callback(error, dataString);
    }
  });
};

module.exports = forecast;
