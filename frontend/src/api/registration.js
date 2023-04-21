const http = require("axios");

export const sendRegistration = async (username, email, password) => {
  const resp = await http
    // .post("https://app.mankacs.site/api/signup", {
    .post("http://localhost:8080/api/signup", {
      username: username,
      email: email,
      password: password,
    })
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("All fields are required!");
      }
      if (error.response.status === 422) {
        window.alert("Username or email already taken!");
      }
    });
  return resp.data;
};
