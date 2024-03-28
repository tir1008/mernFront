import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("https://mernback-jcis.onrender.com/api/auth/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response[0][0])
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div style={{backgroundColor:"white",color:"black"}} >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{width:"90%",marginLeft:"5%",marginTop:"30px",borderRadius:"10px",border:"5px solid rgba(0,0,0,0.8)"}}>

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" style={{borderRadius:"10px"}}>
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100 card-img-top" style={{ filter: "brightness(50%)",objectFit:"fill" }} alt="..." />
            </div>
            <div className="carousel-item" style={{borderRadius:"10px"}}>
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 card-img-top" style={{ filter: "brightness(50%)",objectFit:"fill" }} alt="..." />
            </div>
            <div className="carousel-item" style={{borderRadius:"10px"}}>
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 card-img-top" style={{ filter: "brightness(50%)",objectFit:"fill" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat.length!==0
            ? foodCat.map((data,index) => {
              return (
                // justify-content-center
                <div key={index} className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 0),rgb(255, 0, 0))" }} />
                  {
                    
                    foodItems.length!==0 && Array.isArray(foodItems) ? foodItems.filter(
                      (items) => (items.CategoryName === data.CategoryName) && (typeof items.name==='string') && (items.name.toLowerCase().includes(search.toLowerCase())))
                      .map((filterItems) => {
                        return (
                          <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                            {console.log(filterItems.url)}
                            <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                          </div>
                        )
                      }) : <div> No Such Data </div>
                    
                    }
                </div>
              )
            })
            : ""}
      </div>
      <Footer />
    </div>
  )
}