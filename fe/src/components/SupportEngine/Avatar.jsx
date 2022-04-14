import React, { useState } from "react";
import { styles } from "./style";

const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={props.style}>
      <div
        className="transition-3"
        style={{
          ...styles.avatarHello,
          ...{ opacity: hovered ? "1" : 0 },
        }}
      >
        Hay It's Trung
      </div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="transition-3"
        onClick={() => props.onClick && props.onClick()}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "1px solid #f9f0ff" : "4px solid #7a39e0" },
        }}
      />
    </div>
  );
};

export default Avatar;
