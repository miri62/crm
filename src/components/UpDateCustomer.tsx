import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Customer from "../interfaces/Customer";
import * as yup from "yup";
import { getCustomerById, updateCustomer } from "../services/CustomerServices";

interface UpDateCustomerProps {}

const UpDateCustomer: FunctionComponent<UpDateCustomerProps> = () => {
  let [customer, setCustomers] = useState<Customer>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      firstName: yup.string().required().min(2),
      lastName: yup.string().required().min(2),
      phone: yup.string().required().min(10).max(10),
      email: yup.string().required().email().min(5),
    }),
    onSubmit: (values: Customer) => {
      updateCustomer(parseInt(id as string), values)
        .then(() => {
          navigate("/customer");
          alert("Customer update");
        })
        .catch((err) => console.log(err));
    },
  });
  let { id } = useParams();
  useEffect(() => {
    getCustomerById(parseInt(id as string))
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="container">
        <h6 className="display-6 text-light">New Customer</h6>
        <form onSubmit={formik.handleSubmit} className="col-md-3 mx-auto">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Jhon"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">First Name</label>
            {formik.touched.firstName && formik.errors.firstName && (
              <small className="text-danger">{formik.errors.firstName}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Lenon"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Last Name</label>
            {formik.touched.lastName && formik.errors.lastName && (
              <small className="text-danger">{formik.errors.lastName}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="phone"
              className="form-control"
              id="floatingInput"
              placeholder="0551234567"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <small className="text-danger">{formik.errors.phone}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="obama@gmail.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email</label>
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
            <button
              type="submit"
              className="btn btn-warning my-3 w-100"
              disabled={!formik.isValid || !formik.dirty}
            >
              <i className="fa-solid fa-user-pen"></i>
            </button>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-chevron-left">Back</i>
          </button>
        </form>
      </div>
    </>
  );
};

export default UpDateCustomer;
