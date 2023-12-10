import { MapPin, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "antd";
import Image from "next/image";
import Link from "next/link";

const HeaderDesktop = () => {
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
        <Badge className="bg-purple-100 p-2 rounded-lg flex items-center gap-2">
          <MapPin size={22} color="#4B2995" weight="fill" />
          <span className="text-sm text-purple-700">Porto Alegre - RS</span>
        </Badge>

        <Badge className="bg-orange-50 p-2 rounded-lg flex items-center gap-2">
          <ShoppingCart size={22} color="#C47F17" />
        </Badge>
      </div>
    </div>
  );
};

export default HeaderDesktop;
