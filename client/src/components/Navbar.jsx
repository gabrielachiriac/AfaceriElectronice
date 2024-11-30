import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoggedIn } from "../store/slices/globalSlice";

function Navbar() {
  const {loggedIn} = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(setLoggedIn(false));
    localStorage.removeItem("token");
  };

  return (
    <div className="navbarWrapper">
      <Link to="/">Homepage</Link>

      {loggedIn ? (
        <Link to="/" onClick={() => logoutUser()}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;
