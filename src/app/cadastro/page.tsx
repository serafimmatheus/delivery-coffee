"use client";
import { Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import createAccount from "@/actions/auth.actions";

const schemaRegister = z.object({
  email: z
    .string({ required_error: "E-mail inválido." })
    .email({ message: "E-mail inválido." }),
  name: z.string({ required_error: "Nome inválido." }),
  password: z
    .string({ required_error: "Senha inválida." })
    .min(6, { message: "Min 6 caracteres." }),
});

export type RegisterType = z.infer<typeof schemaRegister>;

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(schemaRegister),
  });

  const onSubmitLogin = (data: RegisterType) => {
    console.log(data);

    createAccount(data);
  };

  return (
    <div className="max-w-[1440px] mx-auto p-8">
      <div className="max-w-md mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold">Registrar-se</h1>
          <p className="text-gray-600 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label>Email</label>

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Email"
                    prefix={<UserOutlined />}
                    status={errors.email ? "error" : undefined}
                  />
                )}
              />

              <p className="text-purple-500 text-xs ml-2">
                {errors.email?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label>Nome</label>

              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Nome"
                    prefix={<UserOutlined />}
                    status={errors.name ? "error" : undefined}
                  />
                )}
              />

              <p className="text-purple-500 text-xs ml-2">
                {errors.email?.message}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label>Senha</label>

              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Senha"
                    prefix={<UserOutlined />}
                    status={errors.password ? "error" : undefined}
                    type="password"
                  />
                )}
              />

              <p className="text-purple-500 text-xs ml-2">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <span>Já possui conta?</span>
              <Link href="/login" className="text-purple-500 text-xs">
                Clique aqui!
              </Link>
            </div>

            <Button htmlType="submit">Entrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
