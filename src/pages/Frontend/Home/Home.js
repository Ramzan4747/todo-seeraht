import React, { useState } from 'react'
import './home.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext';
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from '../../../config/firbase';

const initialState = { title: "", location: "", date: "", description: "" };

export default function Home() {

  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate  = useNavigate();

  const { user } = useAuthContext();
  console.log(user)


  const handleChange = (e) => {
    const { name, value } = e.target
    setState(s => ({ ...s, [name]: value }))
    console.log(state)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state)

    let { title, location, date, description } = state;

    title = title.trim();
    location = location.trim();
    description = description.trim();

    if (title.length < 3) {
      alert("Length of title should be more than 3 characters")
    }


    if (location.length < 3) {
      alert("Length of location should be more than 3 characters")
    }


    if (description.length < 15) {
      alert("Length of description should be more than 15 characters")
    }

    const data = { title, location, date, description }

    data.dateCreated = serverTimestamp();
    data.status = "active";
    data.id = window.getRandomId();
    data.createdBy = { email: user.email, uid: user.uid };

    createDoc(data);
    // setState(initialState);

  }


  const createDoc = async (data) => {
    setIsProcessing(true)
    try {
      await setDoc(doc(db, "todos", data.id), data)
      window.toastify("Todo is added", "success")
       navigate('/anytime')
       setIsProcessing(false)
    }

    catch (err) {
      console.log(err)
      alert("doc has not been added.")
      setIsProcessing(false);
    }
  };


  return (
    <>
      <div className='todo'>

        <h3 className='text-center text-white mb-3'>Todo</h3>
        <div className="card mx-auto p-4" style={{ width: 400 }}>
          <div className="container">
            <div className="row">
              <div className="col">

                <form>

                  <div class="form-outline mb-3">
                    <label class="form-label" for="form6Example3">Title</label>
                    <input type="text" name='title' id="title" class="form-control" onChange={handleChange} />
                  </div>


                  <div class="form-outline mb-3">
                    <label class="form-label" for="form6Example4">Location</label>
                    <input type="text" name='location' id="location" class="form-control" onChange={handleChange} />
                  </div>


                  <div class="form-outline mb-3">
                    <label class="form-label" for="form6Example5">Date</label>
                    <input type="date" name='date' id="form6Example5" class="form-control" onChange={handleChange} />
                  </div>

                  <div class="form-outline mb-3">
                    <label class="form-label" for="form6Example7">Description</label>
                    <textarea class="form-control" id="form6Example7" name='description' rows="4" onChange={handleChange}></textarea>
                  </div>

                  <div className='text-center '>


                    <button onClick={handleSubmit} type="submit" class="btn btn-secondary mt-1  mb-1 w-50 me-2" style={{ backgroundColor: "1D1D1D", color: "white" }}>
                      {
                      !isProcessing
                      ? "Add"
                      : <div className="spinner-border spinner-border-sm"></div>
                    }</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}
