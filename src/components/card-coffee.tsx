"use client";

import { Badge, Button, notification } from "antd";
import Image from "next/image";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { CoffeeWithQuantity, useCart } from "@/provider/cart/cart";
import { deleteProduct } from "@/actions/create-products.actions";

interface CardCoffeeProps {
  coffee: CoffeeWithQuantity;
}

type NotificationType = "success" | "info" | "warning" | "error";

const CardCoffee = ({ coffee }: CardCoffeeProps) => {
  const [qntCart, setQtdCart] = useState(1);
  const [notifyContext, setNotifyContext] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    notifyContext[type]({
      message: `${coffee.name} adicionado ao carrinho!`,
      description:
        "Acesse o carrinho para finalizar o pedido ou continue comprando.",
      duration: 2,
      placement: "bottomRight",
    });
  };

  const { addToCart } = useCart();

  const addQntCart = () => {
    setQtdCart((prev) => prev + 1);
  };

  const removeQntCart = () => {
    if (qntCart === 0) return;

    setQtdCart(qntCart - 1);
  };

  const handleAddToCart = () => {
    addToCart({ ...coffee, quantity: qntCart });
  };

  const deleteCoffee = async () => {
    await deleteProduct(coffee.id);
  };

  return (
    <>
      {setNotifyContext}
      <div className="bg-gray-300 w-[256px] flex flex-col items-center p-8 relative rounded-tl-[6px] rounded-tr-[36px] rounded-bl-[36px] rounded-br-[6px] relative">
        <Image
          src={coffee.coverImage}
          alt="Café"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[120px] h-[120px] absolute -top-8 rounded-full object-cover"
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
                icon={<MinusOutlined color="#8047F8" />}
                onClick={removeQntCart}
              />
              <button>{qntCart}</button>

              <Button
                icon={<PlusOutlined color="#8047F8" />}
                onClick={addQntCart}
              />
              <Button
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  handleAddToCart();
                  openNotificationWithIcon("success");
                }}
              />
            </div>
          </div>
        </div>

        {/* {user?.role === "admin" && (
          <div
            onClick={deleteCoffee}
            className="absolute -top-2 -right-2 flex justify-center cursor-pointer"
          >
            <div className="bg-orange-50 rounded-full p-2 hover:bg-orange-500">
              <DeleteOutlined />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default CardCoffee;
