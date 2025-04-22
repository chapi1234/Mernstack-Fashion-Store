import React, {useState, useEffect, useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

const RelatedProducts = ({category, subCategory}) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);
    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => item.category === category && item.subCategory === subCategory) 

            setRelated(productsCopy.slice(0, 10));
        }
    }, [products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
          <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item, index) => (
                <Link to={`/products/${item._id}`} key={index} >
                    <ProductItem
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                </Link>))}
        </div>
    </div>
  )
}

export default RelatedProducts