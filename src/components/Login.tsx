import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../interfaces/User";

import * as yup from "yup";
import { checkUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedbacks";
interface LoginProps {
  setIsLoggedIn: Function;
}
const Login: FunctionComponent<LoginProps> = ({ setIsLoggedIn }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      password: yup.string().required().min(8),
      email: yup.string().required().email().min(5),
    }),
    onSubmit: (values: User) => {
      checkUser(values)
        .then((res) => {
          if (res.data.length) {
            navigate("/customers");
            sessionStorage.setItem("isLoggedIn", "true");
             setIsLoggedIn(true);
             successMsg("You logged in successfuly");
          } else errorMsg("Worng email or password");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="container">
        <h6 className="display-6 text-light">Login:</h6>
        <form onSubmit={formik.handleSubmit} className="col-md-3 mx-auto">
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
        <Link to="/register">New user? Register here</Link>
      </div>
    </>
  );
};
export default Login;
