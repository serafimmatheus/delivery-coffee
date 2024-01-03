"use client";

import { Coffee } from "@prisma/client";
import CardCoffee from "./card-coffee";
import { useAuthProviver } from "@/provider/auth/auth";
import { Button } from "antd";
import { useRouter } from "next/navigation";

interface LinstingCardCoffeeProps {
  coffees: Coffee[];
}

const LinstingCardCoffee = ({ coffees }: LinstingCardCoffeeProps) => {
  const { user } = useAuthProviver();
  const router = useRouter();
  return (
    <>
      {coffees.length === 0 ? (
        <div className="mt-8 border border-dashed border-purple-700 flex flex-col p-8 justify-center items-center">
          <p className="text-2xl font-semibold">No was data found!</p>

          {user?.role === "admin" && (
            <Button
              type="primary"
              className="mt-5 text-gray-100 bg-purple-500"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Create a new product
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-20 mb-20 gap-y-20 gap-x-2 justify-center items-center">
          {coffees.map((coffee) => (
            <CardCoffee key={coffee.id} coffee={coffee} />
          ))}
        </div>
      )}
    </>
  );
};

export default LinstingCardCoffee;
