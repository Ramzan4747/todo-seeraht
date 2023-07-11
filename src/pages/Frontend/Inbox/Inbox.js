import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export default function Inbox() {
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col">
          <h6 style={{ color: "#9A9A9A", marginLeft: 20, marginBottom: 0 }}>Click on </h6>

          <div className='container d-flex align-items-center justify-content-center'>
            <a href="/form"><div className="col-3"><AddIcon /></div></a>
          </div>

          <h6 style={{ color: "#9A9A9A", marginLeft: 10 }}>to add todo</h6>

        </div>
      </div>
    </div>
  )
}
