"use client";

import { useState } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Implement password reset API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <ForgotPasswordSuccess email={email} onRetry={() => setSubmitted(false)} />;
  }

  return (
    <ForgotPasswordForm
      email={email}
      setEmail={setEmail}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}
