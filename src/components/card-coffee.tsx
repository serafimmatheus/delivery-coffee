"use client";

import { Coffee } from "@prisma/client";
import { Badge, Button } from "antd";
import Image from "next/image";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";

interface CardCoffeeProps {
  coffee: Coffee;
}

const CardCoffee = ({ coffee }: CardCoffeeProps) => {
  const [qntCart, setQtdCart] = useState(0);

  const addQntCart = () => {
    setQtdCart((prev) => prev + 1);
  };

  const removeQntCart = () => {
    if (qntCart === 0) return;

    setQtdCart(qntCart - 1);
  };

  return (
    <>
      <div className="bg-gray-300 w-[256px] flex flex-col items-center p-8 relative rounded-tl-[6px] rounded-tr-[36px] rounded-bl-[36px] rounded-br-[6px]">
        <Image
          src={coffee.coverImage}
          alt="Café"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[120px] h-[120px] absolute -top-8"
        />

        <div className="flex flex-col items-center pt-20">
          <div className="flex flex-row gap-4">
            <Badge className="bg-orange-50 p-2">
              <span className="uppercase text-xs font-medium text-orange-700">
                Tradicional
              </span>
            </Badge>

            <Badge className="bg-orange-50 p-2">
              <span className="uppercase text-xs font-medium text-orange-700">
                Gelado
              </span>
            </Badge>
          </div>

          <h4 className="text-xl font-medium pt-5 pb-2">{coffee.name}</h4>

          <p className="text-sm font-light text-center pb-8">
            {coffee.description}
          </p>

          <div className="flex justify-between w-full">
            <span>
              {Number(coffee.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                icon={<MinusOutlined />}
                onClick={removeQntCart}
              />
              <button>{qntCart}</button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addQntCart}
              />
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={addQntCart}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCoffee;
