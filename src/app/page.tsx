import LinstingCardCoffee from "@/components/listing-card-coffee";
import { prismaClient } from "@/lib/prisma";
import {
  Coffee,
  Package,
  ShoppingCart,
  Timer,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "antd";
import Image from "next/image";
import { Suspense } from "react";

export default async function HomePage() {
  const coffees = await prismaClient.coffee.findMany({
    include: {
      coffeeToCategory: {
        include: {
          category: true,
        },
      },
    },
  });

  return (
    <div className="p-8 max-w-[1440px] mx-auto mt-5">
      <div className="flex justify-between gap-2 flex-col md:flex-row">
        <div className="flex flex-col w-full gap-5 md:w-1/2">
          <h2 className="text-4xl lg:text-5xl font-semibold">
            Encontre o café perfeito para qualquer hora do dia
          </h2>

          <p className="text-base lg:text-xl font-light">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8 lg:mt-16">
            <div className="flex items-center gap-4">
              <Badge className="bg-orange-700 p-2 rounded-full">
                <ShoppingCart size={22} color="#ffffff" />
              </Badge>

              <span>Compra simples e segura</span>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-gray-800 p-2 rounded-full">
                <Package size={22} color="#ffffff" />
              </Badge>

              <span>Embalagem mantém o café intacto</span>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-orange-500 p-2 rounded-full">
                <Timer size={22} color="#ffffff" />
              </Badge>

              <span>Entrega rápida e rastreada</span>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-purple-500 p-2 rounded-full">
                <Coffee size={22} color="#ffffff" />
              </Badge>

              <span>O café chega fresquinho até você</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full items-center md:mt-0 justify-center md:w-1/2">
          <Image
            src="/imagem.png"
            alt="Coffee delivery"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto"
          />
        </div>
      </div>

      <div className="mt-10 lg:mt-36">
        <h2 className="text-3xl font-semibold">Nossos cafés</h2>

        <Suspense fallback={"carregando..."}>
          <LinstingCardCoffee coffees={coffees} />
        </Suspense>
      </div>
    </div>
  );
}
