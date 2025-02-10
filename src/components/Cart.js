import React, { useEffect } from 'react'
import { CartState } from '../context/Context'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import Rating from './Rating'

const Cart = () => {

  const { 
    state: { cart },
    dispatch
  } = CartState()

  const [total, setTotal] = React.useState()

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    )
  }, [cart]);

  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {
            cart.map((prod) => (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}> {prod.price} </Col>
                  <Col md={2}>
                    <Rating rating={prod.ratings}></Rating>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
          </ListGroup>  
      </div>
      <div className='filters summary'>
        <span className='title'>Subtotal ({cart.length}) items</span>
        <span style={{fontWeight: 700, fontSize: 20}}>Total: {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart
