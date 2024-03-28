import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{color:"black"}}>The Cart is Empty!</div>
      </div>
    )
  }
  //console.log(data);
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let order_Location = localStorage.getItem("location");
    console.log("12345678",order_Location)
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("https://mernback-jcis.onrender.com/api/auth/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        location: order_Location,
        order_date: new Date().toDateString()
      })
    });
    //console.log(response);
    let json= await response.json();
    if(json.success){
      console.log("12345678",json.location)
    }
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div style={{backgroundColor:"white"}}>

      {/*console.log(data)*/}
      
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >     </th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' style={{color:"black"}}>{index + 1}</th>
                <td style={{color:"black",justifyContent:"center",alignContent:"center",alignItems:"center"}}><img src={food.img} className="card-img-top" alt="..." style={{ height: "60px",width:"90px", objectFit: "fill",border:"2px solid black", borderRadius:"2px" }} /></td>
                <td style={{color:"black",justifyContent:"center",alignContent:"center",alignItems:"center"}}>{food.name}</td>
                <td style={{color:"black",justifyContent:"center",alignContent:"center",alignItems:"center"}}>{food.qty}</td>
                <td style={{color:"black",justifyContent:"center",alignContent:"center",alignItems:"center"}}>{food.size}</td>
                <td style={{color:"black",justifyContent:"center",alignContent:"center",alignItems:"center"}}>{food.price}</td>
                <td ><button type="button" className="btn p-0" style={{color:"black",justifyContent:"center",alignContent:"center",alignItems:"center"}}><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2' style={{color:"black"}}>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn mt-5 ' onClick={handleCheckOut} style={{backgroundColor:"orange"}}> Check Out </button>
        </div>
      </div>



    </div>
  )
}