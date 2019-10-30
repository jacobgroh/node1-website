const getWeather = (address, callback) => {
  fetch(`http://localhost:3000/weather?address='${address}'`).then(response => {
    response.json().then(data => {
      if (data.error) {
        callback(data);
      } else {
        callback(data);
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#location");
const messageTwo = document.querySelector("#forcast");

messageOne.textContent = "testing";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  messageOne.textContent = "Loading...";

  const address = search.value;
  getWeather(address, ({ error, location, forcast } = {}) => {
    if (!error) {
      messageOne.textContent = location;
      messageTwo.textContent = forcast;
    } else {
      messageOne.textContent = error;
    }
  });
});
