import React from 'react'
import { assets } from '../../assets/assets'
function EdFooter() {
  return (
    <div className="flex items-center justify-between gap-3.5 py-5 px-15 border-t-gray-200 border-t-[1px] " >

<div className="flex items-center gap-3.5">
<img src={assets.logo} className='w-20' />
<span className="w-[1px] h-full bg-gray-700* " ></span>
<p className="text-sm text-gray-700 font-medium " >All right reserved. Copyright @Edemy   </p>

</div>

<div className="flex items-center gap-3.5">
<img src={assets.facebook_icon} className='w-8 h-8  rounded-full   ' />
<img src={assets.twitter_icon} className='w-8 h-8  rounded-full    ' />
<img src={assets.instagram_icon} className='w-8 h-8 rounded-full     ' />

</div>


    </div>
  )
}

export default EdFooter