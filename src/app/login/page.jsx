"use client";
import React, { useState } from "react";
import "@/styles/login.scss";
import Button from "../components/button/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
const login = () => {
  const router=useRouter()
  const [inpData, setInpData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    confirmPassword: "",
    profileImg: "",
  });
  const [matchPassword, setMatchpassword] = useState(true);

  // set data inp field  to state
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setInpData({
      ...inpData,
      [name]: value,
      [name]: name === "profileImg" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //match password
    if (inpData.password === inpData.confirmPassword) {
      setMatchpassword(true);
    } else {
      setMatchpassword(false);
    }

    try {

      const register_form = new FormData();

      for (var key in inpData) {
        register_form.append(key, inpData[key]);
      }

      const response = await fetch("http://localhost:3002/auth/register", {
        method: "POST",
        body: register_form,
      });
      if(response.ok){
        router("/home")
      }
    } catch (err) {
      
    }
  };

  return (
    <div className="register">
      <h1 className="heading">Login </h1>
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
            value={inpData.LastName}
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
            placeholder="Password "
            type="password"
            value={inpData.password}
            onChange={handleChange}
            name="password"
            required
          />
          <input
            placeholder="Confirm Password"
            type="Password"
            name="confirmPassword"
            onChange={handleChange}
            value={inpData.confirmPassword}
            required
          />
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
            <img src="/assets/upload.png" alt="addPhoto" />
            <p> Upload Your Photo</p>
          </label>
          {inpData.profileImg && (
            <img
              src={URL.createObjectURL(inpData.profileImg)}
              alt="profile image"
              style={{ width: "60px", height: "50px", borderRadius: "30px" }}
            />
          )}
          <Button onClick={handleSubmit} children={"Register"}></Button>
        </form>
        <div className="logindiv">
          <Link href="/login" className="logina">
            {" "}
            Already have an account ? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
