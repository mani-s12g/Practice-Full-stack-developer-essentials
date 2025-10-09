import React from "react";
import { useFormStatus } from "react-dom";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return <button type="submit">{pending ? "Logging in..." : "Login"}</button>;
}

export default SubmitBtn;
