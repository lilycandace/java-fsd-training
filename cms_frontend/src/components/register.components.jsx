
import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
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

      }

      else {

         setRegister({

            ...register,

            [name]: value

         });

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

      <div className="container mt-5">
         <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">FirstName:</label>
            <input type="text" className="form-control" name="firstName" placeholder="Enter your First Name "
               value={register.firstName}
               onChange={handleChange} />

            <label htmlFor="lastName">LastName:</label>
            <input type="text" className="form-control" name="lastName" placeholder="Enter your Last Name "
               value={register.lastName}
               onChange={handleChange} />

            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your Email Id "
               value={register.email}
               onChange={handleChange} />

            <label htmlFor="phone" className="mt-3">Phone Number:</label>
            <input type="number" className="form-control" name="phone" placeholder="Enter your phone number"
               value={register.phone}
               onChange={handleChange} />
             <label htmlFor="dob" className="mt-3">Date of Birth</label>
         <input type="date" className="form-control" name="dob" placeholder="Enter your date of birth" 
            value={register.dob}
            onChange={handleChange} />


            <label htmlFor="address" >Address</label>
            <textarea

               className="form-control"

               rows="3"

               name="address"

               placeholder="Enter your address"

               value={register.address}

               onChange={handleChange}

            />
            <label htmlFor="aadharNo" >Aadhar No:</label>

            <input

               type="text"

               className="form-control"

               name="aadhaarNo"

               placeholder="Enter aadhar Number"

               value={register.aadhaarNo}

               onChange={handleChange}

            />
             <label htmlFor="panNo" >PAN Number</label>

            <input

               type="text"

               className="form-control"

               name="panNo"

               placeholder="Enter PAN Number"

               value={register.panNo}

               onChange={handleChange}

            />

            <label>Age</label>

            <input

               type="number"

               className="form-control"

               value={register.age}

               readOnly

            />

            <label className="mt-3">Password</label>

            <input type="password"
               className="form-control"
               name="password"
               placeholder="Enter Password"
               value={register.password}
               onChange={handleChange}
            />
            <label className="mt-3">Confirm Password</label>

            <input type="password"
               className="form-control"
               name="confirmPassword"
               placeholder="Confirm Password"
               value={register.confirmPassword}
               onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
         </form>


      </div>






   )













}

