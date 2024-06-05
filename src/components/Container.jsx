import React from 'react'
import SingleContain from './SingleContain'

const Container = ({img}) => {
  return (
    <div className='mt-20  flex justify-around'>
<div className='grid grid-cols-3 gap-28'>
    {
        img.map((item,index)=>{
            return <SingleContain src={item.urls.thumb} key={index} />
        })
    }
</div>
    </div>
  )
}

export default Container