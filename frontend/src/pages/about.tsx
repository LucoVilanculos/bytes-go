export const About = () => {
  return (
     <div className="font-mono flex flex-col items-center">
      <h1 className="text-[5rem] text-white font-mono">Sobre nós </h1>
      <article className="text-md mt-14 font-mono font-medium text-white p-4">
        <h1 className="font-semibold uppercase text-black">BytesGo Mobilidade que te move!</h1>
        <p className=" text-lg space-y-3 font-semibold text-black">A BytesGo é mais do que uma empresa de transporte,  <br />somos uma solução moderna, segura e eficiente para  <br /> quem precisa se mover com liberdade e confiança. <br /> Nascemos com o objetivo de transformar a mobilidade <br /> urbana, conectando passageiros e motoristas com  <br />tecnologia de ponta e atendimento de qualidade.</p>
      <p className=" text-lg space-y-3 font-semibold text-black">Nosso compromisso é oferecer uma experiência de transporte <br /> acessível, confortável e confiável. Valorizamos o tempo dos  <br />nossos clientes, por isso investimos em inovação, agilidade <br /> e um suporte sempre presente.</p>
     
      </article>
      <div className="mt-14">
        <img className="w-130 h-80 mb-18" 
          src="https://cdn.discordapp.com/attachments/1361678570530803724/1384844706319437844/Screenshot_2025-06-18_102556.png?ex=6853e8a3&is=68529723&hm=8add3dfe105f85ab0507b0fb4f8540e84dcb089f0b7c01e191555e5789af7aac&"
          alt="showroom image"
        />
      </div>
     </div>
  )
};