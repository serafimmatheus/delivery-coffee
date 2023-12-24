import { CoffeeWithQuantity, useCart } from "@/provider/cart/cart"; 
import { Button } from "antd";
import Image from "next/image";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface CartItemsProps {
  coffee: CoffeeWithQuantity;
}

const CartItems = ({ coffee }: CartItemsProps) => {
  const { removeFromCart, decreaseProductQuantity, addToCart } = useCart();
  return (
    <>
      <div className="flex justify-between bg-gray-400 p-4 rounded-lg h-24">
        <div className="flex gap-2">
          <Image
            src={coffee.coverImage}
            alt={coffee.name}
            width={0}
            height={0}
            sizes="100vw"
            className="max-w-[64px] max-h-[64px] w-full h-full object-cover"
          />

          <div className="flex flex-col gap-2">
            <h4 className="text-base">{coffee.name}</h4>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <Button
                  className="text-xs"
                  icon={<MinusOutlined color="#8047F8" />}
                  onClick={() => decreaseProductQuantity(coffee.id)}
                />
                <button className="text-xs">{coffee.quantity}</button>

                <Button
                  className="text-xs"
                  icon={<PlusOutlined />}
                  onClick={() => addToCart(coffee)}
                />
              </div>
              <Button
                onClick={() => removeFromCart(coffee)}
                className="text-xs"
                icon={<DeleteOutlined color="#8047F8" />}
              >
                Remover
              </Button>
            </div>
          </div>
        </div>

        <div>
          <span className="text-base font-bold">
            {Number(coffee.price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </>
  );
};

export default CartItems;
