import { DownloadSimpleIcon } from '@phosphor-icons/react'

import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { Title } from '../../components/Title'
import { UrlCard } from '../../components/UrlCard'
import type { ShortUrl } from '../../interfaces/shortUrl'
import { useCreateShortUrlForm } from '../../hooks/useCreateShortUrlForm'
import { URL_WITH_SLASH } from '../../config/env'

export function Home() {
  const { register, onSubmit, errors } = useCreateShortUrlForm();

  const mockShortUrlList: Array<ShortUrl> = [
    {
      id: '1',
      key: 'abc123', // Example key for the short URL
      originalUrl: 'https://tailwindcss.com/',
      accessCount: 10,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      key: 'def456',
      originalUrl: 'https://reactjs.org/',
      accessCount: 5,
      createdAt: new Date().toISOString(),
    }
  ];

  return (
    <div className='w-[980px] flex flex-col gap-6 items-start'>
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
                {...register('originalUrl', { required: "URL original é obrigatório" })}
              />

              <Input 
                label='LINK ENCURTADO' 
                prefix={URL_WITH_SLASH} 
                error={errors.identifier?.message}
                {...register('identifier', { required: "URL encurtado é obrigatório" })}
              />
            </div>

            <Button type='submit' variant='primary'>Salvar link</Button>
          </form>
        </Card>

        <Card size='fill'>
          <div className='w-full flex flex-row justify-between items-center'>
            <Title>Meus links</Title>

            <Button 
              icon={<DownloadSimpleIcon size={16} />}
              variant='secondary'
            >
              Baixar CSV
            </Button>
          </div>

          {mockShortUrlList.length > 0 && (
            <ul className='w-full flex flex-col mt-4'>
              {mockShortUrlList.map(shortUrl => (
                <li key={shortUrl.id} className='w-full'>
                  <UrlCard baseUrl={URL_WITH_SLASH} shortUrl={shortUrl} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
