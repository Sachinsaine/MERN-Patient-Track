import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./login.module.css";
import logo from "../../assets/Logo.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLock } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean().optional(),
});

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
          }),
        },
      );

      const result = await response.json();

      console.log("LOGIN RESPONSE:", result);

      if (!response.ok) {
        alert(result.message);
        return;
      }

      await checkAuth();

      reset();

      navigate("/overview", {
        replace: true,
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.loginPage}>
      <img src={logo} alt="Patient Track" className={styles.logoImg} />

      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>
          <p>Sign in to Patient Track</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
              <small className={styles.errorMessage}>
                {errors.email.message}
              </small>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={errors.password ? styles.errorInput : ""}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <small className={styles.errorMessage}>
                {errors.password.message}
              </small>
            )}
          </div>

          <div className={styles.loginOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" {...register("rememberMe")} />

              <span>Remember me</span>
            </label>

            <button
              type="button"
              className={styles.forgotPassword}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className={styles.signupText}>
          Don't have an account?{" "}
          <button
            type="button"
            className={styles.signupLink}
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </p>

        <p className={styles.securityText}>
          <FaLock /> <span>Secure access to Patient Track</span>
        </p>
      </div>
    </div>
  );
};
