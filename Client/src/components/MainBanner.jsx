import React from 'react'

const MainBanner = () => {
    return (
      <>
        <section class="hero bg-cover bg-center h-96 text-white flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-4xl font-bold">Welcome to Our Website</h1>
            <p class="mt-4 text-lg">Building the future with technology</p>
            <a
              href="#services"
              class="mt-6 inline-block bg-blue-500 px-6 py-3 text-white rounded-full"
            >
              Learn More
            </a>
          </div>
        </section>
      </>
    );

}

export default MainBanner