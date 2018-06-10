import React from "react";
import "./User.css";
export default ({ user }) => (
  <div
    className="user"
    style={
      user.lobby
        ? {}
        : {
            position: "absolute",
            left: `${user.x}px`,
            top: `${user.y}px`
          }
    }
  >
    <div className={user.ok ? "badge-ok" : "badge-not-ok"} />
    {user.displayName}
  </div>
);
