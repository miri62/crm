import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API + "/users"

export function checkUser(user: User) {
  // localhost:5000/users?email=example@test.com&password=123
  return axios.get(`${api}?email=${user.email}&password=${user.password}`);
}

export function addUser(newUser: User) {
  return axios.post(api, newUser);
}
