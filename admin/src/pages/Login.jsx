import React from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/adminLogin", {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error("Failed to login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="font-medium mb-4 text-2xl">Admin login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email address
            </p>
            <input
              className="rounded-lg w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              name="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-lg w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
