import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiShield,
  FiUpload,
  FiCheck,
  FiActivity,
  FiClipboard,
  FiFileText,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import styles from "./addpatient.module.css";
import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import { toast } from "react-toastify";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LEVEL_OPTIONS = ["Lower than Average", "Normal", "Higher than Average"];

const DIAGNOSTIC_STATUS_OPTIONS = [
  "Actively being treated",
  "Under observation",
  "Untreated",
];

const COMMON_LAB_RESULTS = [
  "Complete Blood Count (CBC)",
  "Echocardiogram",
  "Liver Function Tests",
  "Mammography",
  "Urinalysis",
  "Ultrasound",
  "Prostate-Specific Antigen (PSA)",
  "Hemoglobin A1C",
  "Lipid Panel",
  "Radiology Report",
];

const digitsOnly = (val) => (val || "").replace(/\D/g, "");

const phoneField = (message) =>
  z
    .string()
    .min(1, message)
    .refine(
      (val) => digitsOnly(val).length === 10,
      "Enter a valid 10 digit phone number",
    );

const vitalSchema = z.object({
  value: z.coerce.number({ message: "Value is required" }),
  levels: z.string().min(1, "Level is required"),
});

const diagnosisEntrySchema = z.object({
  month: z.string().min(1, "Month is required"),
  year: z.coerce
    .number({ message: "Year is required" })
    .int("Enter a valid year")
    .min(1900, "Enter a valid year")
    .max(2100, "Enter a valid year"),
  blood_pressure: z.object({
    systolic: vitalSchema,
    diastolic: vitalSchema,
  }),
  heart_rate: vitalSchema,
  respiratory_rate: vitalSchema,
  temperature: vitalSchema,
});

const diagnosticListItemSchema = z.object({
  name: z.string().min(1, "Condition name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().min(1, "Status is required"),
});

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

  phone_number: phoneField("Phone number is required"),

  emergency_contact: phoneField("Emergency number is required"),

  profile_picture: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "Only image files are allowed",
    ),

  insurance_type: z.string().trim().min(1, "Insurance provider is required"),

  diagnosis_history: z
    .array(diagnosisEntrySchema)
    .min(1, "Add at least one vitals entry"),

  diagnostic_list: z.array(diagnosticListItemSchema).default([]),

  lab_results: z.array(z.string()).default([]),

  custom_lab_results: z
    .array(z.object({ value: z.string().min(1, "Enter a test name") }))
    .default([]),
});

const emptyVital = { value: "", levels: "" };

const emptyDiagnosisEntry = {
  month: "",
  year: new Date().getFullYear(),
  blood_pressure: { systolic: { ...emptyVital }, diastolic: { ...emptyVital } },
  heart_rate: { ...emptyVital },
  respiratory_rate: { ...emptyVital },
  temperature: { ...emptyVital },
};

const emptyDiagnosticItem = { name: "", description: "", status: "" };

