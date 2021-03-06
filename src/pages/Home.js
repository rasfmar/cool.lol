import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import General from "./General";
import LoadingIcon from "../components/LoadingIcon";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [urlInfo, setUrlInfo] = useState({});
  const baseUrl = window.location.origin;
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:1234/api";

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(API_URL + "/create", {
        url: e.target[0].value
      })
      .then(res => {
        setLoading(false);
        setFailed(false);
        setUrlInfo(res.data);
      })
      .catch(err => {
        setLoading(false);
        setFailed(true);
      });
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .catch(err => {
        setFailed(true);
      });
  }, [API_URL]);

  return (
    <General>
      {failed && (
        <p>server issued an error. try again later</p>
      )}
      {!loading ? (
        <div>
          {Object.keys(urlInfo).length === 0 ? (
            <form onSubmit={onSubmit}>
              <input type="text" placeholder="enter your long url" required />
              <input type="submit" value="generate" />
            </form>
          ) : (
            <>
              <p>your url has been created: <Link to={`/${urlInfo.slug}`}>{`${baseUrl}/${urlInfo.slug}`}</Link></p>
              <p>your secret access key is: <b>{urlInfo.key}</b></p>
              <p>the key will allow you to view data for your url (eventually.)</p>
            </>
          )}
        </div>
      ) : (
        <LoadingIcon />
      )}
    </General>
  );
};

export default Home;
