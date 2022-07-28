/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "./features/login/loginSlice";


function App () {
  let navigate = useNavigate();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    // Check auth
    // TODO check exp
    if (!user && !token) {
      return navigate("/login");
    }
  }, []);

  return (
    <div>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default App;
