import React from 'react'
import Link from 'next/link'

const MenuItem = ({ title, href }) => {
  return (
    <Link href={href}>
      <li className="ml-10 text-sm uppercase text-[#d4d4d4] hover:text-[#e06e4d] hover:scale-110 ease-in duration-300">
        {title}
      </li>
    </Link>
  )
}

export default MenuItem
