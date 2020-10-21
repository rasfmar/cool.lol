import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API_URL, URL_REGEX } from "../config/constants";
import axios from "axios";

const Redirect = ({ match }) => {
  const { slug } = match.params;
  const history = useHistory();

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
  }, []);

  return (
    <p>Redirecting</p>
  );
};

export default Redirect;
