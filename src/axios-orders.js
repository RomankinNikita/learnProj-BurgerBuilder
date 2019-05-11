import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://learning-project1-react.firebaseio.com'
});

export default instance;
