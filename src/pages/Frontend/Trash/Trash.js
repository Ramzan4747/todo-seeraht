import React, { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { collection, getDocs, setDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../config/firbase';

export default function Anytime() {

  const [document, setDocument] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    getDocuments();
  })

  const getDocuments = async () => {
    let array = [];
    // setIsProcessing(true)
    const querySnapshot = await getDocs(collection(db, "trash"));
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      array.push(data);
    });
    setDocument(array)
    setIsProcessing(false)
  }

  const handleDelete = async (todo) => {

    try {

      await deleteDoc(doc(db, "trash", todo.id));

      let newDocument = document.filter((doc) => { return doc.id !== todo.id })
      setDocument(newDocument);
      window.toastify("Todo is deleted permanently!", "success")

    }
    catch (err) {
      console.error(err)
      window.toastify("Todo is not deleted", "error")
    }
  }



  return (
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

      <div className="container"   >
        {!isProcessing
          ?
          document.map((todo, i) => {
            return <div className="row mb-3" key={i} style={{ backgroundColor: '#363636', borderRadius: "8px" }}>
              <div className="col" style={{ marginTop: 10, marginBottom: 10 }}>

                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Title: </span> <span style={{ color: '#C3C3C3' }}>{todo.title}</span></p>
                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Location: </span> <span style={{ color: '#C3C3C3' }}>{todo.location}</span></p>
                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Date: </span> <span style={{ color: '#C3C3C3' }}>{todo.date}</span></p>
                <p style={{ marginBottom: 0 }}> <span className='fw-bold' style={{ color: "#C4531A", fontSize: "15px" }}>Description: </span> <span style={{ color: '#C3C3C3' }}>{todo.description}</span></p>
                <div className='mt-2'>
                  <button className='btn btn-primary me-2'>Update</button>
                  <button className='btn btn-danger' onClick={() => { handleDelete(todo) }}>Del</button>
                </div>
              </div>
            </div>

          })
          :
          <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        }

      </div>
    </Content>
  )
}
