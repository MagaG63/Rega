import { useState } from 'react';
import { useEffect } from 'react';
import OrderCard from '../ui/OrderCard';
import { Col, Form, Row } from 'react-bootstrap';

export default function HomePage({ user }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`/api/order?search=${search}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [search]);
  return (
    <>
      {user ? (
        <>
          <h2 style={{ marginTop: '30px' }}>Поиск:</h2>
          <Form.Control
            style={{
              marginBottom: '30px',
              border: '1px solid #333',
              borderRadius: '12px',
              color: '#333',
              padding: '12px 20px',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
            }}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <Row className="g-2">
            {orders.map((order) => (
              <Col sm={4}>
                <OrderCard order={order} user={user} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '60px' }}>
          Авторизуйтесь
        </div>
      )}
    </>
  );
}
