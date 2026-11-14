import React from 'react'
import {assets} from "../../assets/assets.js"
function Companies() {
  return (
    <div className='flex flex-col space-y-10 pb-6 ' >
<p className='text-center w-full text-gray-600 text-xs md:text-sm font-medium'>Trusted by learners from</p>


        <div className='flex w-full items-center justify-center flex-wrap gap-y-3 gap-x-9 mx-auto  md:gap-x-15  '>

<img src={ assets.microsoft_logo } className='w-23 md:w-28' />
<img src={ assets.adobe_logo } className='w-23 md:w-28' />
<img src={ assets.walmart_logo } className='w-23 md:w-28' />
<img src={ assets.paypal_logo } className='w-23 md:w-28' />
<img src={ assets.accenture_logo } className='w-23 md:w-28' />




    </div>
    </div>
  )
}

export default Companies