import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export default function Inbox() {
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col">
          <h3 style={{ color: "#9A9A9A", marginLeft: 30, marginBottom: 0 }}>Click on </h3>

          <div className='container d-flex align-items-center justify-content-center fs-1'>
            <a href="/form"><div className="col-3"><AddIcon /></div></a>
          </div>

          <h3 style={{ color: "#9A9A9A", marginLeft: 10 }}>to add todo</h3>

        </div>
      </div>
    </div>
  )
}
