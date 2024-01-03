"use server";

import { Product } from "@/app/dashboard/page";
import {
  createCoffee,
  deleteCoffee,
  updateCoffee,
} from "@/service/coffee.service";
import { revalidatePath } from "next/cache";

export const createProduct = async (state: any, data: Product) => {
  try {
    const product = await createCoffee(data);

    if (!product) {
      return "Error ao criar produto";
    }

    revalidatePath("/");
  } catch (error) {
    return "Error ao criar produto";
  }
};

export const updateProduct = async (state: any, data: Product, id: string) => {
  const product = await updateCoffee(data, id);

  if (!product) {
    return "Error ao atualizar produto";
  }

  revalidatePath("/");
};

export const deleteProduct = async (state: any, id: string) => {
  const product = await deleteCoffee(id);

  if (!product) {
    return "Error ao deletar produto";
  }

  revalidatePath("/");
};
