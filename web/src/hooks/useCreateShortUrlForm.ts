import { useForm, type SubmitHandler } from "react-hook-form";
import { URL_WITH_SLASH } from "../config/env";

interface FormProps {
  originalUrl: string;
  identifier: string;
}

export const useCreateShortUrlForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (rawData: FormProps) => {
    console.log("Form submitted with data:", rawData);

    const data = {
      originalUrl: URL_WITH_SLASH + rawData.originalUrl,
      identifier: rawData.identifier,
    }
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
  };
};