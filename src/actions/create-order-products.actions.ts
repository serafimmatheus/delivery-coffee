"use server";

import { prismaClient } from "@/lib/prisma";
import { CoffeeWithQuantity } from "@/provider/cart/cart";
import { Address } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createOrderProducts = async (
  data: CoffeeWithQuantity[],
  userId: string,
  address: Partial<Address>
) => {
  const product = await prismaClient.order.create({
    data: {
      userId,
      orderProduct: {
        createMany: {
          data: data.map((coffee) => {
            return {
              quantity: coffee.quantity || 1,
              basePrice: coffee.price,
              productId: coffee.id,
            };
          }),
        },
      },
    },
  });

  const addressCreated = await prismaClient.address.create({
    data: {
      cep: address.cep || "",
      bairro: address.bairro || "",
      cidade: address.cidade || "",
      complemento: address.complemento,
      estado: address.estado || "",
      numero: address.numero || "",
      rua: address.rua || "",
      userId,
    },
  });

  if (!product || !addressCreated) {
    redirect("/error-payment");
  }

  revalidatePath("/");

  redirect("/success");
};
