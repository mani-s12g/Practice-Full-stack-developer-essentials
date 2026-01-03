import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Yup Schema
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).
    regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid email" }),
  age: z.coerce
    .number()
    .min(18, { message: "You must be at least 18" })
    .optional(),
});

function RHFzod() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Connect Zod schema
  });

  const onSubmitData = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div>
      <h2>RHF using zod</h2>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <div>
          <label>Name:</label>
          <input {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Age:</label>
          <input type="number" {...register("age")} />
          {errors.age && <span>{errors.age.message}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RHFzod;
