import { useRef } from "react";

export const AddPatient = () => {
  const firstname = useRef();
  const lastname = useRef();
  const gender = useRef();
  const age = useRef();
  const phone = useRef();

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(firstname.current.value);
    console.log(lastname.current.value);
    console.log(age.current.value);
    console.log(gender.current.value);
    console.log(phone.current.value);
  };

  return (
    <form onSubmit={handleSumbit}>
      <div>
        <label htmlFor="">First Name</label>
        <input type="tex" placeholder="First Name" ref={firstname} />
      </div>
      <div>
        <label htmlFor=""> Last Name</label>
        <input type="tex" placeholder="Last Name" ref={lastname} />
      </div>
      <div>
        <label htmlFor="">Gender</label>
        <input type="tex" placeholder="Gender" ref={gender} />
      </div>
      <div>
        <label htmlFor="">Age</label>
        <input type="tex" placeholder="Age" ref={age} />
      </div>
      <div>
        <label htmlFor="">Phone number</label>
        <input type="tex" placeholder="Phone number" ref={phone} />
      </div>
      <button type="submit">sumbit</button>
    </form>
  );
};