export const AddPatient = () => {
  const { setPatients, loading, error } = useContext(PatientContext);
  const {
    register,
    control,
    handleSubmit,
    reset,
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
      diagnosis_history: [emptyDiagnosisEntry],
      diagnostic_list: [],
      lab_results: [],
      custom_lab_results: [],
    },
  });

  const {
    fields: diagnosisFields,
    append: appendDiagnosis,
    remove: removeDiagnosis,
  } = useFieldArray({ control, name: "diagnosis_history" });

  const {
    fields: diagnosticFields,
    append: appendDiagnostic,
    remove: removeDiagnostic,
  } = useFieldArray({ control, name: "diagnostic_list" });

  const {
    fields: customLabFields,
    append: appendCustomLab,
    remove: removeCustomLab,
  } = useFieldArray({ control, name: "custom_lab_results" });

  const onSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("age", data.age);
    formdata.append("gender", data.gender);
    formdata.append("date_of_birth", data.date_of_birth);
    formdata.append("phone_number", digitsOnly(data.phone_number));
    formdata.append("emergency_contact", digitsOnly(data.emergency_contact));
    formdata.append("profile_picture", data.profile_picture[0]);
    formdata.append("insurance_type", data.insurance_type);

    const labResults = [
      ...data.lab_results,
      ...data.custom_lab_results
        .map((item) => item.value.trim())
        .filter(Boolean),
    ];

    formdata.append(
      "diagnosis_history",
      JSON.stringify(data.diagnosis_history),
    );
    formdata.append("diagnostic_list", JSON.stringify(data.diagnostic_list));
    formdata.append("lab_results", JSON.stringify(labResults));

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

      toast.success("Patient added successfully!");
      setPatients((prev) => [...prev, patientData]);

      reset();
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to add patient!");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main className={styles.page}>
      <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
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
            <div className={styles.formGroup}>
              <label>
                Phone Number
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiPhone size={18} />

                <input
                  type="tel"
                  placeholder="e.g. (711) 984-6696"
                  {...register("phone_number")}
                />
              </div>

              {errors.phone_number && (
                <small>{errors.phone_number.message}</small>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                Emergency Contact
                <span>*</span>
              </label>

              <div className={styles.inputWithIcon}>
                <FiPhone size={18} />

                <input
                  type="tel"
                  placeholder="e.g. (680) 653-9512"
                  {...register("emergency_contact")}
                />
              </div>

              {errors.emergency_contact && (
                <small>{errors.emergency_contact.message}</small>
              )}
            </div>
          </div>
        </section>

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
                Insurance Provider
                <span>*</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Premier Auto Corporation"
                {...register("insurance_type")}
                className={errors.insurance_type ? styles.errorInput : ""}
              />

              {errors.insurance_type && (
                <small>{errors.insurance_type.message}</small>
              )}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiActivity size={20} />
            </div>

            <div>
              <h2>Vitals / Diagnosis History</h2>
              <p>Add one entry per recorded month</p>
            </div>
          </div>

          {errors.diagnosis_history?.root && (
            <small className={styles.uploadError}>
              {errors.diagnosis_history.root.message}
            </small>
          )}

          {diagnosisFields.map((field, index) => (
            <div className={styles.arrayItem} key={field.id}>
              <div className={styles.arrayItemHeader}>
                <strong>Entry {index + 1}</strong>

                {diagnosisFields.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeDiagnosis(index)}
                  >
                    <FiTrash2 size={16} />
                    Remove
                  </button>
                )}
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>
                    Month
                    <span>*</span>
                  </label>

                  <select
                    {...register(`diagnosis_history.${index}.month`)}
                    className={
                      errors.diagnosis_history?.[index]?.month
                        ? styles.errorInput
                        : ""
                    }
                  >
                    <option value="">Select month</option>
                    {MONTHS.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>

                  {errors.diagnosis_history?.[index]?.month && (
                    <small>
                      {errors.diagnosis_history[index].month.message}
                    </small>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Year
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    placeholder="e.g. 2024"
                    {...register(`diagnosis_history.${index}.year`)}
                    className={
                      errors.diagnosis_history?.[index]?.year
                        ? styles.errorInput
                        : ""
                    }
                  />

                  {errors.diagnosis_history?.[index]?.year && (
                    <small>
                      {errors.diagnosis_history[index].year.message}
                    </small>
                  )}
                </div>
              </div>

              <p className={styles.vitalGroupLabel}>Blood Pressure</p>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>
                    Systolic
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    placeholder="Value"
                    {...register(
                      `diagnosis_history.${index}.blood_pressure.systolic.value`,
                    )}
                  />

                  <select
                    {...register(
                      `diagnosis_history.${index}.blood_pressure.systolic.levels`,
                    )}
                  >
                    <option value="">Select level</option>
                    {LEVEL_OPTIONS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Diastolic
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    placeholder="Value"
                    {...register(
                      `diagnosis_history.${index}.blood_pressure.diastolic.value`,
                    )}
                  />

                  <select
                    {...register(
                      `diagnosis_history.${index}.blood_pressure.diastolic.levels`,
                    )}
                  >
                    <option value="">Select level</option>
                    {LEVEL_OPTIONS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>
                    Heart Rate (bpm)
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    placeholder="Value"
                    {...register(`diagnosis_history.${index}.heart_rate.value`)}
                  />

                  <select
                    {...register(
                      `diagnosis_history.${index}.heart_rate.levels`,
                    )}
                  >
                    <option value="">Select level</option>
                    {LEVEL_OPTIONS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Respiratory Rate (breaths/min)
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    placeholder="Value"
                    {...register(
                      `diagnosis_history.${index}.respiratory_rate.value`,
                    )}
                  />

                  <select
                    {...register(
                      `diagnosis_history.${index}.respiratory_rate.levels`,
                    )}
                  >
                    <option value="">Select level</option>
                    {LEVEL_OPTIONS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Temperature (°F)
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    placeholder="Value"
                    {...register(
                      `diagnosis_history.${index}.temperature.value`,
                    )}
                  />

                  <select
                    {...register(
                      `diagnosis_history.${index}.temperature.levels`,
                    )}
                  >
                    <option value="">Select level</option>
                    {LEVEL_OPTIONS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addButton}
            onClick={() => appendDiagnosis(emptyDiagnosisEntry)}
          >
            <FiPlus size={16} />
            Add another month
          </button>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiClipboard size={20} />
            </div>

            <div>
              <h2>Diagnostic List</h2>
              <p>Known or suspected conditions</p>
            </div>
          </div>

          {diagnosticFields.map((field, index) => (
            <div className={styles.arrayItem} key={field.id}>
              <div className={styles.arrayItemHeader}>
                <strong>Condition {index + 1}</strong>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeDiagnostic(index)}
                >
                  <FiTrash2 size={16} />
                  Remove
                </button>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>
                    Condition Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Type 2 Diabetes"
                    {...register(`diagnostic_list.${index}.name`)}
                    className={
                      errors.diagnostic_list?.[index]?.name
                        ? styles.errorInput
                        : ""
                    }
                  />

                  {errors.diagnostic_list?.[index]?.name && (
                    <small>{errors.diagnostic_list[index].name.message}</small>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Status
                    <span>*</span>
                  </label>

                  <select
                    {...register(`diagnostic_list.${index}.status`)}
                    className={
                      errors.diagnostic_list?.[index]?.status
                        ? styles.errorInput
                        : ""
                    }
                  >
                    <option value="">Select status</option>
                    {DIAGNOSTIC_STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  {errors.diagnostic_list?.[index]?.status && (
                    <small>
                      {errors.diagnostic_list[index].status.message}
                    </small>
                  )}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>
                    Description
                    <span>*</span>
                  </label>

                  <textarea
                    rows={2}
                    placeholder="Brief description of the condition"
                    {...register(`diagnostic_list.${index}.description`)}
                    className={
                      errors.diagnostic_list?.[index]?.description
                        ? styles.errorInput
                        : ""
                    }
                  />

                  {errors.diagnostic_list?.[index]?.description && (
                    <small>
                      {errors.diagnostic_list[index].description.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addButton}
            onClick={() => appendDiagnostic(emptyDiagnosticItem)}
          >
            <FiPlus size={16} />
            Add condition
          </button>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <FiFileText size={20} />
            </div>

            <div>
              <h2>Lab Results</h2>
              <p>Select any tests on file, or add your own</p>
            </div>
          </div>

          <div className={styles.checkboxGrid}>
            {COMMON_LAB_RESULTS.map((test) => (
              <label className={styles.checkboxItem} key={test}>
                <input
                  type="checkbox"
                  value={test}
                  {...register("lab_results")}
                />
                {test}
              </label>
            ))}
          </div>

          {customLabFields.map((field, index) => (
            <div className={styles.arrayItem} key={field.id}>
              <div className={styles.formGroup}>
                <label>Custom Test Name</label>

                <div className={styles.customLabRow}>
                  <input
                    type="text"
                    placeholder="e.g. Vitamin D Test"
                    {...register(`custom_lab_results.${index}.value`)}
                  />

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeCustomLab(index)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                {errors.custom_lab_results?.[index]?.value && (
                  <small>
                    {errors.custom_lab_results[index].value.message}
                  </small>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addButton}
            onClick={() => appendCustomLab({ value: "" })}
          >
            <FiPlus size={16} />
            Add custom test
          </button>
        </section>

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
