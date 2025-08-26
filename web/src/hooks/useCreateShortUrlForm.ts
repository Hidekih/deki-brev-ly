import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const schema = z.object({
  originalUrl: z
    .url('O link original é inválido')
    .nonempty('O link original é obrigatório'),
  name: z
    .string()
    .min(6, 'O link encurtado deve ter no mínimo 6 caracteres')
    .max(40, 'O link encurtado deve ter no máximo 40 caracteres')
    .nonempty('O link encurtado é obrigatório'),
});

type FormProps = z.infer<typeof schema>;

type UseCreateShortUrlFormProps = {
  onSubmitSuccess: (data: FormProps) => Promise<void>;
};

export const useCreateShortUrlForm = ({
  onSubmitSuccess,
}: UseCreateShortUrlFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>({
    resolver: standardSchemaResolver(schema),
  });

  const onSubmit: SubmitHandler<FormProps> = async (data: FormProps) => {
    try {
      await onSubmitSuccess({
        name: data.name,
        originalUrl: data.originalUrl,
      });

      reset();
    } catch (err: unknown) {
      console.error('Error creating short URL:', err);
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  };
};
