import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react'

import { useEmblaAutoPlay } from "../context/autoplay";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

type ProductLocal = {
  id: string;
  name: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
};



export const Home = () => {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  useEmblaAutoPlay(emblaApi, 4000);

  return (
    <>
      {/* Carrossel */}
      <div
        className="overflow-hidden max-w-[90%] mx-auto h-[500px] mb-10 rounded-xl"
        ref={emblaRef}
      >
        <div className="flex transition-transform duration-1000 ease-in-out">
          {[
            "https://industrieafrica.com/cdn/shop/collections/TB_HERO_A.jpg?v=1741949555&width=2880",
            "https://www.taibobacar.com/media/resort19-header.jpg",
            "https://www.taibobacar.com/media/TB-Bacars-Garden-001.jpg",
            "https://www.taibobacar.com/media/GRG-BLG-TS2-750x750.jpg",
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

     
    </>
  );
};

