import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firbase';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

const initialState = { name: "", email: "", password: "" };


function Signup() {

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();


  const handleChange = e => {
    const { name, value } = e.target
    setState(s => ({ ...s, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault();

    console.log('state=>', state)

    const { email, password, name } = state;

    setIsProcessing(true)
    createUserWithEmailAndPassword(auth, email, password, name)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User is signed in!")
        navigate("/")
        window.toastify("Account has been created successfully!", "success")
        setIsProcessing(false)
        // console.log(userCredential)
        // console.log(user)
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.error(error);
        window.toastify("Account has not been created!", "error")
        setIsProcessing(false);
        // ..
      });

  }

  return (
    <div className='todo d-flex  justify-content-center align-items-center'  >


      <div className="card mx-auto p-4 mt-5" style={{ width: 400, backgroundColor: "rgba(54, 53, 53, 0.5)" }}>
        <div className="text-center mb-2">
          <span ><GroupRoundedIcon className='fs-1' /></span>
        </div>
        <h3 className='text-center text-white '>Signup</h3>
        <div className="container mt-3">
          <div className="row">
            <div className="col">

              <form>

                <div class="form-outline mb-3 m">
                  <label class="form-label" for="form6Example3">Full Name</label>
                  <input type="text" name='name' id="title" class="form-control" onChange={handleChange} />
                </div>

                <div class="form-outline mb-3 m">
                  <label class="form-label" for="form6Example3">Email</label>
                  <input type="email" name='email' id="title" class="form-control" onChange={handleChange} />
                </div>


                <div class="form-outline mb-3">
                  <label class="form-label" for="form6Example4">Password</label>
                  <input type="password" name='password' id="location" class="form-control" onChange={handleChange} />
                </div>

                <div className='text-center '>
                  <button onClick={handleSubmit} disabled={isProcessing} type="submit" class="btn btn-secondary mt-1  mb-1 w-50 me-2" style={{ backgroundColor: "1D1D1D", color: "white" }}>
                    {
                      !isProcessing
                        ? "Sign Up"
                        : <div className="spinner-border spinner-border-sm"></div>
                    }</button>
                </div>


                <div className="text-center mt-4">
                  <Link className='text-decoration-none text-center text-white' to='/auth/login'>Already have an account</Link>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Signup;