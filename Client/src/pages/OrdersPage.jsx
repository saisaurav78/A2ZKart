import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
    const [data, setData] = useState([])
  useEffect(() => {
      fetchOrders()
      
  }, [])
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders/', {withCredentials:true});
      if (response.status===200) {
        const orders = response.data.message
        const array = orders[0]
        setData(Object.values(array))
        console.log(Object.values(data))

      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
        <span className='text-2xl text-center'>Orders Page</span>
      <div className='container flex flex-col justify-evenly items-center p-52 m-auto'>
        {
          data.map((item, index) => {
            return <div key={index}>{}</div>
        })
        }
        
              
      </div>
    </>
  );
};

export default OrdersPage;
