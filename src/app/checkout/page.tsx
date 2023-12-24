"use client";
import CartItems from "@/components/cart-items";
import { api } from "@/lib/axios";
import { useCart } from "@/provider/cart/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Radio, RadioChangeEvent } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { EnvironmentOutlined } from "@ant-design/icons";
import { SelectCommonPlacement } from "antd/es/_util/motion";
import { createOrderProducts } from "@/actions/create-order-products.actions";
import { useAuthProviver } from "@/provider/auth/auth";

const schemaData = z.object({
  cep: z.string({ required_error: "CEP é obrigatório" }),
  rua: z.string({ required_error: "Rua é obrigatório" }),
  numero: z.string({ required_error: "Número é obrigatório" }),
  complemento: z.string().optional(),
  bairro: z.string({ required_error: "Bairro é obrigatório" }),
  cidade: z.string({ required_error: "Cidade é obrigatório" }),
  estado: z.string({ required_error: "Estado é obrigatório" }),
});

type FormData = z.infer<typeof schemaData>;

type IPropsSelectCommonPlacement = "dinheiro" | "debito" | "credito" | "pix";

interface Endereco {
  street: string;
  complement: string;
  district: string;
  districtId: number;
  city: string;
  cityId: number;
  ibgeId: number;
  state: string;
  stateShortname: string;
  zipcode: string;
}

