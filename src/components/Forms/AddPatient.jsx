import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const patientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  age: z.coerce
    .number()
    .int("Age must be whole number")
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      emergency_contact: "",
      profile_picture: "",
      insurance_type: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" {...register("name")} placeholder="name" />
        {errors.name && <div>{errors.name.message}</div>}
      </div>
      <div>
        <input type="number" {...register("age")} placeholder="age" />
        {errors.age && <div>{errors.age.message}</div>}
      </div>
      <div>
        <select {...register("gender")} placeholder="gender">
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <div>{errors.gender.message}</div>}
      </div>
      <div>
        <input type="date" {...register("date_of_birth")} placeholder="age" />
        {errors.date_of_birth && <div>{errors.date_of_birth.message}</div>}
      </div>
      <div>
        <input type="file" accept="image/*" {...register("profile_picture")} />
        {errors.profile_picture && <div>{errors.profile_picture.message}</div>}
      </div>
      <div>
        <input
          type="tel"
          {...register("phone_number")}
          placeholder="Phone number"
        />
        {errors.phone_number && <div>{errors.phone_number.message}</div>}
      </div>
      <div>
        <input
          type="tel"
          {...register("emergency_contact")}
          placeholder="Emergency contact"
        />
        {errors.emergency_contact && (
          <div>{errors.emergency_contact.message}</div>
        )}
      </div>
      <div>
        <input
          type="text"
          {...register("insurance_type")}
          placeholder="Insurance type"
        />
        {errors.insurance_type && <div>{errors.insurance_type.message}</div>}
      </div>
      <button type="submit">sumbit</button>
    </form>
  );
};
