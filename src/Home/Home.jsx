import React from "react";
import { Redirect } from "react-router-dom";

const redirect = (path) => {
  return <Redirect to={path} />;
};

function Home() {
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: "url(assets/bankingbg.jpg)",
        flex: 1,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container text-center text-white"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <h1 className="display-3">Welcome to GRIP Bank</h1>

        <h3 className="display-4" style={{ fontSize: "31px" }}>
          One stop for all the banking needs.
        </h3>
      </div>
    </div>
  );
}

export default Home;
