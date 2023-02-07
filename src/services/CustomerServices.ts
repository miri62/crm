import axios from "axios";
import Customer from "../interfaces/Customer";

const api: string = process.env.REACT_APP_API + "/customers";

//get to all customer
export function getCustomers() {
  return axios.get(api);
}

//get to specific customer by id
export function getCustomerById(id: number) {
  return axios.get(`${api}/${id}`);
}

//post to add new customer
export function addCustomer(customer: Customer) {
  return axios.post(api, customer);
}

//put to updata customer details by id
export function updateCustomer(id: number, updateCustomer: Customer) {
  return axios.put(`${api}/${id}`);
}

//delete to delete customer by id
export function deleteCustomer(id: number) {
  return axios.delete(`${api}/${id}`);
}
