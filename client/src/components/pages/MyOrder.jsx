import { useState } from 'react';
import { useEffect } from 'react';
import OrderCard from '../ui/OrderCard';
import { Col, Row } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';

export default function MyOrder({ user }) {
  const [orders, setOrders] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch('/api/order')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const changeHandler = async (e, orderId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await axios.put(`api/order/${orderId}`, data);
    setOrders(orders.map((item) => (item.id === orderId ? response.data : item)));
    setEditData(null);
  };

  const deleteHandler = async (id) => {
    await axiosInstance.delete(`/order/${id}`);
    setOrders(orders.filter((book) => book.id !== id));
  };

  return (
    <>
      <Row className="g-2">
        {orders
          .filter((order) => order.userId === user?.id)
          .map((order) => (
            <Col key={order.id} sm={4}>
              <OrderCard
                order={order}
                user={user}
                deleteHandler={deleteHandler}
                changeHandler={changeHandler}
                editData={editData}
                setEditData={setEditData}
              />
            </Col>
          ))}
      </Row>
    </>
  );
}
