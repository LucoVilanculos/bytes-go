import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react'
import { useEmblaAutoPlay } from "../context/autoplay";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const fetchFaqs = async () => [
  {
    question: "Como faço para me registrar?",
    answer: "Clique no botão Registrar e preencha o formulário com seus dados.",
  },
  {
    question: "Como funciona o serviço?",
    answer: "Você pode solicitar corridas, acompanhar motoristas e muito mais pelo nosso app.",
  },
  {
    question: "Quais cidades atendem?",
    answer: "Atualmente, atendemos Maputo e região metropolitana.",
  },
];

export const Home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  useEmblaAutoPlay(emblaApi, 4000);
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    fetchFaqs().then(setFaqs);
  }, []);

  return (
    <>
      <div
        className="overflow-hidden max-w-[90%] mx-auto h-[500px] mb-10 rounded-xl"
        ref={emblaRef}
      >
        <div className="flex transition-transform duration-1000 ease-in-out">
          {[
            "https://cdn.discordapp.com/attachments/1381743102145986672/1384827186162438154/3271952.jpg?ex=6853d852&is=685286d2&hm=a124b56434bf4d2ab22a621732a6bb13584018bc6836e5e5cd74cf0670971d03&",
            "https://cdn.discordapp.com/attachments/1381743102145986672/1384827185814179941/uber-stats.png?ex=6853d851&is=685286d1&hm=504a6cffff36ae7ff45bb8834163b3839472573bdc49ec51eb539c926279d434&",
            "https://cdn.discordapp.com/attachments/1361678570530803724/1384844706319437844/Screenshot_2025-06-18_102556.png?ex=6853e8a3&is=68529723&hm=8add3dfe105f85ab0507b0fb4f8540e84dcb089f0b7c01e191555e5789af7aac&0",
          ].map((img, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center px-2"
            >
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="h-[500px] object-cover rounded-xl shadow-md w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-6 mb-10">
        <Button
          className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-800 transition"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/register")}
        >
          Registrar
        </Button>
      </div>

      <div className="flex flex-col items-center mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Atuação em Maputo</h2>
        <img
          src="https://cdn.discordapp.com/attachments/1361678570530803724/1384844706319437844/Screenshot_2025-06-18_102556.png?ex=6853e8a3&is=68529723&hm=8add3dfe105f85ab0507b0fb4f8540e84dcb089f0b7c01e191555e5789af7aac&"
          alt="Mapa de Maputo"
          className="w-full max-w-2xl rounded-xl shadow-lg border-4 border-blue-900"
          style={{ objectFit: "cover", minHeight: 250, background: "#1e3c72" }}
        />
      </div>

      {/* FAQs */}
      <div className="max-w-5xl mx-auto mb-16 p-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-white/90 border-blue-100 shadow-lg hover:scale-105 transition">
                <CardHeader>
                  <CardTitle className="text-blue-900 text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800">{faq.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};