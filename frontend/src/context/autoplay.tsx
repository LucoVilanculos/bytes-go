import { useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export const useEmblaAutoPlay = (emblaApi: EmblaCarouselType | undefined, delay = 4000) => {
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0); // volta pro início
      } else {
        emblaApi.scrollNext(); // vai pro próximo
      }
    }, delay);

    return () => clearInterval(interval);
  }, [emblaApi, delay]);
};
