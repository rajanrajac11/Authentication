import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, OAuth } from "./Index";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const create = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      reset();

      const dataGot = await res.json();
      setLoading(false);
      if (dataGot.success === false) {
        setError(true);
        return;
      }
      navigate("login");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleChange = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center p-10  ">
      <div className="mx-auto w-96 max-w-lg bg-gray-200 rounded-xl p-10 border border-gray-200 ">
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">
          Sign up to create account
        </h2>

        {error && <p className="text-red-600  mt-8 text-center">{error}</p>}

        <form
          onSubmit={(e) => {
            handleSubmit((data) => create(data, e))(e);
          }}
        >
          <div className="space-y-5">
            <Input
              label="Username: "
              id="username"
              placeholder="Enter your name"
              className="w-full p-2 rounded-md text-md"
              {...register("name", {
                required: true,
              })}
              onChange={handleChange}
            />
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
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 rounded-md text-md"
              {...register("password", {
                required: true,
              })}
              onChange={handleChange}
            />
            <OAuth />
            <Input
              type="submit"
              disabled={loading}
              value={loading ? "loading" : "Create Account"}
              className="cursor-pointer bg-slate-700 text-white p-2 rounded-xl hover:opacity-90 w-full"
            />
          </div>
        </form>
        <div className="mt-5">
          Have an account?
          <span className="text-blue-700 underline">
            <Link to="/login">SignIn</Link>
          </span>
        </div>
        <div className="text-red-500">
          {" "}
          {error && <p>Something went wrong!</p>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
