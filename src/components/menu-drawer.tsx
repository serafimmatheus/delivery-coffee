import { Drawer } from "antd";
import { AppstoreOutlined, FileTextOutlined } from "@ant-design/icons";
import Link from "next/link";

interface MenuDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MenuDrawer = ({ open, setOpen }: MenuDrawerProps) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      className="flex flex-col"
      title="Menu"
      placement="right"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col flex-1 gap-y-2 overflow-y-auto">
        <Link href="/dashboard">
          <div
            onClick={() => {
              onClose();
            }}
            className="flex items-center gap-2"
          >
            <AppstoreOutlined />

            <span className="text-sm">Painel</span>
          </div>
        </Link>

        <Link href="/orders">
          <div
            onClick={() => {
              onClose();
            }}
            className="flex items-center gap-2"
          >
            <FileTextOutlined />

            <span className="text-sm">Pedidos</span>
          </div>
        </Link>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
