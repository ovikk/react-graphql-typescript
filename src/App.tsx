import * as React from "react";
import './App.css';
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";


export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
         <AddUser />
         <UserList />
      </div>
    );
  }
}

