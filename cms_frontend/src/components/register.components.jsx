
import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
export default function Register() {


   const [register, setRegister] = useState({

      firstName: "",
      middleName: "",
      lastName: "",

      email: "",

      password: "",
      confirmPassword: "",

      phone: "",

      address: "",

      dob: "",

      age: "",

      aadhaarNo: "",

      panNo: "",

      roleId: 1,

   });
   const [errors, setErrors] = useState({});
   const validateField = (name, value) => {

      let error = "";

      switch (name) {

         case "firstName":

         case "middleName":

         case "lastName":

            if (!value.trim()) {

               error = "This field is required";

            }

            else if (!/^[A-Za-z ]+$/.test(value)) {

               error = "Only alphabets are allowed";

            }

            break;

         case "email":

            if (!value.trim()) {

               error = "Email is required";

            }

            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

               error = "Invalid email address";

            }

            break;

         case "password":

            if (!value.trim()) {

               error = "Password is required";

            }

            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)) {

               error = "Minimum 8 characters with uppercase, lowercase, number and special character";

            }

            break;

         case "confirmPassword":

            if (value !== register.password) {

               error = "Passwords do not match";

            }

            break;

         case "phone":

            if (!/^[6-9]\d{9}$/.test(value)) {

               error = "Enter a valid 10-digit phone number";

            }

            break;

         case "aadhaarNo":

            if (!/^\d{12}$/.test(value)) {

               error = "Aadhaar must contain 12 digits";

            }

            break;

         case "panNo":

            if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {

               error = "Invalid PAN number";

            }

            break;

         case "address":

            if (value.trim().length < 10) {

               error = "Address must contain at least 10 characters";

            }

            break;

         case "dob":

            if (!value) {

               error = "Date of Birth is required";

            }

            else if (new Date(value) > new Date()) {

               error = "Invalid Date of Birth";

            }

            break;

      }

      setErrors(prev => ({

         ...prev,

         [name]: error

      }));

   };

   const calculateAge = (dob) => {

      const birthDate = new Date(dob);

      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();

      const month = today.getMonth() - birthDate.getMonth();

      if (
         month < 0 ||
         (month === 0 && today.getDate() < birthDate.getDate())
      ) {
         age--;
      }

      return age;

   };


   const handleChange = (e) => {

      const { name, value } = e.target;

      if (name === "dob") {

         setRegister({

            ...register,

            dob: value,

            age: calculateAge(value)

         });
            validateField(name, value);

      }

      else {

         setRegister({

            ...register,

            [name]: value

         });
          validateField(name, value);


      }

   };
   const navigate = useNavigate();

   const handleSubmit = (e) => {

      e.preventDefault();

      // console.log(register);
      console.log(JSON.stringify(register, null, 2));
      AuthService.register(register)
         .then((response) => {

            console.log(response.data);

            alert("Registration Successful!");

            navigate("/login");   // or "/" if you want to go to Home

         })
         .catch((error) => {

            console.log(error);

            alert(error.response?.data || "Registration Failed");

         });

   };



   return (
      <div className="register-page">
      <div className="container mt-5">
            <div className="register-card">
         <form className="form1" onSubmit={handleSubmit}>
            <label htmlFor="firstName">FirstName:</label>
            <input type="text" className={`form-control ${errors.firstName?"is-invalid":""}`}
             name="firstName" placeholder="Enter your First Name "
               value={register.firstName}
               onChange={handleChange} />
                <div className="invalid-feedback">

                    {errors.firstName}

                </div>


            <label htmlFor="lastName">LastName:</label>
            <input type="text" className={`form-control ${errors.lastName?"is-invalid":""}`} name="lastName" placeholder="Enter your Last Name "
               value={register.lastName}
               onChange={handleChange} />
                 <div className="invalid-feedback">

                    {errors.lastName}

                </div>

            <label htmlFor="email">Email:</label>
            <input type="email" className={`form-control ${errors.email?"is-invalid":""}`} name="email" placeholder="Enter your Email Id "
               value={register.email}
               onChange={handleChange} />
                 <div className="invalid-feedback">

                    {errors.email}

                </div>

            <label htmlFor="phone" className="mt-3">Phone Number:</label>
            <input type="number" className={`form-control ${errors.phone?"is-invalid":""}`} name="phone" placeholder="Enter your phone number"
               value={register.phone}
               onChange={handleChange} />
               <div className="invalid-feedback">

                    {errors.phone}

                </div>
            <label htmlFor="dob" className="mt-3">Date of Birth</label>
            <input type="date" className={`form-control ${errors.dob?"is-invalid":""}`} name="dob" placeholder="Enter your date of birth"
               value={register.dob}
               onChange={handleChange} />
                <div className="invalid-feedback">

                    {errors.dob}

                </div>



            <label htmlFor="address" >Address</label>
            <textarea

               className={`form-control ${errors.address?"is-invalid":""}`}

               rows="3"

               name="address"

               placeholder="Enter your address"

               value={register.address}

               onChange={handleChange}

            />
             <div className="invalid-feedback">

                    {errors.address}

                </div>
            <label htmlFor="aadharNo" >Aadhar No:</label>

            <input

               type="text"

               className={`form-control ${errors.aadhaarNo?"is-invalid":""}`}

               name="aadhaarNo"

               placeholder="Enter aadhar Number"

               value={register.aadhaarNo}

               onChange={handleChange}

            />
            <div className="invalid-feedback">

                    {errors.aadhaarNo}

                </div>
            <label htmlFor="panNo" >PAN Number</label>

            <input

               type="text"

                className={`form-control ${errors.panNo?"is-invalid":""}`}

               name="panNo"

               placeholder="Enter PAN Number"

               value={register.panNo}

               onChange={handleChange}

            />
             <div className="invalid-feedback">

                    {errors.panNo}

                </div>


            <label>Age</label>

            <input

               type="number"

               className="form-control"

               value={register.age}

               readOnly

            />

            <label className="mt-3">Password</label>

            <input type="password"
               className={`form-control ${errors.password?"is-invalid":""}`}
               name="password"
               placeholder="Enter Password"
               value={register.password}
               onChange={handleChange}
            />
              <div className="invalid-feedback">

                    {errors.password}

                </div>
            <label className="mt-3">Confirm Password</label>

            <input type="password"
               className={`form-control ${errors.confirmPassword?"is-invalid":""}`}
               name="confirmPassword"
               placeholder="Confirm Password"
               value={register.confirmPassword}
               onChange={handleChange}
            />
            <div className="invalid-feedback">

                    {errors.confirmPassword}

                </div>

            <button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
         </form>
         </div></div>

      </div>






   )













}

