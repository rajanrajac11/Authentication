import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../store/userSlice";

function Login() {
  const { register, handleSubmit } = useForm();

  const { loading, error } = useSelector(
    (state) => state.persistedReducer.user
  );
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data, e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const dataGot = await res.json();
      if (dataGot.success === false) {
        dispatch(loginFailure(dataGot.message));
        return;
      }
      dispatch(loginSuccess(dataGot));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(loginFailure(dataGot.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center p-10  ">
      <div className="mx-auto w-96 max-w-lg bg-gray-200 rounded-xl p-10 border border-gray-200 ">
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">
          Login
        </h2>

        <p className="text-red-600  mt-3 text-center">
          {error ? error || "Something went wrong" : ""}
        </p>

        <form onSubmit={handleSubmit(login)} className="mt-5">
          <div className="space-y-5">
            <Input
              label="Email: "
              id="email"
              placeholder="Enter your email"
              type="email"
              className="w-full p-2 rounded-md text-md"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              onChange={handleChange}
            />
            <Input
              label="Password: "
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 rounded-md text-md"
              {...register("password", {
                required: true,
              })}
              onChange={handleChange}
            />
            <Input
              type="submit"
              disabled={loading}
              value={loading ? "Loading..." : "Login"}
              className="cursor-pointer bg-slate-700 text-white p-2 rounded-xl hover:opacity-90 w-20"
            />
          </div>
        </form>
        <div>
          Dont have an account?
          <span className="text-blue-700 underline">
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
