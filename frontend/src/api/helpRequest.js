import http from 'axios';

export const addHelpRequest = async (species, city, description, image) => {
    const token = (JSON.parse(localStorage.getItem('token')).token);
    console.log("tokenke: ", token);

    if (!token) window.alert("Please log in first");
    // if ((token && species && city && description)) {
    if ((token)) {
      try {
        const response = await http.post(
          // "https://app.mankacs.site/api/helprequest", 
          "http://localhost:8080/api/helprequest", 
          {
            species: species,
            city: city,
            description: description,
            image: image,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return response;
      } catch (error) {
        // if (error.response.status === 422) window.  alert('All fields are required!');              form "input required" takes care of this
        console.log("Something has gone wrong!", error);
        return error;
      }
    }
  };
  