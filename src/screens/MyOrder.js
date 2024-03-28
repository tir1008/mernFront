
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        //console.log(localStorage.getItem('userEmail'))
        await fetch("https://mernback-jcis.onrender.com/api/auth/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div style={{backgroundColor:"white"}}>
            <div>
                <Navbar />
            </div>

            <div className='container'style={{backgroundColor:"white"}}>
                <div className='row'>

                    {orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData,index) => {
                                            return (
                                                <div key={index} className='d-flex' >
                                                    {arrayData.Order_date||arrayData.Order_location ? arrayData.Order_date?<div className='m-auto mt-5 inline' style={{color:"black"}}>

                                                        Date : {data = arrayData.Order_date}
                                                    </div> :<span className='m-auto  inline' style={{color:"black"}}>
                                                                    Order Location : {arrayData.Order_location}
                                                                    <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 0),rgb(255, 0, 0))" }} />
                                                            </span> 
                                                    :

                                                        <div className='col-12 col-md-6 col-lg-3 flex-fill' >
                                                            <div className="card mt-3" id="CARD" style={{ width: "16rem", maxHeight: "360px",border:"3px solid black" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body" style={{backgroundColor:"white"}}>
                                                                    <h5 className="card-title" style={{color:"black"}}>{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px",color:"black" }}>
                                                                        <span className='m-1' style={{color:"black"}}>{arrayData.qty}</span>
                                                                        <span className='m-1' style={{color:"black"}}>{arrayData.size}</span>
                                                                        <span className='m-1' style={{color:"black"}}>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}