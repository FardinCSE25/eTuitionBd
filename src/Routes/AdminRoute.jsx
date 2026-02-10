import Loading from "../Components/Loading/Loading";
import UseAuth from "../Hooks/UseAuth";
import UseRole from "../Hooks/UseRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = UseRole();

  // ⏳ WAIT for everything
  if (loading || isLoading) {
    return <Loading />;
  }

  // ✅ Access granted
  if (user && role?.role === "Admin") {
    return children;
  }

  // ❌ Access denied
  return <Forbidden />;
};

export default AdminRoute;
