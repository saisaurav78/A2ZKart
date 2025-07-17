import Spinner from '@/components/ui/Spinner';
import axios from 'axios';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
const BASE_URL=import.meta.env.VITE_BASE_URL

const OrdersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('newest');

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
          orderDate: order.createdAt,
          orderId:order._id
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

  // Sort logic based on selected option
  const sortedOrders = useMemo(() => {
    if (!data.length) return [];

    const sorted = [...data];

    switch (sortOption) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
      case 'highestTotal':
        return sorted.sort((a, b) => b.orderTotal - a.orderTotal);
      case 'lowestTotal':
        return sorted.sort((a, b) => a.orderTotal - b.orderTotal);
      default:
        return sorted;
    }
  }, [data, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-semibold text-center mb-6'>Orders Page</h1>

      {loading && <Spinner />}
      {error && <p className='text-red-500 text-center'>{error}</p>}

      {!loading && !error && data.length === 0 && <p className='text-center'>No orders found.</p>}

      {!loading && !error && data.length > 0 && (
        <div className='grid grid-cols-1 gap-6'>
          <div className='mb-6 px-6 lg:px-52'>
            <label htmlFor='sort' className='block text-lg font-medium mb-2 text-gray-700'>
              Sort Orders By:
            </label>
            <select
              id='sort'
              value={sortOption}
              onChange={handleSortChange}
              className='block w-full max-w-xs rounded-md border border-gray-300 bg-white px-4 py-3 pr-8 text-gray-700 shadow-sm focus:outline-none focus:ring-0  transition duration-150 ease-in-out cursor-pointer'
            >
              <option value='newest'>Newest First</option>
              <option value='oldest'>Oldest First</option>
              <option value='highestTotal'>Highest Total</option>
              <option value='lowestTotal'>Lowest Total</option>
            </select>
          </div>

          {sortedOrders.map((order, index) => (
            <div key={index} className='border rounded-md p-4 lg:mx-52 shadow-md'>
              <h1 className='text-lg font-semibold mb-4'>Order #{order.orderId}</h1>

              <div className='flex flex-col md:flex-row md:space-x-8'>
                {/* Shipping Address */}
                <div className='mb-4 md:mb-0 md:flex-1 text-md'>
                  <h3 className='font-medium mb-2'>Shipping Address:</h3>
                  <p>{order.shippingAddress.fullname}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipcode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>

                {/* Products */}
                <div className='mb-4 md:mb-0 md:flex-1 text-xl'>
                  <h3 className='font-medium mb-2'>Products:</h3>
                  <ul className='list-decimal max-h-48 overflow-y-auto'>
                    {order.products.map((product, pIndex) => (
                      <li key={pIndex} className='mb-3 flex items-center space-x-3'>
                        <img
                          src={product.image}
                          alt={product.title}
                          className='h-16 w-16 rounded-md'
                        />
                        <p>
                          {product.title} (Qty: {product.quantity})
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Summary & Status */}
                <div className='md:flex-1 mb-4 text-lg space-y-3'>
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
                    {Math.round(
                      order.orderTotal - (order.discount / 100) * order.orderTotal + order.shipping,
                    )}
                  </p>

                  <p>
                    <strong>Order Placed:</strong>{' '}
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
