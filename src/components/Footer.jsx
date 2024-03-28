import React from 'react'
import {Link} from "react-router-dom"

export default function Footer() {
  let year=new Date().getFullYear();
  //console.log("this the year",year)
  return (
    <div>
        <div className="container">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" >
    <div className="col-md-4 d-flex align-items-center" >
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></Link>
      <span className="text" style={{ color: "rgba(0,0,0,0.6)", opacity: 1 }}>© {year} VegDelight, Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">

    </ul>
  </footer>
</div>
    </div>
  )
}
