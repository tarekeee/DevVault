import { footerLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface ColProps {
  title : string,
  links : string[];
}
const FooterCol = ({ title, links} : ColProps)  => (
  <div className='footer_column'>
    <h4 className='font-semibold'>{title}</h4>
    <ul className='flex flex-col gap-2 font-normal'>
      {links.map((item) => (
        <Link href="/" key={item}>{item}</Link>
      ))}
    </ul>
  </div>
)
export default function Footer() {
  return (
    <footer className='flexStart footer'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
          <Image src="/logo-purple.svg" 
          width={115}
          height={38}
          alt='logo' />
        </div>
        <p className='text-start tes-sm font-normal mt-5 max-w-xs'>
          This is an online platform for developers around the world to share their work and get inspired by others  </p>
          <div className='flex flex-wrap gap-12'>
            <FooterCol title={footerLinks[0].title} links={footerLinks[0].links}/>
            <div className='flex-1 flex flex-col'>
            <FooterCol title={footerLinks[1].title} links={footerLinks[1].links}/>
            <FooterCol title={footerLinks[2].title} links={footerLinks[2].links}/>

            </div>
            <FooterCol title={footerLinks[3].title} links={footerLinks[3].links}/>
            <div className='flex-1 flex flex-col'>
            <FooterCol title={footerLinks[4].title} links={footerLinks[4].links}/>
            <FooterCol title={footerLinks[5].title} links={footerLinks[5].links}/>

            </div>
            <FooterCol title={footerLinks[6].title} links={footerLinks[6].links}/>
          </div>
      </div>
      <div className=' flexBetween footer_copyright'>
        <p>
          All rights reserved.
        </p>
        <p className='text-gray'>
          <span className='text-black font-semibold'>X</span> Projects Submited
        </p>
      </div>
    </footer>
  )
}
