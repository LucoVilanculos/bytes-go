import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProductsById } from "../services/products";
import { Button } from "../components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import type { Product } from "../types/products";


export const Details = () => {


  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">
        Details Page
      </h1>
    </>
  
  );
};