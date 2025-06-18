import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useEmblaAutoPlay } from "../context/autoplay";




export const Products = () => {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  useEmblaAutoPlay(emblaApi, 4000);

  

  

  return (
    <div className="px-4 py-8">
      <div
        className="overflow-hidden max-w-[90%] mx-auto h-[500px] mb-6 rounded-xl"
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

    </div>
  );
};