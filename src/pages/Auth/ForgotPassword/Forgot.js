import React, {useState} from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../config/firbase';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { useNavigate } from 'react-router-dom';


const initialState = {email: ""}


function Forgot() {

  const [state, setState] = useState(initialState)
  const[isProcessing, setIsProcessing]= useState(false)
  const navigate = useNavigate();

  const handleChange = e =>{
    const {name , value}= e.target
    setState(s=>({...s, [name]: value}))
  }

  const handleSubmit = e =>{
    e.preventDefault();

    const {email} = state

    setIsProcessing(true)
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      
      window.toastify("Email has been sent!", "success")
      navigate("/auth/login")
      setIsProcessing(false)
      // ..
    })
    .catch((error) => {
      window.toastify("Email has not been sent!", "error")
      setIsProcessing(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });



  }


  return (
    <div className='todo d-flex  justify-content-center align-items-center'  >


    <div className="card mx-auto p-4 mt-5" style={{ width: 400, backgroundColor: "rgba(54, 53, 53, 0.5)" }}>
      <div className="text-center mb-2">
        <span ><GroupRoundedIcon className='fs-1' /></span>
      </div>
      <h3 className='text-center text-white '>Forgot Passwort</h3>
      <div className="container mt-3">
        <div className="row">
          <div className="col">

            <form>

              <div class="form-outline mb-3 m">
                <label class="form-label" for="form6Example3">Email</label>
                <input type="text" name='email' id="title" class="form-control" onChange={handleChange} />
              </div>


              <div className='text-center '>
                <button onClick={handleSubmit} disabled={isProcessing} type="submit" class="btn btn-secondary mt-1  mb-1 w-50 me-2" style={{ backgroundColor: "1D1D1D", color: "white" }}>
                  {
                    !isProcessing
                      ? "Send Email"
                      : <div className="spinner-border spinner-border-sm"></div>
                  }</button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>

  </div>
  );
}

export default Forgot;