"use client";

import { ShoppingCart, UserMinus } from "@phosphor-icons/react/dist/ssr";
import { Badge, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartDrawer from "./cart";
import { useAuthProviver } from "@/provider/auth/auth";
import { logout } from "@/actions/auth.actions";

const HeaderDesktop = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useAuthProviver();

  const showDrawer = () => {
    setOpen(true);
  };

  const signOutApp = async () => {
    await logout();
  };

  return (
    <div className="p-8 flex justify-between items-center max-w-[1440px] mx-auto w-full">
      <Link href="/">
        <Image
          src="/Logo.png"
          alt="Coffee Delivery"
          width={0}
          height={0}
          sizes="100vw"
          className="w-[85px]"
          quality={100}
        />
      </Link>

      <div className="flex gap-4">
        <div className="flex items-center">
          <button onClick={signOutApp}>
            <Badge className="bg-purple-100 p-2 rounded-lg flex items-center gap-2">
              <UserMinus size={22} color="#4B2995" weight="fill" />
              <span className="text-sm text-purple-700">
                {user ? <>Olá, {user.name}</> : "Olá, visitante!"}
              </span>
            </Badge>
          </button>
        </div>

        {/* <BadgeAddress userId={user?.id ?? ""} /> */}

        <Button
          onClick={showDrawer}
          size="large"
          className="bg-orange-50 p-2 rounded-lg flex items-center gap-2 border border-orange-700 hover:border-orange-500"
        >
          <ShoppingCart size={22} color="#C47F17" />
        </Button>

        <CartDrawer open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default HeaderDesktop;
