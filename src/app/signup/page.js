"use client";
import React, { useEffect, useState } from "react";
import "@/styles/login.scss";
import Button from "../components/button/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signUp = () => {
  const router = useRouter();
  const [inpData, setInpData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    confirmPassword: "",
    profileImg: null, // Initialize as null
  });
  const [matchPassword, setMatchPassword] = useState(true);

  useEffect(() => {
    // Match password logic
    setMatchPassword(
      inpData.password === inpData.confirmPassword ||
        inpData.confirmPassword === ""
    );
  }, [inpData.password, inpData.confirmPassword]); // Add dependencies

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImg" && files) {
      setInpData((prev) => ({
        ...prev,
        [name]: files[0], // Save file object for profileImg
      }));
    } else {
      setInpData((prev) => ({
        ...prev,
        [name]: value, // Save text input values
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();
      for (const key in inpData) {
        register_form.append(key, inpData[key]);
      }

      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: register_form,
      });


      if (response.ok) {
        router.push("/login"); // Redirect to login
      }
    } catch (err) {
      console.error("Sign Up Failed", err.message);
    }
  };

  return (
    <div className="register">
      <h1 className="heading">Sign Up</h1>
      <div className="register_content">
        <form>
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={inpData.firstName}
            required
          />
          <input
            placeholder="Last Name"
            value={inpData.lastName}
            type="text"
            onChange={handleChange}
            name="lastName"
            required
          />
          <input
            placeholder="Email"
            value={inpData.email}
            onChange={handleChange}
            type="email"
            name="email"
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={inpData.password}
            onChange={handleChange}
            name="password"
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={inpData.confirmPassword}
            required
          />
          {!matchPassword && (
            <p style={{ color: "red" }}>Passwords do not match!</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={handleChange}
            required
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <img src="/assets/upload.png" alt="Upload" />
            <p>Upload Your Photo</p>
          </label>
          {inpData.profileImg && (
            <img
              src={URL.createObjectURL(inpData.profileImg)}
              alt="Profile Preview"
              style={{
                width: "60px",
                height: "50px",
                borderRadius: "30px",
                objectFit: "cover", // Ensure image fits nicely
              }}
            />
          )}
          <Button
            onClick={handleSubmit}
            disabled={!matchPassword}
            children={"Register"}
          />
        </form>
        <div className="logindiv">
          <Link href="/login" className="logina">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signUp;
