import http from 'axios';

export const addHelpRequest = async (species, city, date, description) => {
    const token = (JSON.parse(localStorage.getItem('token')).token);
    console.log("tokenke: ", token);

    if (!token) window.alert("Please log in first");
    if ((token && species && city && date && description)) {
      try {
        const response = await http.post(
          "https://app.mankacs.site/api/helprequest", 
          {
            species: species,
            city: city,
            date: date,
            description: description,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return response;
      } catch (error) {
        console.log("something has gone wrong! ", error);
        return error;
      }
    }
  };
  