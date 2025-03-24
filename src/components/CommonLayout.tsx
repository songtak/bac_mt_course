import React from "react";
import { Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <div className="max-w-md mx-auto   bg-white">
      {/* <Header /> */}
      <main className="p-6 space-y-6 flex-grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