const CheckoutPage = () => {
  const [endereco, setEndereco] = useState<Endereco>();
  const [cep, setCep] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnderecoCompleted, setIsEnderecoCompleted] = useState(false);
  const { user } = useAuthProviver();

  const { cart, TotalItens, TotalPrice, delivery } = useCart();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schemaData),
    defaultValues: {
      cep: endereco?.zipcode,
      rua: endereco?.street,
      numero: "",
      complemento: "",
      bairro: endereco?.district,
      cidade: endereco?.city,
      estado: endereco?.stateShortname,
    },
    values: {
      cep: endereco?.zipcode ?? "",
      rua: endereco?.street ?? "",
      numero: "",
      complemento: "",
      bairro: endereco?.district ?? "",
      cidade: endereco?.city ?? "",
      estado: endereco?.stateShortname ?? "",
    },
  });

  const handleOnSubmit = async (data: FormData) => {
    await createOrderProducts(cart, user?.id ?? "", data);
  };

  const [placement, SetPlacement] =
    useState<IPropsSelectCommonPlacement>("dinheiro");

  const placementChange = (e: RadioChangeEvent) => {
    SetPlacement(e.target.value);
  };

  useEffect(() => {
    setIsLoaded(true);
    const fetchCep = async () => {
      await api
        .get(`/${cep}`)
        .then((response) => {
          setEndereco(response.data.result);
          setIsLoaded(false);
        })
        .catch((error) => {
          setIsLoaded(true);

          setEndereco({} as any);
        })
        .finally(() => {
          setIsLoaded(false);
        });
    };

    fetchCep();
  }, [cep]);

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="p-8 max-w-[1440px] mx-auto mt-5"
    >
      <div className="flex flex-col md:flex-row md:gap-5">
        <div className="flex flex-col gap-5 md:w-2/3">
          <div>
            <h2 className="text-lg font-bold">Complete seu pedido</h2>

            <div className="p-10 bg-gray-200 rounded-lg">
              <div className="flex gap-2 items-start">
                <EnvironmentOutlined className="mt-1" />

                <div className="mb-5">
                  <h3 className="text-gray-800">Endereço de Entrega</h3>
                  <p className="text-sm text-gray-700">
                    Informe o endereço onde deseja receber seu pedido
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <Controller
                    control={control}
                    name="cep"
                    render={({ field }) => (
                      <Input
                        {...field}
                        size="large"
                        placeholder="CEP"
                        status={errors.cep ? "error" : undefined}
                        type="text"
                        onChangeCapture={(e: any) => setCep(e.target.value)}
                        className="bg-gray-300"
                      />
                    )}
                  />

                  {errors.cep && (
                    <p className="text-xs text-purple-500 ml-2 mt-1">
                      {errors.cep?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Controller
                    control={control}
                    name="rua"
                    render={({ field }) => (
                      <Input
                        disabled={isLoaded}
                        {...field}
                        size="large"
                        placeholder="Rua"
                        status={errors.rua ? "error" : undefined}
                        type="text"
                        defaultValue={endereco?.street}
                        className="bg-gray-300"
                      />
                    )}
                  />
                  {errors.rua && (
                    <p className="text-xs text-purple-500 ml-2 mt-1">
                      {errors.rua?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="numero"
                      render={({ field }) => (
                        <Input
                          disabled={isLoaded}
                          {...field}
                          size="large"
                          placeholder="Número"
                          status={errors.numero ? "error" : undefined}
                          type="text"
                          className="bg-gray-300"
                        />
                      )}
                    />
                    {errors.numero && (
                      <p className="text-xs text-purple-500 ml-2 mt-1">
                        {errors.numero?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col flex-1">
                    <Controller
                      control={control}
                      name="complemento"
                      render={({ field }) => (
                        <Input
                          disabled={isLoaded}
                          {...field}
                          size="large"
                          placeholder="Complemento"
                          status={errors.complemento ? "error" : undefined}
                          type="text"
                          className="bg-gray-300"
                        />
                      )}
                    />
                    {errors.complemento && (
                      <p className="text-xs text-purple-500 ml-2 mt-1">
                        {errors.complemento?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="bairro"
                      render={({ field }) => (
                        <Input
                          disabled={isLoaded}
                          {...field}
                          size="large"
                          placeholder="Bairro"
                          status={errors.bairro ? "error" : undefined}
                          type="text"
                          value={endereco?.district}
                          className="bg-gray-300"
                        />
                      )}
                    />
                    {errors.bairro && (
                      <p className="text-xs text-purple-500 ml-2 mt-1">
                        {errors.bairro?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="cidade"
                      render={({ field }) => (
                        <Input
                          disabled={isLoaded}
                          {...field}
                          size="large"
                          placeholder="Cidade"
                          status={errors.cidade ? "error" : undefined}
                          type="text"
                          value={endereco?.city}
                          className="bg-gray-300"
                        />
                      )}
                    />

                    {errors.cidade && (
                      <p className="text-xs text-purple-500 ml-2 mt-1">
                        {errors.cidade?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="estado"
                      render={({ field }) => (
                        <Input
                          disabled={isLoaded}
                          {...field}
                          size="large"
                          placeholder="Estado"
                          status={errors.estado ? "error" : undefined}
                          type="text"
                          value={endereco?.stateShortname}
                          className="bg-gray-300"
                        />
                      )}
                    />

                    {errors.estado && (
                      <p className="text-xs text-purple-500 ml-2 mt-1">
                        {errors.estado?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 bg-gray-200 rounded-lg">
            <div className="flex gap-2 items-start">
              <EnvironmentOutlined className="mt-1" />

              <div className="mb-5">
                <h3 className="text-gray-800">Pagamento</h3>
                <p className="text-sm text-gray-700">
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </div>

            <div>
              <Radio.Group
                value={placement}
                onChange={placementChange}
                className="flex justify-between w-full gap-10"
              >
                <Radio.Button
                  value="pix"
                  className="flex p-4 w-full h-full rounded-lg items-center justify-center bg-gray-300"
                >
                  PIX
                </Radio.Button>
                <Radio.Button
                  className="flex p-4 w-full h-full rounded-lg items-center justify-center bg-gray-300"
                  value="dinheiro"
                >
                  Dinheiro
                </Radio.Button>
                <Radio.Button
                  className="flex p-4 w-full h-full rounded-lg items-center justify-center bg-gray-300"
                  value="credito"
                >
                  Cartão de Crédito
                </Radio.Button>
                <Radio.Button
                  className="flex p-4 w-full h-full rounded-lg items-center justify-center bg-gray-300"
                  value="debito"
                >
                  Cartão de Débito
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-bold">Cafés selecionados</h2>

          <div>
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

                {endereco?.street ? (
                  <Button
                    htmlType="submit"
                    className="w-full mt-4 bg-gray-300 flex items-center gap-1 justify-center text-base font-semibold"
                  >
                    Finalizar Pedido
                  </Button>
                ) : (
                  <Button
                    disabled={!isEnderecoCompleted}
                    className="w-full mt-4 bg-gray-300 flex items-center gap-1 justify-center text-base font-semibold"
                  >
                    Complete seu endereço
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col w-full h-full items-center mt-10 border border-dashed border-purple-500 p-8 animate-pulse">
                <p>Nenhum produto encontrado</p>
                <Link href="/">
                  <Button>Adicionar produtos</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
