import React, { useState } from 'react'

const CartPage = () => {
  const [Cart, setCart] = useState(false)
  



  return (
    <section className='flex flex-col items-center justify-center m-10'>
      {Cart ? (
        <span className='text-4xl font-sans'>Your Items are .....</span>
      ) : (
        <>
          <span className='text-4xl font-sans'>Your Cart is Empty</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            enable-background='new 0 0 1500 1500'
            viewBox='0 0 1500 1500'
            width={600}
          >
            <g fill='#02020b' class='color000000 svgShape' transform='scale(1.875)'>
              <rect width='800' height='800' fill='none' />
              <circle
                cx='750'
                cy='750'
                r='540.5'
                fill='#f9cb77'
                fill-rule='evenodd'
                class='colore0e9f9 svgShape'
                clip-rule='evenodd'
                transform='translate(-23.64 -23.64) scale(.56485)'
              />
              <g
                class='color000000 svgShape'
                transform='rotate(3.884 1246.644 76.259) scale(1.0884)'
              >
                <polygon
                  fill='#356cdc'
                  fill-rule='evenodd'
                  points='4089 2804.5 4175.2 2804.5 4175.2 2961.2 4089 2961.2'
                  class='color3594dc svgShape'
                  clip-rule='evenodd'
                  transform='matrix(.33483 0 -.1488 .88359 -425.458 -2019.43)'
                />
                <path
                  fill='#356cdc'
                  fill-rule='evenodd'
                  d='M4234,2697.2c0,0,49-290.9,65.6-389.7c3.1-18.7,19.4-32.4,38.3-32.4h85.4c4.5,0,8.7,2,11.6,5.4      c2.9,3.4,4.1,7.9,3.4,12.3c-1.1,6.6-2.4,14.1-3.4,20.1c-1.2,7.3-7.6,12.7-15,12.7c-23.1,0-69.2,0-69.2,0l-62.6,371.7H4234z'
                  class='color3594dc svgShape'
                  clip-rule='evenodd'
                  transform='translate(-1731.77 -979.943) scale(.53333)'
                />
                <polygon
                  fill='#356cdc'
                  fill-rule='evenodd'
                  points='4089 2804.5 4175.2 2804.5 4175.2 2961.2 4089 2961.2'
                  class='color3594dc svgShape'
                  clip-rule='evenodd'
                  transform='matrix(2.74912 0 -.02522 .14973 -10871.5 153.666)'
                />
                <path
                  fill='#80a4ed'
                  fill-rule='evenodd'
                  d='M4283,2410.7l-586.3,0c0,0,37.6,224.2,53.3,317.4c3.9,23.1,23.8,40,47.2,40c88.3,0,297,0,385.3,0      c23.4,0,43.4-16.9,47.2-40C4245.4,2634.9,4283,2410.7,4283,2410.7z'
                  class='color4fb4f3 svgShape'
                  clip-rule='evenodd'
                  transform='translate(-2164.2 -1260.6) scale(.64172)'
                />
                <path
                  fill='#1d55c7'
                  fill-rule='evenodd'
                  d='M3821.7,2489.9l34.4,197.7c2.4,13.6,15.3,22.7,28.9,20.3c13.6-2.4,22.7-15.3,20.4-28.9l-34.4-197.6      c-2.4-13.6-15.3-22.7-28.9-20.4C3828.5,2463.3,3819.4,2476.3,3821.7,2489.9z'
                  class='color1d77c7 svgShape'
                  clip-rule='evenodd'
                  transform='translate(-1717.29 -978.37) scale(.53333)'
                />
                <path
                  fill='#356cdc'
                  fill-rule='evenodd'
                  d='M3824.9,2508.2l31.2,179.4c2.4,13.6,15.3,22.7,28.9,20.3c13.6-2.4,22.7-15.3,20.4-28.9l-31.2-179.4      c-2.4-13.6-15.3-22.7-28.9-20.4C3831.7,2481.6,3822.6,2494.6,3824.9,2508.2z'
                  class='color3594dc svgShape'
                  clip-rule='evenodd'
                  transform='translate(-1717.29 -978.37) scale(.53333)'
                />
                <path
                  fill='#1d55c7'
                  fill-rule='evenodd'
                  d='M3871,2481.3l34.3,197.6c2.4,13.6-6.8,26.6-20.4,28.9c-13.6,2.4-26.6-6.8-28.9-20.3l-34.3-197.7      c-2.4-13.6,6.8-26.5,20.4-28.9C3855.7,2458.6,3868.6,2467.7,3871,2481.3z'
                  class='color1d77c7 svgShape'
                  clip-rule='evenodd'
                  transform='matrix(-.53333 0 0 .53333 2509.6 -978.37)'
                />
                <path
                  fill='#356cdc'
                  fill-rule='evenodd'
                  d='M3874.2,2500l31.1,179c2.4,13.6-6.8,26.6-20.4,28.9c-13.6,2.4-26.6-6.8-28.9-20.3l-31.1-179      c-2.4-13.6,6.8-26.6,20.4-28.9C3858.9,2477.3,3871.9,2486.4,3874.2,2500z'
                  class='color3594dc svgShape'
                  clip-rule='evenodd'
                  transform='matrix(-.53333 0 0 .53333 2509.6 -978.37)'
                />
                <circle
                  cx='4221.5'
                  cy='2934.9'
                  r='74.1'
                  fill='#80a4ed'
                  fill-rule='evenodd'
                  class='color4fb4f3 svgShape'
                  clip-rule='evenodd'
                  transform='rotate(-86.116 887.879 2212.744) scale(.58893)'
                />
                <circle
                  cx='4221.5'
                  cy='2934.9'
                  r='41.5'
                  fill='#fff'
                  fill-rule='evenodd'
                  class='colorffffff svgShape'
                  clip-rule='evenodd'
                  transform='rotate(-86.116 748.041 1248.217) scale(.33009)'
                />
                <g class='color000000 svgShape' transform='translate(-214.555)'>
                  <circle
                    cx='4221.5'
                    cy='2934.9'
                    r='74.1'
                    fill='#80a4ed'
                    fill-rule='evenodd'
                    class='color4fb4f3 svgShape'
                    clip-rule='evenodd'
                    transform='rotate(-86.116 887.879 2212.744) scale(.58893)'
                  />
                  <circle
                    cx='4221.5'
                    cy='2934.9'
                    r='41.5'
                    fill='#fff'
                    fill-rule='evenodd'
                    class='colorffffff svgShape'
                    clip-rule='evenodd'
                    transform='rotate(-86.116 748.041 1248.217) scale(.33009)'
                  />
                </g>
              </g>
              <path
                fill='#356cdc'
                fill-rule='evenodd'
                d='M3815.9,2374.4c0,91.2-62.5,167.9-147,189.5l-31.8-189.5H3815.9z'
                class='color3594dc svgShape'
                clip-rule='evenodd'
                transform='rotate(3.885 17917.271 -27187.194) scale(.58048)'
              />
              <g class='color000000 svgShape' transform='translate(-401.968 -24.545)'>
                <circle
                  cx='2723.5'
                  cy='2299.7'
                  r='171'
                  fill='#d36135'
                  fill-rule='evenodd'
                  class='colorf2763d svgShape'
                  clip-rule='evenodd'
                  transform='translate(-852.633 -964.234) scale(.53333)'
                />
                <path
                  fill='#ed4707'
                  d='M2771.9,2305.3c0-4.6-0.7-8.1-2-10.6c-1.3-2.5-3.2-3.8-5.7-3.8c-2.4,0-4.3,1.2-5.6,3.8      c-1.3,2.5-1.9,6-1.9,10.6s0.6,8.1,1.9,10.7c1.3,2.5,3.1,3.8,5.6,3.8c2.4,0,4.3-1.3,5.7-3.8      C2771.2,2313.4,2771.9,2309.9,2771.9,2305.3z M2785.2,2305.3c0,4-0.5,7.6-1.6,10.7c-1,3.1-2.5,5.7-4.3,7.9      c-1.9,2.1-4.1,3.7-6.6,4.8c-2.6,1.1-5.4,1.6-8.4,1.6c-3.1,0-5.9-0.5-8.5-1.6c-2.6-1.1-4.8-2.7-6.6-4.8c-1.8-2.1-3.3-4.7-4.3-7.9      c-1-3.1-1.5-6.7-1.5-10.7s0.5-7.6,1.5-10.7c1-3.1,2.5-5.7,4.3-7.8c1.9-2.1,4.1-3.7,6.6-4.8c2.6-1.1,5.4-1.6,8.5-1.6      c3,0,5.8,0.6,8.4,1.6c2.6,1.1,4.8,2.7,6.6,4.8c1.8,2.1,3.3,4.7,4.3,7.8C2784.7,2297.7,2785.2,2301.3,2785.2,2305.3z'
                  class='colored3f07 svgShape'
                  transform='translate(-5171.21 -4548.84) scale(2.0901)'
                />
                <path
                  fill='#fff'
                  d='M2771.9,2305.3c0-4.6-0.7-8.1-2-10.6c-1.3-2.5-3.2-3.8-5.7-3.8c-2.4,0-4.3,1.2-5.6,3.8      c-1.3,2.5-1.9,6-1.9,10.6s0.6,8.1,1.9,10.7c1.3,2.5,3.1,3.8,5.6,3.8c2.4,0,4.3-1.3,5.7-3.8      C2771.2,2313.4,2771.9,2309.9,2771.9,2305.3z M2785.2,2305.3c0,4-0.5,7.6-1.6,10.7c-1,3.1-2.5,5.7-4.3,7.9      c-1.9,2.1-4.1,3.7-6.6,4.8c-2.6,1.1-5.4,1.6-8.4,1.6c-3.1,0-5.9-0.5-8.5-1.6c-2.6-1.1-4.8-2.7-6.6-4.8c-1.8-2.1-3.3-4.7-4.3-7.9      c-1-3.1-1.5-6.7-1.5-10.7s0.5-7.6,1.5-10.7c1-3.1,2.5-5.7,4.3-7.8c1.9-2.1,4.1-3.7,6.6-4.8c2.6-1.1,5.4-1.6,8.5-1.6      c3,0,5.8,0.6,8.4,1.6c2.6,1.1,4.8,2.7,6.6,4.8c1.8,2.1,3.3,4.7,4.3,7.8C2784.7,2297.7,2785.2,2301.3,2785.2,2305.3z'
                  class='colorffffff svgShape'
                  transform='translate(-5176.68 -4558.37) scale(2.0901)'
                />
              </g>
              <g class='color000000 svgShape' transform='translate(-1430.73 1262.04) scale(.7358)'>
                <path
                  fill='#d36135'
                  d='M3631.3,244.3c-0.5,0-1.1-0.1-1.6-0.2l-97.7-23.7c-3.7-0.9-6-4.6-5.1-8.3c0.9-3.7,4.6-6,8.3-5.1l97.7,23.7      c3.7,0.9,6,4.6,5.1,8.3C3637.2,242.2,3634.4,244.3,3631.3,244.3z'
                  class='colorf2763d svgShape'
                  transform='translate(-631.561 -1639.04) scale(.73655)'
                />
                <path
                  fill='#d36135'
                  d='M3621.4,260.8c-2.8,0-5.4-1.7-6.4-4.4l-29.7-77.5c-1.4-3.6,0.4-7.5,4-8.9c3.6-1.4,7.5,0.4,8.9,4l29.7,77.5      c1.4,3.6-0.4,7.5-4,8.9C3623.1,260.6,3622.2,260.8,3621.4,260.8z'
                  class='colorf2763d svgShape'
                  transform='translate(-543.978 -1733.64) scale(.73655)'
                />
                <path
                  fill='#d36135'
                  d='M3631.3,244.3c-1.8,0-3.5-0.7-4.9-2l-92.7-92.7c-2.7-2.7-2.7-7.1,0-9.7c2.7-2.7,7.1-2.7,9.7,0l92.7,92.7      c2.7,2.7,2.7,7.1,0,9.7C3634.8,243.6,3633.1,244.3,3631.3,244.3z'
                  class='colorf2763d svgShape'
                  transform='translate(-606.998 -1687.36) scale(.73655)'
                />
              </g>
            </g>
          </svg>
        </>
      )}
    </section>
  );
}

export default CartPage