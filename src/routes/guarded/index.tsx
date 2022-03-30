import React, { useContext, ComponentType } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../../services/user";

interface ProtectedRouteProps {
  component: ComponentType;
}

const Guarded: React.FC<ProtectedRouteProps> = ({ component, ...props }) => {
  const user = useContext(UserContext);

  const Component = component;

  return user ? <Component {...props} /> : <Navigate to="/login" />;
};

export default Guarded;
