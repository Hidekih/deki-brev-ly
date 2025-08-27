import { DownloadSimpleIcon } from '@phosphor-icons/react'

import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { ShortUrlList } from '../../components/ShortUrlList'
import { Title } from '../../components/Title'
import { URL_WITH_SLASH } from '../../config/env'
import { useCreateShortUrlForm } from '../../hooks/useCreateShortUrlForm'
import { useShortUrlList } from '../../hooks/useShortUrlList'
import { createShortUrl } from '../../http/createShortUrl'
import { exportShortUrl } from '../../http/exportShortUrl'

export function Home() {
  const { shortUrls, refetch } = useShortUrlList();

  const { register, onSubmit, isSubmitting, errors } = useCreateShortUrlForm({
    onSubmitSuccess: async (data) => {
      try {
        await createShortUrl({
          name: data.name,
          originalUrl: data.originalUrl,
        });

        await refetch();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleDownloadShortUrlReport = async () => {
    try {
      const { url } = await exportShortUrl();
      try {
        const a = document.createElement("a");
        a.href = url;
        // a.download = fileName ?? "name_file";

        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Erro ao baixar arquivo:", error);
      }


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full lg:w-[980px] flex flex-col gap-6 items-start'>
      <img src="/logo.svg" alt="Logo Brev.ly" className="h-6" />

      <div className='w-full flex flex-col lg:flex-row gap-5 items-start'>
        <Card size='md'>
          <form onSubmit={onSubmit} className='w-full flex flex-col gap-6'>
            <Title>Novo link</Title>

            <div className='w-full flex flex-col gap-4'>
              <Input
                label='LINK ORIGINAL'
                placeholder='https://tailwindcss.com/'
                error={errors.originalUrl?.message}
                {...register('originalUrl')}
              />

              <Input
                label='LINK ENCURTADO'
                prefix={URL_WITH_SLASH}
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            <Button type='submit' disabled={isSubmitting} variant='primary'>Salvar link</Button>
          </form>
        </Card>

        <Card size='fill'>
          <div className='w-full flex flex-row justify-between items-center'>
            <Title>Meus links</Title>

            <Button
              icon={<DownloadSimpleIcon size={16} />}
              variant='secondary'
              disabled={shortUrls.length === 0}
              onClick={handleDownloadShortUrlReport}
            >
              Baixar CSV
            </Button>
          </div>

          <ShortUrlList list={shortUrls} />

          {/* <button onClick={() => fetchNextPage()}>NextPage</button> */}
        </Card>
      </div>
    </div>
  )
}
