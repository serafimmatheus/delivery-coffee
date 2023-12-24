"use server";

import { Product } from "@/app/dashboard/page";
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async (state: any, data: Product) => {
  const { name, price, description, coverImage } = data;

  const slugModify = name.toLowerCase().replace(/\s+/g, "-");

  const product = await prismaClient.coffee.create({
    data: {
      name,
      price: Number(price),
      description,
      slug: slugModify,
      coverImage: coverImage || "",
    },
  });

  if (!product) {
    return "Error ao criar produto";
  }

  revalidatePath("/");
};

export const updateProduct = async (state: any, data: Product, id: string) => {
  const { name, price, description, coverImage } = data;

  const slugModify = name.toLowerCase().replace(/\s+/g, "-");

  const product = await prismaClient.coffee.update({
    where: {
      id,
    },
    data: {
      name,
      price: Number(price),
      description,
      slug: slugModify,
      coverImage,
    },
  });

  if (!product) {
    return "Error ao atualizar produto";
  }

  revalidatePath("/");
};

export const deleteProduct = async (id: string) => {
  const product = await prismaClient.coffee.delete({
    where: {
      id,
    },
  });

  if (!product) {
    return "Error ao deletar produto";
  }

  revalidatePath("/");
};
