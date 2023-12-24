import { useCart } from "@/provider/cart/cart";
import { Button, Drawer } from "antd";
import CartItems from "./cart-items";
import { CheckOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartDrawer = ({ open, setOpen }: CartDrawerProps) => {
  const onClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  const { cart, TotalItens, TotalPrice, delivery } = useCart();

  return (
    <Drawer
      className="flex flex-col"
      title="Carrinho"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <div className="flex flex-col flex-1 gap-y-2 overflow-y-auto">
        {cart.map((item) => (
          <CartItems key={item.id} coffee={item} />
        ))}
      </div>

      {cart.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>
              {TotalItens.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Entrega:</p>
            <p>
              {delivery.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Total:</p>
            <p>
              {(TotalPrice + delivery).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <Button
            onClick={() => router.push("/checkout")}
            className="w-full mt-4 bg-gray-300 flex items-center gap-1 justify-center text-base font-semibold"
          >
            <CheckOutlined />
            Ir para o pagamento
          </Button>
        </div>
      ) : (
        <p>Nenhum produto adicionado ao carrinho</p>
      )}
    </Drawer>
  );
};

export default CartDrawer;
