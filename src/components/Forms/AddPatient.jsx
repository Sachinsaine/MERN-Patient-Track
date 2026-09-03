import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const AddPatient = () => {
  const patientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    // gender: z.string().min(1, "Gender is required"),
    // age: z.coerce
    //   .number()
    //   .int("Age must be a whole number")
    //   .min(1, "Age must be greater than 1")
    //   .max(120, "Age must be less than or equal to 120"),
    // date_of_birth: z.string().min(1, "Date of birth is required"),
    // phone_number: z.string().min(10, "Enter valid phone number"),
    // emergency_contact: z.string().min(10, "Enter valid emergency number"),
    // insurance_type: z.string().min(1, "Insurance type is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" {...register("name")} />
        {errors.name && <div>{errors.name.message}</div>}
      </div>
      <button type="submit">sumbit</button>
    </form>
  );
};
