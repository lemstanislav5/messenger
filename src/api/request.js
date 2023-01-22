import axios from "axios";
const URL = 'http://212.193.48.242:4000';

export const sendPhoneNumber = async (phone) => {
  console.log(URL + '/api/authentication')
  const result = await axios.post('http://212.193.48.242:4000/api/authentication', { type: 'authentication', phone });
  console.log(result.data)
  if(result.data !== undefined && result.data.status === "enter_code") return true;
}

  //https://63c9375b904f040a9658e4e3.mockapi.io/api/get/uesrs
  // axios.get('https://63c9375b904f040a9658e4e3.mockapi.io/api/get/uesrs', {
  //     params: {}
  // })