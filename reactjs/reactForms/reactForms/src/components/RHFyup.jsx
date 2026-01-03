import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define Yup Schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  age: yup
    .number()
    .min(18, "You must be at least 18")
    .required("Age is required"),
});

function RHFyup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitData = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div>
      <h2>RHF using yup</h2>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <div>
          <label>Name:</label>
          <input {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input {...register("email")} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <label>Age:</label>
          <input type="number" {...register("age")} />
          {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RHFyup;
