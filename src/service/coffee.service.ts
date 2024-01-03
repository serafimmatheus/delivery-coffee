import { Product } from "@/app/dashboard/page";
import { prismaClient } from "@/lib/prisma";

export async function createCoffee(data: Product) {
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

  return product;
}

export async function updateCoffee(data: Product, id: string) {
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

  return product;
}

export async function deleteCoffee(id: string) {
  const product = await prismaClient.coffee.delete({
    where: {
      id,
    },
  });

  return product;
}
