import { AxiosRequestConfig } from "axios";

export const fileUploadConfig = (file: File | string) => {
  const formData = new FormData();
  formData.append("document", file);

  const config: AxiosRequestConfig<FormData> = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return { formData, config };
};
