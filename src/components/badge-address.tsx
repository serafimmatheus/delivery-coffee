import { prismaClient } from "@/lib/prisma";
import { Badge } from "antd";
import { MapPin } from "@phosphor-icons/react/dist/ssr";

interface BadgeAddressProps {
  userId: string;
}

const BadgeAddress = async ({ userId }: BadgeAddressProps) => {
  const adress = await prismaClient.address.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <Badge className="bg-purple-100 p-2 rounded-lg flex items-center gap-2">
      <MapPin size={22} color="#4B2995" weight="fill" />
      <span className="text-sm text-purple-700">
        {adress[0].cidade} - {adress[0].estado}
      </span>
    </Badge>
  );
};

export default BadgeAddress;
