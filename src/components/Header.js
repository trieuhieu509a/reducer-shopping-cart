import React, { useState } from 'react'
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context'
import { AiFillDelete } from 'react-icons/ai'
import { type } from '@testing-library/user-event/dist/type'

const Header = () => {

    const {
        state: { cart },
        dispatch,
        productState: {
            searchQuery,
        },
        productDispatch
    } = CartState()

// console.log(searchQuery)

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
            <Navbar.Brand>
                <Link href="/">Shopping cart</Link>
            </Navbar.Brand>
            <Navbar.Text className="search">
                <FormControl
                    style={{ width: 500 }}
                    placeholder="Search a product"
                    className="m-auto"
                    onChange={(e) => {
                        productDispatch({
                            type: 'FILTER_BY_SEARCH',
                            payload: e.target.value
                        })
                    }}
                />
            </Navbar.Text>

            <Nav>
                <Dropdown>
                    <Dropdown.Toggle variant="success">
                        <FaShoppingCart color="white" fontSize="25px" />
                        <Badge>{ cart.length }</Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: 370 }}>
                        {
                            (cart.length > 0) ? (
                                <>
                                    {cart.map((prod) => (
                                        <span className="cartitem" key={prod.id}>
                                        <img
                                          src={prod.image}
                                          className="cartItemImg"
                                          alt={prod.name}
                                        />
                                        <div className="cartItemDetail">
                                          <span>{prod.name}</span>
                                          <span>₹ {prod.price.split(".")[0]}</span>
                                        </div>
                                        <AiFillDelete
                                          onClick={() => {
                                            dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: prod
                                            })
                                          }}
                                          fontSize="20px"
                                          style={{ cursor: "pointer" }}
                                        />
                                      </span>
                                    ))}
                                    <Link to="/cart">
                                        <Button style={{ width: '95%', margin: '0 10px' }}>Go to Cart</Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{ padding: 10 }}>Cart is empty</span>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header
