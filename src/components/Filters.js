import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Rating from './Rating';
import { CartState } from '../context/Context';
import { type } from '@testing-library/user-event/dist/type';
import { productReducer } from '../context/Reducers';

const Filters = () => {
  const {
    productState: {
      byStock,
      byFastDelivery,
      sort,
      byRating,
    },
    productDispatch
  } = CartState()

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onClick={() => {
            productDispatch({
              type: 'SORT_BY_PRICE',
              payload: 'lowToHigh',
            });
          }}
          checked={sort === 'lowToHigh' ? true : false} 
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          onClick={() => {
            productDispatch({
              type: 'SORT_BY_PRICE',
              payload: 'highToLow',
            });
          }}
          id={`inline-2`}
          checked={sort === 'highToLow' ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onClick={() => {
            productDispatch({
              type: 'FILTER_BY_STOCK'
            })
          }}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onClick={() => {
            productDispatch({
              type: 'FILTER_BY_DELIVERY'
            })
          }}
          checked={byFastDelivery ? true : false}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) => productDispatch({
            type: 'FILTER_BY_RATING',
            payload: i + 1,
          })}
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={()=> {
          productDispatch({
            type: 'CLEAR_FILTERS',
          })
        }}
      >
        Clear Filters
      </Button>
    </div>
  );


}

export default Filters
