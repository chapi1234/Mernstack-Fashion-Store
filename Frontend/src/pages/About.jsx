import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsLetterBox from './NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] rounded-2xl' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='text-2xl'>Welcome to our online store!</p>
          <p className='text-sm'>
            We are a passionate team dedicated to providing you with the best shopping experience possible. Our mission is to offer high-quality products at affordable prices, while ensuring exceptional customer service.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and confidence in their shopping journey. 
            We strive to provide a seamless and enjoyable experience by offering a wide range of high-quality products, 
            exceptional customer service, and innovative solutions that cater to your needs. 
            At Forever, we believe in building lasting relationships with our customers and making every interaction meaningful.
          </p>
          <p className='text-sm'>
            Happy shopping!
          </p>
          <p className='text-sm'>
            The Team
          </p>          
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm m-20'>
        <div className='border rounded-2xl md:mx-2 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance :</b>
          <p className='text-gray-600'>We ensure every product meets our high-quality standards through careful selection.</p>
        </div>
        <div className='border rounded-2xl md:mx-2 px-5 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Customer Satisfaction</b>
          <p className='text-gray-600'>Our support team is here to provide you with a smooth and satisfying experience.</p>
        </div>
        <div className='border rounded-2xl md:mx-2 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Affordable Pricing :</b>
          <p className='text-gray-600'>We offer competitive prices without compromising on quality.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About