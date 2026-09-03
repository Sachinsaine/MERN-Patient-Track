import { useState } from "react";

export const AddPatient = () => {
  const [formdata, setFormdata] = useState({
    firstname: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (formdata.firstname.trim() === "") {
      errors.firstname = "Firstname is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formdata.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formdata.email)) {
      errors.email = "Enter valid email";
    }

    if (formdata.phone.trim() === "") {
      errors.phone = "Phone number is required";
    } else if (formdata.phone.length < 10) {
      errors.phone = "Enter valid phone number";
    }

    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    setFormdata({
      firstname: "",
      email: "",
      phone: "",
    });
    console.log("Form is valid:", formdata);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="firstname"
          name="firstname"
          value={formdata.firstname}
          onChange={handleOnChange}
        />
        <div style={{ color: "red" }}>{errors.firstname}</div>
      </div>
      <div>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={formdata.email}
          onChange={handleOnChange}
        />
        <div style={{ color: "red" }}>{errors.email}</div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone number"
          name="phone"
          value={formdata.phone}
          onChange={handleOnChange}
        />
        <div style={{ color: "red" }}>{errors.phone}</div>
      </div>
      <button type="submit">sumbit</button>
    </form>
  );
};
