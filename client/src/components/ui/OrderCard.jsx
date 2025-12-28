import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export default function OrderCard({
  order,
  user,
  deleteHandler,
  changeHandler,
  editData,
  setEditData,
}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{order.company}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{order.phone}</Card.Subtitle>
        {user.id === order.userId ? (<Card.Subtitle className="mb-2 text-muted">Ваша карточка</Card.Subtitle>) : (<Card.Subtitle className="mb-2 text-muted">Не ваша карточка</Card.Subtitle>)}
        {deleteHandler && (
          <Button
            variant="danger"
            onClick={() => deleteHandler(order.id)}
            style={{ marginRight: '10px' }}
          >
            Удалить
          </Button>
        )}

        {changeHandler && <Button onClick={() => {
    if (editData && editData.id === order.id) {
     
      setEditData(null);
    } else {

      setEditData(order);
    } 
  }}>Изменение</Button>}
        {editData && editData.id === order.id && (
          <Form onSubmit={(e) => changeHandler(e, order.id)}>
            <p style={{ color: 'darkblue' }}>Компания</p>
            <Form.Control type="text" name="company" defaultValue={editData.company} />

            <p>Номер</p>
            <Form.Control type="number" name="phone" defaultValue={editData.phone} />

            <div>
              <Button type="submit" style={{marginTop: "20px"}}>Сохранить</Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}
