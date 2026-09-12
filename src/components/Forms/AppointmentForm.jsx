import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiClock,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import styles from "./appointment.module.css";
import { useAppointments } from "../../hooks/useAppointments";
import { toast } from "react-toastify";

const appointmentSchema = z.object({
  patient: z.string().trim().min(3, "Patient is required"),

  date: z.string().min(1, "Date is required"),

  time: z.string().min(1, "Time is required"),

  type: z.string().min(1, "Appointment type is required"),

  doctor: z.string().min(1, "Doctor is required"),

  status: z.string().min(1, "Status is required"),

  duration: z.coerce.number().min(1, "Duration is required"),
});

export const AppointmentForm = () => {
  const { setAppointments } = useAppointments();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentSchema),

    defaultValues: {
      patient: "",
      date: "",
      time: "",
      type: "",
      doctor: "",
      status: "",
      duration: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add appointment");
      }

      const newAppointment = await response.json();

      setAppointments((prev) => [...prev, newAppointment]);

      toast.success("Appointment added successfully!");

      reset();
    } catch (error) {
      console.log("Error:", error);

      toast.error("Failed to add appointment!");
    }
  };

  return (
    <main className={styles.page}>
      {/* Page Header */}

      <div className={styles.pageHeader}>
        <div>
          <Link to="/" className={styles.backButton}>
            <FiArrowLeft size={18} />
            Back to Overview
          </Link>

          <h1>Add New Appointment</h1>

          <p>Enter the appointment information to create a new appointment.</p>
        </div>
      </div>

      {/* Form Card */}

      <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
        {/* Appointment Information */}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiCalendar size={20} />
            </div>

            <div>
              <h2>Appointment Information</h2>

              <p>Basic information about the appointment</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            {/* Patient */}

            <div className={styles.formGroup}>
              <label>
                Patient Name
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiUser size={18} />

                <input
                  type="text"
                  placeholder="Enter patient's name"
                  {...register("patient")}
                  className={errors.patient ? styles.errorInput : ""}
                />
              </div>

              {errors.patient && <small>{errors.patient.message}</small>}
            </div>

            {/* Doctor */}

            <div className={styles.formGroup}>
              <label>
                Doctor
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiUserCheck size={18} />

                <input
                  type="text"
                  placeholder="Enter doctor's name"
                  {...register("doctor")}
                  className={errors.doctor ? styles.errorInput : ""}
                />
              </div>

              {errors.doctor && <small>{errors.doctor.message}</small>}
            </div>

            {/* Date */}

            <div className={styles.formGroup}>
              <label>
                Appointment Date
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiCalendar size={18} />

                <input
                  type="date"
                  {...register("date")}
                  className={errors.date ? styles.errorInput : ""}
                />
              </div>

              {errors.date && <small>{errors.date.message}</small>}
            </div>

            {/* Time */}

            <div className={styles.formGroup}>
              <label>
                Appointment Time
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiClock size={18} />

                <input
                  type="time"
                  {...register("time")}
                  className={errors.time ? styles.errorInput : ""}
                />
              </div>

              {errors.time && <small>{errors.time.message}</small>}
            </div>

            {/* Appointment Type */}

            <div className={styles.formGroup}>
              <label>
                Appointment Type
                <span>*</span>
              </label>

              <select
                {...register("type")}
                className={errors.type ? styles.errorInput : ""}
              >
                <option value="">Select appointment type</option>

                <option value="Consultation">Consultation</option>

                <option value="Follow-up">Follow-up</option>

                <option value="Check-up">Check-up</option>

                <option value="Emergency">Emergency</option>

                <option value="Procedure">Procedure</option>
              </select>

              {errors.type && <small>{errors.type.message}</small>}
            </div>

            {/* Duration */}

            <div className={styles.formGroup}>
              <label>
                Duration
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiClock size={18} />

                <input
                  type="number"
                  min="1"
                  placeholder="Duration in minutes"
                  {...register("duration")}
                  className={errors.duration ? styles.errorInput : ""}
                />
              </div>

              {errors.duration && <small>{errors.duration.message}</small>}
            </div>

            {/* Status */}

            <div className={styles.formGroup}>
              <label>
                Status
                <span>*</span>
              </label>

              <select
                {...register("status")}
                className={errors.status ? styles.errorInput : ""}
              >
                <option value="">Select status</option>

                <option value="Scheduled">Scheduled</option>

                <option value="Confirmed">Confirmed</option>

                <option value="Completed">Completed</option>

                <option value="Cancelled">Cancelled</option>
              </select>

              {errors.status && <small>{errors.status.message}</small>}
            </div>
          </div>
        </section>

        <div className={styles.formFooter}>
          <Link to="/schedule" className={styles.cancelButton}>
            Cancel
          </Link>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <FiCheck size={18} />

            {isSubmitting ? "Adding Appointment..." : "Add Appointment"}
          </button>
        </div>
      </form>
    </main>
  );
};
