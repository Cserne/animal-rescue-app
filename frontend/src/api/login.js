const axios = require("axios");

export const sendLogin = async (email, password) => {
  const resp = await axios
    .post("https://app.mankacs.site/api/login", {
    // .post("http://localhost:8080/api/login", {
      email: email,
      password: password,
    })
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("all fields are required!");
      }
      if (error.response.status === 401) {
        window.alert("wrong username or password!");
      }
    });
  return resp.data;
};
