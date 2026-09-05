import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiShield,
  FiUpload,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import styles from "./addpatient.module.css";

const patientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),

  age: z.coerce
    .number({
      message: "Age is required",
    })
    .int("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than or equal to 120"),

  gender: z.string().min(1, "Gender is required"),

  date_of_birth: z.string().min(1, "Date of birth is required"),

  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Enter valid 10 digit phone number"),

  emergency_contact: z
    .string()
    .min(1, "Emergency number is required")
    .regex(/^\d{10}$/, "Enter valid 10 digit number"),

  profile_picture: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "Only image files are allowed",
    ),

  insurance_type: z.string().min(1, "Insurance type is required"),
});

export const AddPatient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(patientSchema),

    defaultValues: {
      name: "",
      age: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      emergency_contact: "",
      profile_picture: undefined,
      insurance_type: "",
    },
  });

  const onSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("age", data.age);
    formdata.append("gender", data.gender);
    formdata.append("date_of_birth", data.date_of_birth);
    formdata.append("phone_number", data.phone_number);
    formdata.append("emergency_contact", data.emergency_contact);
    formdata.append("profile_picture", data.profile_picture[0]);
    formdata.append("insurance_type", data.insurance_type);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/patient`,
        {
          method: "POST",
          body: formdata,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      const patientData = await response.json();

      console.log("Patient Added:", patientData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <Link to="/" className={styles.backButton}>
            <FiArrowLeft size={18} />
            Back to Overview
          </Link>

          <h1>Add New Patient</h1>

          <p>Enter the patient's information to create a new patient record.</p>
        </div>
      </div>

      {/* Form Card */}
      <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiUser size={20} />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>Basic information about the patient</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            {/* Name */}
            <div className={styles.formGroup}>
              <label>
                Full Name
                <span>*</span>
              </label>

              <input
                type="text"
                placeholder="Enter patient's full name"
                {...register("name")}
                className={errors.name ? styles.errorInput : ""}
              />

              {errors.name && <small>{errors.name.message}</small>}
            </div>

            {/* Age */}
            <div className={styles.formGroup}>
              <label>
                Age
                <span>*</span>
              </label>

              <input
                type="number"
                placeholder="Enter age"
                {...register("age")}
                className={errors.age ? styles.errorInput : ""}
              />

              {errors.age && <small>{errors.age.message}</small>}
            </div>

            {/* Gender */}
            <div className={styles.formGroup}>
              <label>
                Gender
                <span>*</span>
              </label>

              <select
                {...register("gender")}
                className={errors.gender ? styles.errorInput : ""}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {errors.gender && <small>{errors.gender.message}</small>}
            </div>

            {/* DOB */}
            <div className={styles.formGroup}>
              <label>
                Date of Birth
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiCalendar size={18} />

                <input type="date" {...register("date_of_birth")} />
              </div>

              {errors.date_of_birth && (
                <small>{errors.date_of_birth.message}</small>
              )}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiPhone size={20} />
            </div>

            <div>
              <h2>Contact Information</h2>
              <p>Patient contact and emergency details</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            {/* Phone */}
            <div className={styles.formGroup}>
              <label>
                Phone Number
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiPhone size={18} />

                <input
                  type="tel"
                  placeholder="10 digit phone number"
                  maxLength="10"
                  {...register("phone_number")}
                />
              </div>

              {errors.phone_number && (
                <small>{errors.phone_number.message}</small>
              )}
            </div>

            {/* Emergency */}
            <div className={styles.formGroup}>
              <label>
                Emergency Contact
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiPhone size={18} />

                <input
                  type="tel"
                  placeholder="Emergency contact number"
                  maxLength="10"
                  {...register("emergency_contact")}
                />
              </div>

              {errors.emergency_contact && (
                <small>{errors.emergency_contact.message}</small>
              )}
            </div>
          </div>
        </section>

        {/* Insurance */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiShield size={20} />
            </div>

            <div>
              <h2>Insurance Information</h2>
              <p>Patient insurance details</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                Insurance Type
                <span>*</span>
              </label>

              <select
                {...register("insurance_type")}
                className={errors.insurance_type ? styles.errorInput : ""}
              >
                <option value="">Select insurance type</option>
                <option value="Private Insurance">Private Insurance</option>
                <option value="Medicare">Medicare</option>
                <option value="Medicaid">Medicaid</option>
                <option value="Government">Government</option>
                <option value="Self Pay">Self Pay</option>
              </select>

              {errors.insurance_type && (
                <small>{errors.insurance_type.message}</small>
              )}
            </div>
          </div>
        </section>

        {/* Profile Picture */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiUpload size={20} />
            </div>

            <div>
              <h2>Profile Picture</h2>
              <p>Upload a profile picture for the patient</p>
            </div>
          </div>

          <label className={styles.uploadBox}>
            <FiUpload size={28} />

            <strong>Click to upload image</strong>

            <span>PNG, JPG or JPEG</span>

            <input
              type="file"
              accept="image/*"
              {...register("profile_picture")}
            />
          </label>

          {errors.profile_picture && (
            <small className={styles.uploadError}>
              {errors.profile_picture.message}
            </small>
          )}
        </section>

        {/* Footer */}
        <div className={styles.formFooter}>
          <Link to="/" className={styles.cancelButton}>
            Cancel
          </Link>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <FiCheck size={18} />

            {isSubmitting ? "Adding Patient..." : "Add Patient"}
          </button>
        </div>
      </form>
    </main>
  );
};
