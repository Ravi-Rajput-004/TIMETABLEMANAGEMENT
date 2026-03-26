const API_URL = (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) 
  || "https://timetablemanagement.onrender.com";

export default API_URL;
