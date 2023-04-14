import './styles/globL.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const createUserFormSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleLowerCase().concat(word.substring(1))
      }).join(' ');
    }),
  email: z.string()
    .nonempty('O e-mail é obrigatorio')
    .email('Formato de e-mail invalido'),
  password: z.string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

function App() {
  const [output, setOutput] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2));
  };
  
  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <form 
        onSubmit={handleSubmit(createUser)} 
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input 
            type="text" 
            {...register('name')}
            className="border border-zinc-800 bg-zinc-900 text-white shadow-sm rounded h-10 px-3"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            {...register('email')}
            className="border border-zinc-800 bg-zinc-900 text-white shadow-sm rounded h-10 px-3"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            {...register('password')} 
            className="border border-zinc-800 bg-zinc-900 text-white shadow-sm rounded h-10 px-3"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        
        <button 
          type='submit'
          className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600'
        >
          Salvar
        </button>

      </form>

      <pre>{output}</pre>
    </main>
  )
}

export default App
