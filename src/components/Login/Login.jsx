import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./login.module.css";
import logo from "../../assets/Logo.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  password: z.string().min(6, "Password is required"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
      navigate("/overview");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.loginPage}>
      <img src={logo} alt="" className={styles.logoImg} />
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

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.password && (
              <small className={styles.errorMessage}>
                {errors.password.message}
              </small>
            )}
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
