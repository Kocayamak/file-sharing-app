import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const TopHeader = () => {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
        <AlignJustify  className='md:hidden' />
        <Image className='md:hidden' src='/logo.svg' width={150} height={100} alt='logo' />
        <UserButton />
    </div>
  )
}

export default TopHeader