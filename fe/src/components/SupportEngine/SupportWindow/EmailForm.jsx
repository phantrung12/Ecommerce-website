import React, { useState } from "react";
import { RotateLeftOutlined } from "@material-ui/icons";
import Avatar from "../Avatar";
import { styles } from "../style";
import axios from "axios";

const EmailForm = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getOrCreateUser = (callback) => {
    axios
      .put(
        `https://api.chatengine.io/users/`,
        {
          username: email,
          secret: email,
          email: email,
        },
        { headers: { "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data));
  };

  const getOrCreateChat = (callback) => {
    axios
      .put(
        `https://api.chatengine.io/chats/`,
        {
          usernames: ["admin"],
          is_direct_chat: true,
        },
        { headers: { "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email);

    getOrCreateUser((user) => {
      props.setUser(user);
      getOrCreateChat((chat) => props.setChat(chat));
    });
  };

  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%" : "0%",
          opacity: props.visible ? "1" : "0",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>

      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{ zIndex: loading ? "10" : "-1", opacity: loading ? "0.33" : "0" },
        }}
      />
      <RotateLeftOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "82px",
            top: "calc(50% - 41px)",
            left: "calc(50% - 41px)",
          },
        }}
      />

      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          style={{ position: "relative", left: "calc(50% - 44px)", top: "10%" }}
        />
        <div style={styles.topText}>
          B???n c???n ch??ng t??i h??? tr???
          <br />
          ??i???u g???
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ position: "relative", width: "100%", top: "19.75%" }}
        >
          <input
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.emailInput}
          />
          {/* <div style={styles.bottomText}>
            Enter your email <br /> to get started.
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
