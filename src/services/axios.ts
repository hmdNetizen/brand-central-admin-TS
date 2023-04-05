import axios from "axios";
import { BASE_URL } from "src/services/BASE_URL";

export default axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});
