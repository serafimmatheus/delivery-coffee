"use client";

import { createProduct } from "@/actions/create-products.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Upload, notification } from "antd";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";

const { TextArea } = Input;

type NotificationType = "success" | "info" | "warning" | "error";

const schemaProducts = z.object({
  name: z.string({ required_error: "Nome do produto é obrigatório" }),
  description: z.string({
    required_error: "Descrição do produto é obrigatório",
  }),
  coverImage: z.string().optional(),
  price: z.string({ required_error: "Preço do produto é obrigatório" }),
});

export type Product = z.infer<typeof schemaProducts>;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const DashboardPage = () => {
  const [progress, setProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(schemaProducts),
  });

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(createProduct, null);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Produto cadastrado com sucesso.",
      description: "Produto cadastrado com sucesso.",
    });
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmitFormProducts = (data: Product) => {
    const storageRef = ref(storage, `products/${fileList[0].name}`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      fileList[0].originFileObj as Blob
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const product = { ...data, coverImage: url };
          formAction(product);
          openNotificationWithIcon(state ? "error" : "success");
          reset();
          setFileList([]);
        });
      }
    );
  };

  return (
    <>
      {contextHolder}
      <div className="max-w-[1440px] mx-auto p-8">
        <div>
          <h1 className="text-orange-700 font-extrabold text-2xl mb-5">
            Criar novo Coffee
          </h1>

          <form
            className="max-w-md flex flex-col gap-4 bg-gray-400 rounded-lg p-4"
            onSubmit={handleSubmit(handleSubmitFormProducts)}
          >
            <div>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <Image
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>

            <div>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Nome do produto"
                    status={errors.name ? "error" : undefined}
                    type="text"
                    className="bg-gray-300"
                  />
                )}
              />

              {errors.name && (
                <p className="text-xs text-purple-500 ml-2 mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextArea
                    {...field}
                    size="large"
                    placeholder="Descrição do produto"
                    status={errors.description ? "error" : undefined}
                    className="bg-gray-300"
                  />
                )}
              />

              {errors.description && (
                <p className="text-xs text-purple-500 ml-2 mt-1">
                  {errors.description?.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Preço do produto"
                    status={errors.price ? "error" : undefined}
                    type="text"
                    className="bg-gray-300"
                  />
                )}
              />

              {errors.price && (
                <p className="text-xs text-purple-500 ml-2 mt-1">
                  {errors.price?.message}
                </p>
              )}
            </div>

            <Button disabled={pending} htmlType="submit">
              {pending ? "Cadastrando..." : "Cadastrar Produto"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
