import React, { Component } from "react";
import Nav from "./Nav";
import BigButton from "./BigButton";
import SeatLayout from "./SeatLayout";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import { Z_DATA_ERROR } from "zlib";

class App extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDJ0wY9oshKv1dHJm2uCX7AoY2MyILngJM",
      authDomain: "good-to-go-650dd.firebaseapp.com",
      databaseURL: "https://good-to-go-650dd.firebaseio.com",
      projectId: "good-to-go-650dd",
      storageBucket: "",
      messagingSenderId: "1034021531413"
    });
    const database = firebase.database();
    firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        this.setState({ loggedIn: true, uid: user.uid });
        database.ref(`goodToGoers2/${user.uid}/ok`).set(false);
        database.ref(`goodToGoers2/${user.uid}/x`).set(0);
        database.ref(`goodToGoers2/${user.uid}/y`).set(0);
        database.ref(`goodToGoers2/${user.uid}/lobby`).set(true);
        database
          .ref(`goodToGoers2/${user.uid}/displayName`)
          .set(user.displayName);
      } else {
        this.setState({ loggedIn: false });
      }
    });
    database.ref("goodToGoers2").on("value", snapshot => {
      const val = snapshot.val();
      const users = Object.keys(val).map(key => ({ ...val[key], uid: key }));
      this.setState({ users: users });
    });
  }
  login = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
  };
  goodToGo = async () => {
    const database = firebase.database();
    database.ref(`goodToGoers2/${this.state.uid}/ok`).set(true);
  };
  cancel = async () => {
    const database = firebase.database();
    database.ref(`goodToGoers2/${this.state.uid}/ok`).set(false);
  };
  render() {
    const users = this.state.users;
    return (
      <div className="App">
        <Nav />
        <div className="container">
          {!this.state.loggedIn && (
            <BigButton onClick={this.login}>Sign in with GitHub</BigButton>
          )}
          {this.state.loggedIn && (
            <BigButton
              style={{ backgroundColor: "#29AC13", color: "#fff" }}
              onClick={this.goodToGo}
            >
              Good to go!
            </BigButton>
          )}
          {this.state.loggedIn && (
            <BigButton
              style={{ backgroundColor: "#29AC13", color: "#fff" }}
              onClick={this.cancel}
            >
              Cancel
            </BigButton>
          )}

          <SeatLayout users={users} />
        </div>
      </div>
    );
  }
}

export default App;
