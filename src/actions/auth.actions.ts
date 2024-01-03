"use server";
import { RegisterType } from "@/app/cadastro/page";
import { LoginType } from "@/app/login/page";
import { prismaClient } from "@/lib/prisma";
import {
  createSessionToken,
  destroySessionToken,
  getSessionToken,
} from "@/service/auth.service";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const createAccount = async (data: RegisterType) => {
  const { email, name, password } = data;

  const passwordHash = await bcrypt.hash(password, 10);

  await prismaClient.user.create({
    data: {
      email,
      name,
      password: passwordHash,
    },
  });

  redirect("/login");
};

export const login = async (state: any, data: LoginType) => {
  const { email, password } = data;

  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    // TODO: Usar optimistic update
    return {
      error: "Incorrect login/password",
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      error: "Incorrect login/password",
    };
  }

  const newData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  await createSessionToken(newData);

  redirect("/dashboard");
};

export const myToken = async () => {
  const token = await getSessionToken();

  return token;
};

export const logout = async () => {
  await destroySessionToken();

  redirect("/login");
};

export default createAccount;
