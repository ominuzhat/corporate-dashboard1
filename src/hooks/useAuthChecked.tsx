import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TOKEN_NAME } from "../utilities/baseQuery";
import { loggedIn } from "../app/features/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthChecked = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const getAuth = localStorage.getItem(TOKEN_NAME);
      if (getAuth) {
        dispatch(loggedIn({ success: true, access_token: getAuth }));
      } else {
        navigate("/login", { state: { from: location }, replace: true });
      }
    } catch (error) {
      console.error(error);
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [dispatch, navigate, location]);
};

export default useAuthChecked;
