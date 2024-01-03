"use client";

import { Badge, Button, Input, notification } from "antd";
import Image from "next/image";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { CoffeeWithQuantity, useCart } from "@/provider/cart/cart";
import { deleteProduct } from "@/actions/create-products.actions";
import { useAuthProviver } from "@/provider/auth/auth";
import { useFormState } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface CardCoffeeProps {
  coffee: CoffeeWithQuantity;
}

const schemaProducts = z.object({
  name: z.string({ required_error: "Nome do produto é obrigatório" }),
  description: z.string({
    required_error: "Descrição do produto é obrigatório",
  }),
  // coverImage: z.string().optional(),
  // price: z.string({ required_error: "Preço do produto é obrigatório" }),
});

const { TextArea } = Input;

export type Product = z.infer<typeof schemaProducts>;

type NotificationType = "success" | "info" | "warning" | "error";

const CardCoffee = ({ coffee }: CardCoffeeProps) => {
  const [qntCart, setQtdCart] = useState(1);
  const [notifyContext, setNotifyContext] = notification.useNotification();
  const { user } = useAuthProviver();
  const [editAdmin, setEditAdmin] = useState(true);

  const [state, formAction] = useFormState(deleteProduct, null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(schemaProducts),
    defaultValues: {
      name: coffee.name,
      description: coffee.description,
    },
    values: {
      name: coffee.name,
      description: coffee.description,
    },
  });

  const openNotificationWithIcon = (type: NotificationType) => {
    notifyContext[type]({
      message: `${coffee.name} adicionado ao carrinho!`,
      description:
        "Acesse o carrinho para finalizar o pedido ou continue comprando.",
      duration: 3,
      placement: "bottomRight",
    });
  };

  const openNotificationDeletedWithIcon = (type: NotificationType) => {
    notifyContext[type]({
      message: `${coffee.name} deletado!`,
      description: "O produto foi deletado com sucesso.",
      duration: 3,
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

  const handleEditAdmin = () => {
    setEditAdmin(!editAdmin);
  };

  const deleteCoffee = async () => {
    formAction(coffee.id);

    openNotificationDeletedWithIcon("success");
  };

  return (
    <>
      {setNotifyContext}
      <div className="bg-gray-300 w-[256px] flex flex-col items-center p-6 rounded-tl-[6px] rounded-tr-[36px] rounded-bl-[36px] rounded-br-[6px] relative">
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

          {/* <h4 className="text-xl font-medium pt-5 pb-2">{coffee.name}</h4> */}

          <Controller
            control={control}
            name="name"
            disabled={editAdmin}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="Nome do produto"
                status={errors.name ? "error" : undefined}
                type="text"
                className="bg-gray-300 text-lg disabled:text-lg disabled:mt-4 mt-4 disabled:bg-transparent disabled:border-0 disabled:text-gray-800 disabled:text-center disabled:cursor-default"
                disabled={editAdmin}
                defaultValue={coffee.name}
              />
            )}
          />

          {/* <p className="text-sm font-light text-center pb-8">
            {coffee.description}
          </p> */}

          <Controller
            control={control}
            name="description"
            disabled={editAdmin}
            render={({ field }) => (
              <TextArea
                {...field}
                size="large"
                placeholder="Descrição do produto"
                status={errors.description ? "error" : undefined}
                className="bg-gray-300 resize-none mb-8 text-md whitespace-normal disabled:whitespace-normal disabled:text-md mt-2 disabled:mt-2  disabled:h-32 w-full disabled:w-full disabled:bg-transparent disabled:border-0 disabled:text-gray-800 disabled:cursor-default"
                disabled={editAdmin}
                defaultValue={coffee.description}
              />
            )}
          />

          <div className="flex justify-between w-full">
            <span>
              {Number(coffee.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            {editAdmin && (
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
            )}
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="absolute -top-2 -right-2 flex justify-center cursor-pointer gap-2">
            <div
              onClick={() => {
                handleEditAdmin();
              }}
              className="bg-orange-50 rounded-full p-2 hover:bg-orange-500"
            >
              <EditOutlined />
            </div>

            <div
              onClick={deleteCoffee}
              className="bg-orange-50 rounded-full p-2 hover:bg-orange-500"
            >
              <DeleteOutlined />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardCoffee;
