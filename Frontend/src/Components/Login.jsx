import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const login = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      setLoading(false);
      setError(true);
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

        {error && <p className="text-red-600  mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
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
              placeholder="Enter your password"
              className="w-full p-2 rounded-md text-md"
              {...register("password", {
                required: true,
              })}
              onChange={handleChange}
            />
            <Input
              type="submit"
              value="Login"
              className="cursor-pointer bg-slate-700 text-white p-2 rounded-xl hover:opacity-90 w-16"
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
