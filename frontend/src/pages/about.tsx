export const About = () => {
  return (
     <div className="font-mono flex flex-col items-center">
      <h1 className="text-[5rem] font-mono">ABOUT US</h1>
      <article className="text-md mt-14 font-mono font-medium text-gray-600">
        <h1>B4F E-commerce is a factory brand, produced by the world's best maker </h1>
        <h1>of fleece fabric and apparel, Xipamanine Mozambique.</h1>
      </article>
      <div className="mt-14">
        <img className="w-130 h-80 mb-18" 
          src="https://www.mcarthurglen.com/globalassets/roermond/roermond--whats-on/2025/trends/assets/whats-on-herofeature/ss25-trends-mw-denim-redux_web_1804-x-1354.jpg?preset=contain-xl"
          alt="showroom image"
        />
      </div>
     </div>
  )
};