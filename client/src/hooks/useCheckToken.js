import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCheckTokenLoading, setLoggedIn, setToken } from "../store/slices/globalSlice";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

function useCheckToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      };

      fetch(`${API_URL}/auth/check`, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            dispatch(setLoggedIn(true));
            dispatch(setToken(res.data.token))
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        })
        .finally(() => {
          dispatch(setCheckTokenLoading(false));
        });
    } else {
      dispatch(setCheckTokenLoading(false));
    }
  }, []);
}

export default useCheckToken;
