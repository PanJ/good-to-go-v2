import React from "react";
import User from "./User";
import "./SeatLayout.css";

export default ({ users }) => (
  <div>
    <div className="lobby">
      <h2>Lobby</h2>
      {users
        .filter(user => user.lobby)
        .map(user => <User key={user.uid} user={user} />)}
    </div>
    <div className="room">
      {users
        .filter(user => !user.lobby)
        .map(user => <User key={user.uid} user={user} />)}
    </div>
  </div>
);
