import { FunctionComponent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Customer from "../interfaces/Customer";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../services/CustomerServices";

interface AddCustomrProps {}

const AddCustomr: FunctionComponent<AddCustomrProps> = () => {
  let formik = useFormik({
    initialValues: { firstName: "", lastName: "", phone: "", email: "" },
    validationSchema: yup.object({
      firstName: yup.string().required().min(2),
      lastName: yup.string().required().min(2),
      phone: yup.string().required().min(10).max(10),
      email: yup.string().required().email().min(5),
    }),
    onSubmit: (values: Customer) => {
      addCustomer(values)
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    },
  });
  let navigate = useNavigate();

  return (
    <>
     
      <div className="container">
        <h6 className="display-6 text-light">New Customer:</h6>
        <form onSubmit={formik.handleSubmit} className="col-md-3 mx-auto">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <small className="text-danger">{formik.errors.firstName}</small>
            )}
            <label htmlFor="floatingInput">firstName</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <small className="text-danger">{formik.errors.lastName}</small>
            )}
            <label htmlFor="floatingInput">lastName</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <small className="text-danger">{formik.errors.phone}</small>
            )}
            <label htmlFor="floatingInput">phone</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">email</label>
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>
          <button
            className="btn btn-success w-100"
            disabled={!formik.isValid || !formik.dirty}
          >
            <i className="fa-solid fa-user-plus"></i>
          </button>
        </form>
        <button className="btn btn-warning mt-5" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>Back
        </button>
      </div>
    </>
  );
};

export default AddCustomr;
