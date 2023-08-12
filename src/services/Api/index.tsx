import axios from "axios";
// import dotenv from "dotenv";

// console.log(process.env.REACT_APP_ACCESS_KEY);
  const api = axios.create({  
    baseURL: process.env.REACT_APP_ACCESS_KEY, 
  }
);



export default api;