import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Clock from "react-live-clock";

export default function Navbar() {
  let nav = useNavigate();
  return (
    <>
      <div
        className="bg-danger mb-2 p-1 d-flex text-white  mx-0 align-items-center sticky-top"
        style={{ justifyContent: "space-between" }}
      >
        <div className="col-4 row">
          <h1
            className="col-auto"
            style={{ cursor: "pointer" }}
            onClick={() => {
              nav("/");
            }}
          >
            MataPark
          </h1>
        </div>

        <Clock
          className="col-4  text-center"
          format={"h:mm:ss A"}
          ticking={true}
          timezone={"US/Pacific"}
          style={{ fontSize: "1.5em" }}
        />
        <div className="col-4 row justify-content-end">
          <h2
            className="col-auto"
            style={{ cursor: "pointer" }}
            onClick={() => nav("/Login")}
          >
            Login
          </h2>
        </div>
      </div>
    </>
  );
}
