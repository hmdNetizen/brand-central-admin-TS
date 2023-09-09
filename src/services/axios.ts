import axios from "axios";
import { BASE_URL } from "src/services/BASE_URL";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
