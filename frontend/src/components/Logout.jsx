import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="flex justify-center mt-6">
      <button
        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
