"use client";
import { Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { login } from "@/actions/auth.actions";
import { useFormState, useFormStatus } from "react-dom";
import { notification } from "antd";

const schemaLogin = z.object({
  email: z
    .string({ required_error: "E-mail inválido." })
    .email({ message: "E-mail inválido." }),
  password: z
    .string({ required_error: "Senha inválida." })
    .min(6, { message: "Min 6 caracteres." }),
});

export type LoginType = z.infer<typeof schemaLogin>;

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(schemaLogin),
  });

  const [toast, contextHolder] = notification.useNotification();

  const [state, formAction] = useFormState(login, null);

  const onSubmitLogin = async (data: LoginType) => {
    formAction(data);

    if (state?.error) {
      toast["error"]({
        message: "Erro ao fazer login.",
        description: "E-mail ou senha inválidos.",
      });
    } else {
      toast["success"]({
        message: "Login realizado com sucesso.",
        description: "Seja bem-vindo.",
      });
    }
  };

  return (
    <>
      {contextHolder}

      <div className="max-w-[1440px] mx-auto p-8">
        <div className="max-w-md mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold">Login</h1>
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

              <Button disabled={isSubmitting} htmlType="submit">
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>

              <div className="flex items-center gap-2 justify-end">
                <span> Não possui conta?</span>
                <Link href="/cadastro" className="text-purple-500 text-xs">
                  Clique aqui!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
