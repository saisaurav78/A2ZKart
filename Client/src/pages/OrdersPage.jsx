import Spinner from '@/components/ui/Spinner';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
const BASE_URL=import.meta.env.VITE_BASE_URL

const OrdersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/orders`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const formattedOrders = response.data.message.map((order) => ({
          shippingAddress: {
            fullname: order.shippingAddress.fullname,
            address: order.shippingAddress.address,
            city: order.shippingAddress.city,
            state: order.shippingAddress.state,
            zipcode: ' ' + order.shippingAddress.zipcode,
            country: order.shippingAddress.country,
            phone: order.shippingAddress.phone,
          },
          products: order.products.map((product) => ({
            id: product.id,
            title: product.title,
            quantity: product.quantity,
            image: product.images?.[0] ?? product.image,
          })),
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          paymentMethod: order.paymentMethod,
          discount: order.discount,
          orderTotal: order.orderTotal,
          shipping: order.shipping,
        }));

        setData(formattedOrders);
      }
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-semibold text-center mb-6'>Orders Page</h1>

      {loading && <Spinner />}
      {error && <p className='text-red-500 text-center'>{error}</p>}

      {!loading && !error && data.length === 0 && <p className='text-center'>No orders found.</p>}

      {!loading && !error && data.length > 0 && (
        <div className='grid grid-cols-1 gap-6'>
          {data.map((order, index) => (
            <div key={index} className='border rounded-md p-2 lg:mx-52 shadow-md'>
              <h1 className='text-lg font-semibold mb-2'>Order #{index + 1}</h1>
              <div className='mb-4 text-md'>
                <h3 className='font-medium'>Shipping Address:</h3>
                <p>{order.shippingAddress.fullname}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                  {order.shippingAddress.zipcode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
              <div className='mb-4 text-xl'>
                <h3 className='font-medium'>Products:</h3>
                <ul className='list-decimal pl-6'>
                  {order.products.map((product, pIndex) => (
                    <li key={pIndex} className='mb-2'>
                      <p>
                        {product.title} (Qty: {product.quantity})
                      </p>
                      <img
                        src={product.image}
                        alt={product.title}
                        className='h-12 w-12 rounded-md mt-1'
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mb-4  space-y-3 text-lg'>
                <p>
                  <strong>Item Total:</strong> ${order.orderTotal}
                </p>
                <p>
                  <strong>Discount:</strong> {order.discount}%
                </p>
                <p>
                  <strong>Shipping:</strong> ${order.shipping}
                </p>
                <p className='text-2xl'>
                  <strong>Total:</strong> $
                  {order.orderTotal - (order.discount / 100) * order.orderTotal + order.shipping}
                </p>
                <div className='text-xl space-y-1'>
                  <p
                    className={
                      order.orderStatus === 'pending'
                        ? 'text-customPalette-red'
                        : 'text-customPalette-blue'
                    }
                  >
                    <strong>Order Status:</strong> {order.orderStatus}
                  </p>
                  <p
                    className={
                      order.paymentStatus === 'pending'
                        ? 'text-customPalette-red'
                        : 'text-customPalette-blue'
                    }
                  >
                    <strong>Payment Status:</strong> {order.paymentStatus}
                  </p>
                  <p className='text-customPalette-black'>
                    <strong>Payment Mode:</strong> {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
