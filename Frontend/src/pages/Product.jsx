import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets"; 
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    if (products && products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      } else {
        console.log("Product not found.");
      }
    } else {
      console.log("Products array is empty or undefined.");
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt=""
                className="w-1/4 sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_icon} alt="star" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="star dull" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="pt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer">Add To Cart</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original products</p>
            <p>Free shipping on orders above $50</p>
            <p>Easy exchange and return policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* description and review */}
      <div className="mt-20">
        <div className="flex">
          <p className="border border-gray-400 rounded-md px-5 py-3 text-sm">Description</p>
          <p className="border border-gray-400 rounded-md px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-400 rounded-md px-x py-6 text-sm test-gray-500">
          <p className="px-2">
          Step into a world where fashion meets convenience. Our e-commerce platform offers a curated collection of trendy, high-quality clothing for men, women, and kids. Whether you’re 
          looking for casual comfort, bold streetwear, or timeless classics, we’ve got you covered. </p>
          <p className="px-2">At , we prioritize quality, affordability, and fast shipping – all wrapped in a smooth online shopping experience. Explore new arrivals, seasonal collections, and exclusive deals designed to keep you one step ahead in style.</p>
          <p className="px-2">Join our fashion-forward community and express your unique look effortlessly. </p>
          <p className="px-2">Stay stylish. Shop smart. Only at FOREVER fashion store.</p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="text-center text-gray-500">Loading product data...</div>
  );
};

export default Product;