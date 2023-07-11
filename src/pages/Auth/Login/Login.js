import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firbase';
import { useAuthContext } from '../../../context/AuthContext';
import './login.scss';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

const initialState = { email: "", password: "" };

function Login() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }))
  }

  const { setIsAuthenticated } = useAuthContext();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state)

    const { email, password } = state

    setIsProcessing(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user is logged in");
        setIsAuthenticated(true)
        navigate('/')
        window.toastify("You are logged in", "success")
        setIsProcessing(false)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.toastify("Something went wrong while log in", "error")
        setIsProcessing(false)
      });
  }

  return (
    <div className='todo d-flex  justify-content-center align-items-center'  >

      <div className="card mx-auto p-4 mt-5" style={{ width: 400, backgroundColor: "rgba(54, 53, 53, 0.5)" }}>
        <div className="text-center mb-2">
          <span ><GroupRoundedIcon className='fs-1' /></span>
        </div>
        <h3 className='text-center text-white '>Login</h3>
        <div className="container mt-3">
          <div className="row">
            <div className="col">

              <form>

                <div class="form-outline mb-3 m">
                  <label class="form-label" for="form6Example3">Email</label>
                  <input type="text" name='email' id="title" class="form-control" onChange={handleChange} />
                </div>

                <div class="form-outline mb-3">
                  <label class="form-label" for="form6Example4">Password</label>
                  <input type="password" name='password' id="location" class="form-control" onChange={handleChange} />
                </div>

                <div className='text-center '>
                  <button onClick={handleSubmit} disabled={isProcessing} type="submit" class="btn btn-secondary mt-1  mb-1 w-50 me-2" style={{ backgroundColor: "1D1D1D", color: "white" }}>
                    {
                      !isProcessing
                        ? "Login"
                        : <div className="spinner-border spinner-border-sm"></div>
                    }</button>
                </div>

                <div className="text-center mt-4">
                  <Link className='text-decoration-none text-center me-3 col-12 text-white' to='/auth/signup'>Not have an account</Link>
                  <Link className='text-decoration-none text-center text-white col-12' to='/auth/forgot'>Forgot Password</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;