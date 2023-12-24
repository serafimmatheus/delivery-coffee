import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import AddressSuccess from "./components/address-success";

const PageSuccess = async () => {
  const userAddres = await prismaClient.address.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-[1440px] mx-auto p-8">
      <h1 className="text-3xl text-orange-700 font-extrabold">
        Uhu! Pedido confirmado
      </h1>
      <p className="text-xl font-normal">
        Agora é só aguardar que logo o café chegará até você
      </p>

      <div className="mt-8 flex justify-between items-center gap-10">
        <div className="w-1/2">
          <AddressSuccess address={userAddres} />
        </div>
        <div className="w-1/2 flex justify-end">
          <Image
            src="/success.png"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-[300px] sm:w-[490px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PageSuccess;
