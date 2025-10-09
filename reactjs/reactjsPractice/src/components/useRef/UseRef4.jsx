import React, { useRef } from "react";
import { useState } from "react";

function UseRef4() {
  const [error, setErrors] = useState({});

  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const validate = () => {
    const newErrors = {};

    if (!userNameRef.current.value.trim()) {
      newErrors["username"] = "Username required!";
    }

    if (!emailRef.current.value.trim()) {
      newErrors.email = "Email required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) {
      newErrors.email = "Invalid Email";
    }

    if (!passwordRef.current.value.trim()) {
      newErrors.password = "Password required!";
    } else if (passwordRef.current.value.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPasswordRef.current.value.trim()) {
      newErrors.confirmpassword = "Confirm your password";
    } else if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //   const submit = (e) => {
  //     e.preventDefault();
  //     if (!userNameRef.current.value) {
  //       userNameRef.current.focus();
  //       return;
  //     }
  //     if (!passwordRef.current.value) {
  //       passwordRef.current.focus();
  //       return;
  //     }
  //     alert(
  //       "Form submitted! ",
  //       userNameRef.current.value,
  //       +" " + passwordRef.current.value
  //     );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={userNameRef} placeholder="Username" />
        {error.username && <span>{error.username}</span>}

        <br />
        <input type="email" ref={emailRef} placeholder="Email" />
        {error.email && <span>{error.email}</span>}

        <br />
        <input type="password" ref={passwordRef} placeholder="Password" />
        {error.password && <span>{error.password}</span>}

        <br />
        <input
          type="password"
          ref={confirmPasswordRef}
          placeholder="Confirm Password"
        />
        {error.confirmpassword && <span>{error.confirmpassword}</span>}

        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UseRef4;
