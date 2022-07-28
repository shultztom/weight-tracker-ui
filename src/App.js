/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "./features/login/loginSlice";
import { verifyToken } from "./utils/auth";


function App () {
  let navigate = useNavigate();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    // Check if token is set
    if (!user && !token) {
      return navigate("/login");
    }

    // Verify Token
    const verify = async () => {
      // TODO why is this being called twice??
      try {
        const isValid = await verifyToken(token);
        if(isValid.status !== 200){
          return navigate("/login");
        }
      } catch (e) {
        console.log(e.message);
        return navigate("/login");
      }
    }
    verify();
  }, []);

  return (
    <div>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default App;
