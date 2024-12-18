import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Link } from "react-router-dom";

function Signup() {
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      console.log("Hello");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center p-10  ">
      <div className="mx-auto w-96 max-w-lg bg-gray-200 rounded-xl p-10 border border-gray-200 ">
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">
          Sign up to create account
        </h2>

        {error && <p className="text-red-600  mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              className="w-full p-2 rounded-md text-md"
              {...register("name", {
                required: true,
              })}
            />
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
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 rounded-md text-md"
              {...register("password", {
                required: true,
              })}
            />
            <Input
              type="submit"
              value="Create Account"
              className="cursor-pointer bg-slate-700 text-white p-2 rounded-xl hover:opacity-90"
            />
          </div>
        </form>
        <div>
          Have an account?
          <span className="text-blue-700 underline">
            <Link to="/login">SignIn</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
