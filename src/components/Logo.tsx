import { FunctionComponent } from "react";
import {  useNavigate } from "react-router-dom";

interface LogoProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
}

const Logo: FunctionComponent<LogoProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  let navigate = useNavigate();
  return (
    <>
      <h6 className="display-5 text-light text-start mx-3 mt-3 ">
        <i className="fa-solid fa-address-card"></i>CRM
      </h6>
      {isLoggedIn && (
        <button
          className="btn btn-secondary"
          onClick={() => {
            sessionStorage.setItem("isLoggedIn", "false");
            navigate("/");
            setIsLoggedIn(false);
          }}
        >
          <i className="fa-solid fa-up-right-from-square"></i>
          Logout
        </button>
      )}
    </>
  );
};

export default Logo;
