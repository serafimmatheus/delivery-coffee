"use client";

import { useAuthProviver } from "@/provider/auth/auth";
import { useCart } from "@/provider/cart/cart";
import { Address } from "@prisma/client";
import {
  FieldTimeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

interface AddressSuccessProps {
  address: Address[];
}

const AddressSuccess = ({ address }: AddressSuccessProps) => {
  const { user } = useAuthProviver();
  const { clearCart } = useCart();

  const userAddress = address.filter((item) => item.userId === user?.id);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div>
      {userAddress.map((item) => {
        return (
          <div
            className="flex flex-col gap-10 p-8 border-2 border-orange-700 rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md"
            key={item.id}
          >
            <div className="flex gap-5">
              <div className="mt-1">
                <EnvironmentOutlined color="#8047F8" />
              </div>

              <div>
                <p className="text-xl">
                  Entrega em{" "}
                  <span className="font-bold">
                    {item.rua}, {item.numero}
                  </span>
                </p>
                <p className="text-xl">
                  {item.cidade} - {item.estado}
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="mt-1">
                <FieldTimeOutlined color="#8047F8" />
              </div>

              <div>
                <p className="text-xl">Previsão de entrega</p>
                <p className="text-xl font-bold">20 minutos - 30 minutos</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="mt-1">
                <DollarOutlined color="#8047F8" />
              </div>

              <div>
                <p className="text-xl">Pagamento na entrega</p>
                <p className="text-xl font-bold">PIX</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressSuccess;
