import axios from "axios";
const URL = 'http://212.193.48.242:4000';

export const sendPhoneNumber = (phone) => {
  return axios.post(URL + '/api/authentication', {
    type: 'authentication', phone
  })
  .then((res) => {
    if(res.type === "authentication" && res.status === "enter_code") {
      return true;
    } else {
      return false;
    }

  })
  .catch((error) => {
    console.log(error);
  });
}

  //https://63c9375b904f040a9658e4e3.mockapi.io/api/get/uesrs
  // axios.get('https://63c9375b904f040a9658e4e3.mockapi.io/api/get/uesrs', {
  //     params: {}
  // })