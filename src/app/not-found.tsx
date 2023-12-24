import { Button } from "antd";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80dvh] flex-1">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg font-light mt-3">
        Ops, Não encontramos essa página
      </p>
      <Link className="mt-10" href="/">
        <Button>Voltar para Home</Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
