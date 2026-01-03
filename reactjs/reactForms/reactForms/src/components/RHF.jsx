import React from "react";
import { useForm } from "react-hook-form";

function RHF() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitData = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div>
      <h2>RHF</h2>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <div>
          <label>Name:</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
            })}
            placeholder="Email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RHF;
