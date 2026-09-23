import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import styles from "./registraion.module.css";
import logo from "../../assets/Logo.png";
import { FaLock } from "react-icons/fa6";
import { toast } from "react-toastify";

const registrationSchema = z
  .object({
    name: z.string().trim().min(2, "Name is required"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter valid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const Registration = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Registration failed");
        return;
      }

      toast.success("Registration successful! Please login.");

      reset();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <img src={logo} alt="Patient Track" className={styles.logoImg} />

      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>Create Account</h1>
          <p>Sign up for Patient Track</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              className={errors.name ? styles.errorInput : ""}
            />

            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              className={errors.email ? styles.errorInput : ""}
            />

            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className={errors.password ? styles.errorInput : ""}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>

            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? styles.errorInput : ""}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className={styles.loginButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login */}
        <p className={styles.signupText}>
          Already have an account?{" "}
          <button
            type="button"
            className={styles.signupLink}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>

        {/* Security */}
        <p className={styles.securityText}>
          <FaLock /> <span>Secure access to Patient Track</span>
        </p>
      </div>
    </div>
  );
};
