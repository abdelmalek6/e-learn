
import React, { useState } from 'react'
import { assets } from '../../assets/assets'

function Rating() {
  const [rate, setrate] = useState(0)

  return (
    <div className="flex items-center gap-1.5 rounded-xl bg-gray-50 border border-gray-200 p-3 w-fit shadow-sm">

      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1

        return (
          <img
            key={i}
            onClick={() => setrate(star)}
            src={star <= rate ? assets.star : assets.star_blank}
            alt={`Rate ${star}`}
            className="w-7 h-7 cursor-pointer transition-all duration-200 hover:scale-125 active:scale-90"
          />
        )
      })}

      <span className="ml-2 text-sm font-semibold text-gray-700">
        {rate}/5
      </span>

    </div>
  )
}

export default Rating
