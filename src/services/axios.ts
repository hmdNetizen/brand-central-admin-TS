import axios from "axios";
import { BASE_URL, DEV_BASE_URL } from "src/services/BASE_URL";

export default axios.create({
  baseURL: DEV_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
