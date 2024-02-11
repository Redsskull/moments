import axios from 'axios';

axios.defaults.baseURL = 'https://moments-db-b9026c5319dc.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multiform/form-data';
axios.defaults.withCredentials = true;