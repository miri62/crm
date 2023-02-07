import { FunctionComponent, useEffect, useState } from "react";
import Customer from "../interfaces/Customer";
import { useNavigate } from "react-router-dom";

import { deleteCustomer, getCustomers } from "../services/CustomerServices";

interface CustomersProps {}

const Customers: FunctionComponent<CustomersProps> = () => {
  let [customers, setCustomers] = useState<Customer[]>([]);
  let [chanaged, setChanged] = useState<boolean>(false);
  let navigate = useNavigate();
  useEffect(() => {
    getCustomers()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, [chanaged]);
  return (
    <>
      
      <div className="container text-light">
        <button
          className="btn btn-success"
          onClick={() => navigate("/add-customer")}
        >
          <i className="fa-solid fa-user-plus"></i>
          Customer
        </button>
        {customers.length ? (
          <table className="table text-light">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer: Customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>
                    <i
                      className="fa-solid fa-user-pen text-warning"
                      onClick={() =>
                        navigate(`/update-customer/${customer.id}`)
                      }
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-user-xmark text-danger"
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          deleteCustomer(customer.id as number)
                            .then(() => setChanged(!chanaged))
                            .catch((err) => console.log(err));
                        }
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Theres no customers </p>
        )}
      </div>
    </>
  );
};

export default Customers;
