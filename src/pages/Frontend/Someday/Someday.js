import React, { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { collection, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../config/firbase';
import { useAuthContext } from '../../../context/AuthContext';

const initialState = { title: "", location: "", date: "", description: "" }

export default function Anytime() {
  
  const { user } = useAuthContext();

  const [state, setState] = useState({ dated: '' })
  const [document, setDocument] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editTodo, setEditTodo] = useState(initialState);
  const [isProcessingUpdate, setIsProcessingUpdate] = useState(false)

  const handleDate = (e) => {
    const { name, value } = e.target
    setState(s => ({...s, [name]: value }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditTodo(s => ({...s, [name]: value }))
  }

  const getDocument = async () => {

    const array = [];

    const {dated}= state; 

    setIsProcessing(true)
    const q = query(collection(db, "todos"), where("date", "==", dated));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      array.push(data);
    });

    setDocument(array)
    setIsProcessing(false)
  }


  const handleUpdate = async () => {

    const todo = { ...editTodo }
    todo.dateCreated = todo.dateCreated
    todo.modifiedDate = serverTimestamp()
    todo.modifiedBy = {
      email: user.email,
      uid: user.uid
    }
    setIsProcessingUpdate(true)
    try {
      await setDoc(doc(db, "todos", todo.id), todo, { merge: true })
      window.toastify("Updated Successfully!", "success")
      let newDocument = document.map((doc) => {
        if (doc.id === todo.id)
          return todo
        return doc
      })
      setDocument(newDocument)
    }

    catch (err) {
      console.error(err)
      window.toastify("Something went wrong while updating!", "error")

    }
    setIsProcessingUpdate(false)
  }


  const handleDelete = async (todo) => {
    todo.status = "unactive"

    try {

      await setDoc(doc(db, "trash", todo.id), todo)
        .then(async () => {


          await deleteDoc(doc(db, "todos", todo.id));
          window.toastify("Todo is moved to trash", "success")

          let newDocument = document.filter((doc) => { return doc.id !== todo.id })
          setDocument(newDocument);
        })
    }
    catch (err) {
      console.error(err)
      window.toastify("Todo is not moved to trash", "error")
    }
  }

  return (
<>
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        // minHeight: 280,
        minHeight: "100vh",
        background: '#252525',
        color: 'white'
      }}
    >

      <div className="container mb-2"   >
        <div className="row">
          <div className="col">
            <div class="form-outline mb-3 ">

              <input onChange={handleDate} className=' form-control mx-auto' type="date" name='dated' id="form6Example5" class="form-control" />

              <div className="row mx-auto mt-3">
                <button onClick={getDocument} type="submit" className="btn btn-secondary mt-2 mx-auto  w-25 "  style={{ backgroundColor: "1D1D1D", color: "white" }}>Check Data</button>
              </div>

            </div>

          </div>
        </div>
      </div>


      <div className="container"   >
        {!isProcessing

          ? document.map((todo, i) => {

            return <div className="row mb-3" key={i} style={{ backgroundColor: '#363636', borderRadius: "8px" }}>
              <div className="col" style={{ marginTop: 10, marginBottom: 10 }}>

                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Title: </span> <span style={{ color: '#C3C3C3' }}>{todo.title}</span></p>
                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Location: </span> <span style={{ color: '#C3C3C3' }}>{todo.location}</span></p>
                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Date: </span> <span style={{ color: '#C3C3C3' }}>{todo.date}</span></p>
                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Description: </span> <span style={{ color: '#C3C3C3' }}>{todo.description}</span></p>
                <div className='mt-2'>
                  <button className='btn btn-primary me-2' onClick={() => setEditTodo(todo)} data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
                  <button className='btn btn-danger' onClick={() => { handleDelete(todo) }}>Del</button>
                </div>
              </div>
            </div>

          })
          : <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        }

      </div>
    </Content>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit your Todo</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Title" onChange={handleChange} name='title' value={editTodo.title} aria-label="title" aria-describedby="basic-addon1" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Location" onChange={handleChange} name='location' value={editTodo.location} aria-label="location" aria-describedby="basic-addon1" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="date" class="form-control" placeholder="Date" onChange={handleChange} name='date' value={editTodo.date} aria-label="date" aria-describedby="basic-addon1" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Description" onChange={handleChange} name='description' value={editTodo.description} aria-label="description" aria-describedby="basic-addon1" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" disabled={isProcessingUpdate} onClick={handleUpdate}>{
                !isProcessingUpdate ? 'Update Todo' : <div className="spinner-border spinner-border-sm"></div>
              }</button>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}
