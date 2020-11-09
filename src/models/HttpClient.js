export default class HttpClient {
    constructor() {
      const token = sessionStorage.getItem('jwt');
      const axios = require("axios");
      if (token != null) {
        this.instance = axios.create({
          baseURL: process.env.VUE_APP_ROOT_API,
          timeout: 60000,
          headers: { Authorization: "Bearer" + " " + token }
        });
      } else {
        this.instance = axios.create({
          baseURL: process.env.VUE_APP_ROOT_API,
          timeout: 60000
        });
      }
    }
  }
  