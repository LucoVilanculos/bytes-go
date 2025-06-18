export const About = () => {
  return (

     <div className=" flex flex-col items-center">
      <h1 className="text-[5rem] text-white p-4">Sobre nós </h1>
      <article className="text-md mt-14 o font-medium text-white p-4">
        <h1 className=" text-lg space-y-3  text-white">BytesGo Mobilidade que te move!</h1>
        <p className=" text-lg space-y-3 font-semibold text-white">A BytesGo é mais do que uma empresa de transporte,  somos uma solução moderna, segura e eficiente para   quem precisa se mover com liberdade e confiança.  Nascemos com o objetivo de transformar a mobilidade  urbana, conectando passageiros e motoristas com  tecnologia de ponta e atendimento de qualidade.</p>
      <p className=" text-lg space-y-3 font-semibold text-white">Nosso compromisso é oferecer uma experiência de transporte  acessível, confortável e confiável. Valorizamos o tempo dos  nossos clientes, por isso investimos em inovação, agilidade  e um suporte sempre presente.</p>

      </article>
      <div className="mt-14">
        <img className="w-130 h-80 mb-18" 
          src="https://cdn.discordapp.com/attachments/1363901798192120038/1384926762198237388/ChatGPT_Image_18_06_2025_20_33_17.png?ex=6854350e&is=6852e38e&hm=2cb022c8af06b283a4738d38dfafad363571e6229dd30e983fc48ec08dbf05e2&"
          alt="showroom image"
        />
      </div>
     </div>
  )
};