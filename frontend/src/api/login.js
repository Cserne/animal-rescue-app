const axios = require("axios");

export const sendLogin = async (email, password) => {
  const resp = await axios
    // .post("https://app.mankacs.site/api/login", {
    .post("http://localhost:8080/api/login", {
      email: email,
      password: password,
    })
    .catch((error) => {
      // if (error.response.status === 400) {              form "input" required" takes care of this
      //   window.alert("All fields are required!");
      // };
      if (error.response.status === 422) {
        window.alert("Invalid username, email or password!");
      };
    });
  return resp.data;
};
