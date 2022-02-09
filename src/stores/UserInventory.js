import { observable, action, makeObservable, computed } from "mobx";

export class UserInventory {
  constructor() {
    this.userFirstName = "";
    this.isLoggedIn = false;
    this.userID = "";
    this.isAdmin = false;
    makeObservable(this, {
      userFirstName: observable,
      isLoggedIn: observable,
      isAdmin: observable,
      userID: observable,
      checkUserLoggedIn: action,
      setUserType: action,
      setLogin: action,
      setUserID: action,
      logout: action,
    });
  }
  setUserType = (type) => {
    this.isAdmin = type;
  };

  setLogin = () => {
    this.isLoggedIn = true;
  };

  setUserID = (id) => {
    this.userID = id;
  };

  checkUserLoggedIn = async () => {
    const response = await fetch("http://localhost:8888/auth/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const content = await response.json();
    this.userFirstName = content.firstName;
    this.userID = content._id;
    this.isAdmin = content.isAdmin;
    if (response.status != 401) {
      this.setLogin();
    }
  };

  logout = async () => {
    await fetch("http://localhost:8888/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    this.userFirstName = "";
    this.isLoggedIn = false;
    this.userID = "";
    this.isAdmin = false;
  };
}
