import { Dialog, DialogTitle } from "@mui/material";
import styles from "./editProfile.module.css";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../context/PatientContext";

export const EditProfile = ({ open, close, patient }) => {
  const { setSelectedPatient } = useContext(PatientContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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

  // Fill form with existing patient data
  useEffect(() => {
    if (patient) {
      reset({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
        date_of_birth: patient.date_of_birth || "",
        phone_number: patient.phone_number || "",
        emergency_contact: patient.emergency_contact || "",
        profile_picture: undefined,
        insurance_type: patient.insurance_type || "",
      });
    }
  }, [patient, reset]);

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("date_of_birth", data.date_of_birth);
      formData.append("phone_number", data.phone_number);
      formData.append("emergency_contact", data.emergency_contact);
      formData.append("insurance_type", data.insurance_type);

      if (data.profile_picture?.[0]) {
        formData.append("profile_picture", data.profile_picture[0]);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/patient/${patient._id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update patient information");
      }

      const updatedPatientData = await response.json();
      setSelectedPatient(updatedPatientData);
      console.log("Updated patient:", updatedPatientData);

      close();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: styles.dialogPaper,
      }}
    >
      <DialogTitle className={styles.dialogTitle}>
        Edit Patient Profile
      </DialogTitle>

      <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
        <div className={styles.formGrid}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label>Name</label>

            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && <small>{errors.name.message}</small>}
          </div>

          {/* Age */}
          <div className={styles.formGroup}>
            <label>Age</label>

            <input
              type="number"
              {...register("age", {
                required: "Age is required",
              })}
            />

            {errors.age && <small>{errors.age.message}</small>}
          </div>

          {/* Gender */}
          <div className={styles.formGroup}>
            <label>Gender</label>

            <select
              {...register("gender", {
                required: "Gender is required",
              })}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {errors.gender && <small>{errors.gender.message}</small>}
          </div>

          {/* Date of Birth */}
          <div className={styles.formGroup}>
            <label>Date of Birth</label>

            <input
              type="date"
              {...register("date_of_birth", {
                required: "Date of birth is required",
              })}
            />

            {errors.date_of_birth && (
              <small>{errors.date_of_birth.message}</small>
            )}
          </div>

          {/* Phone Number */}
          <div className={styles.formGroup}>
            <label>Phone Number</label>

            <input
              type="text"
              {...register("phone_number", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />

            {errors.phone_number && (
              <small>{errors.phone_number.message}</small>
            )}
          </div>

          {/* Emergency Contact */}
          <div className={styles.formGroup}>
            <label>Emergency Contact</label>

            <input
              type="text"
              {...register("emergency_contact", {
                required: "Emergency contact is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Emergency contact must be 10 digits",
                },
              })}
            />

            {errors.emergency_contact && (
              <small>{errors.emergency_contact.message}</small>
            )}
          </div>

          {/* Insurance */}
          <div className={styles.formGroup}>
            <label>Insurance Type</label>

            <input
              type="text"
              {...register("insurance_type", {
                required: "Insurance type is required",
              })}
            />

            {errors.insurance_type && (
              <small>{errors.insurance_type.message}</small>
            )}
          </div>

          {/* Profile Picture */}
          <div className={styles.profileGroup}>
            <label>Profile Picture</label>

            <img
              className={styles.profileImage}
              src={patient?.profile_picture}
              alt={patient?.name}
            />

            <input
              type="file"
              accept="image/*"
              {...register("profile_picture")}
            />

            {errors.profile_picture && (
              <small>{errors.profile_picture.message}</small>
            )}
          </div>
        </div>

        <div className={styles.formFooter}>
          <button type="button" className={styles.cancelButton} onClick={close}>
            Cancel
          </button>

          <button type="submit" className={styles.submitButton}>
            Update
          </button>
        </div>
      </form>
    </Dialog>
  );
};
