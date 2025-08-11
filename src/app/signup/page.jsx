import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "creator",
    terms: false,
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock signup logic (replace with API call)
    localStorage.setItem("user", JSON.stringify(form));

    if (form.role === "creator") {
      navigate("/creator-dashboard");
    } else {
      navigate("/agency-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-neutral-900 p-6 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700"
        >
          <option value="creator">Creator</option>
          <option value="agency">Agency</option>
        </select>

        <label className="flex items-center mb-3 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="mr-2"
          />
          I agree to the terms and conditions
        </label>

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded font-bold hover:bg-gray-300 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
