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
        window.alert("all fileds required!");
      }
      if (error.response.status === 401) {
        window.alert("username or email already taken!");
      }
    });
  return resp.data;
};
