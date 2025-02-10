import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'
import Filters from './Filters'

const Home = () => {

    const {
      state : { products },
      productState: { sort, byStock, byFastDelivery, byRating, searchQuery }
    } = CartState()

    const transformProducts = () => {
      let sortedProducts = products;
      if (sort) {
        sortedProducts = products.slice().sort((a, b) => {
          if (sort === 'lowToHigh') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      }

      if(!byStock) {
        sortedProducts = sortedProducts.filter(product => product.inStock)
      }

      if(byFastDelivery) {
        sortedProducts = sortedProducts.filter(product => product.fastDelivery)
      }

      if(byRating) {
        sortedProducts = sortedProducts.filter(product => product.ratings >= byRating)
      }

      if(searchQuery) {
        console.log(searchQuery);
        console.log(sortedProducts);
        sortedProducts = sortedProducts.filter(product => product.name.toLowerCase().includes(searchQuery))
      }
      console.log(sortedProducts);
      return sortedProducts;
    }

  return (
    <div className='home'>
      <Filters />
      <div className='productContainer'>
        {
          transformProducts().map(product => (
            <SingleProduct key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default Home
