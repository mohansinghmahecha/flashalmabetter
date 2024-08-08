import React from 'react'
import logo from '../../asserts/al.png'

export default function MenuBatr() {
  return (
    <div className='w-full bg-white h-[40px] flex justify-start '>
      {/* our almabetter image logo for the project */}
        <img src={logo} alt="alma-logo" width={150} height={30} className='ml-5 object-fit overflow-hidden'/>

    </div>
  )
}
