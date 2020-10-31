import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { URL_REGEX } from "../config/constants";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Redirect = ({ match }) => {
  const { slug } = match.params;
  const history = useHistory();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1234/api";

  useEffect(() => {
    axios.get(API_URL + "/click/" + slug)
      .then(res => {
        let { url } = res.data;
        if (!URL_REGEX.test(url)) {
          url = "https://" + url;
        }
        if (!URL_REGEX.test(url)) {
          throw new Error("Invalid URL");
        }
        window.location.href = url;
      })
      .catch(err => {
        history.push("/");
      });
  }, [history, slug, API_URL]);

  return null;
};

export default Redirect;

