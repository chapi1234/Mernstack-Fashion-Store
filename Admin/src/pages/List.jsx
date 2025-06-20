import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      console.log(error);
      toast.error("error.message")
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`
        , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { id }
        }
      )
      if (response.data.success) {
        toast.success("Product removed successfully");
        await fetchList();
      } else {
        toast.error("Failed to remove product");
      }
      
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

       {/* --------------------------Product List ----------------------------- */}

       {
        list.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm hover:bg-gray-50">
            <img src={item.image[0]} alt="Product" className="w-12" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg bg-red-300 border rounded-md">X</p>
          </div>
        ))
      }
      </div>
    </>
  );
};

export default List;
