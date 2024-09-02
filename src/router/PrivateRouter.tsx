import React, { ReactNode } from "react";
import { useGetProfileQuery } from "../modules/Profile/api/profileEndpoint";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../common/Loader/Loader";

interface Props {
  children: (role: string | null) => ReactNode; // Function that takes the role as argument
}

const PrivateRouter: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { data: profileData, isLoading, isSuccess } = useGetProfileQuery();
  
  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    const role = profileData?.data?.role?.name || null; // Fetch the role from profile data
    
    // Render children with the role
    return <>{children(role)}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;
