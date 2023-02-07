import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";
import { addUser } from "../services/userService";

interface RegisterProps {
  setIsLoggedIn: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setIsLoggedIn }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      password: yup.string().required().min(8),
      email: yup.string().required().email().min(5),
    }),
    onSubmit: (values: User) => {
      addUser(values)
        .then(() => {
          navigate("/customers");
          sessionStorage.setItem("isLoggedIn", "true");
           setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container">
        <h6 className="display-6 text-light">Register:</h6>
        <form onSubmit={formik.handleSubmit} className="col-md-3 mx-auto">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <small className="text-danger">{formik.errors.name}</small>
            )}
            <label htmlFor="floatingInput">name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
            <label htmlFor="floatingInput">email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}
            <label htmlFor="floatingInput">password</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!formik.isValid || !formik.dirty}
          >
            <i className="fa-solid fa-right-to-bracket"></i>
          </button>
        </form>
        <Link to="/">alredy</Link>
      </div>
    </>
  );
};

export default Register;
