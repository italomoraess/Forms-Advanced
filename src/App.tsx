import './styles/globL.css';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserFormSchema, CreateUserFormData } from './schemas/createUserFormSchema';

function App() {
  const [output, setOutput] = useState('');
  const { register, handleSubmit, formState: { errors }, control } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });
  const { fields, append, remove} = useFieldArray({
    control,
    name: 'techs'
  });

  function addNewTech(){
    append({title: '', knowledge: 0})
  };

  function createUser(data: CreateUserFormData) {
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
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            {...register('email')}
            className="border border-zinc-800 bg-zinc-900 text-white shadow-sm rounded h-10 px-3"
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            {...register('password')} 
            className="border border-zinc-800 bg-zinc-900 text-white shadow-sm rounded h-10 px-3"
          />
          {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className='flex items-center justify-between'>
            Tecnologias
            <button onClick={addNewTech} className='text-emerald-500 text-sm'>Adicionar</button>
          </label>
          {fields.map((field, index) => {
            return(
              <div key={field.id} className='flex gap-2'>
                <div className='flex flex-1 flex-col gap-1'>
                  <input 
                    type="text" 
                    {...register(`techs.${index}.title`)} 
                    className="border border-zinc-800 bg-zinc-900 text-white shadow-sm rounded h-10 px-3"
                  />

                  {errors.techs?.[index]?.title && <span className='text-red-500 text-sm'>{errors.techs?.[index]?.title?.message}</span>}
                </div>

                <div className='flex flex-col gap-1'>
                  <input 
                    type="number" 
                    {...register(`techs.${index}.knowledge`)}
                    className="w-16 border border-zinc-800 bg-zinc-900 text-white shadow-sm rounded h-10 px-3"
                  />

                  {errors.techs?.[index]?.knowledge && <span className='text-red-500 text-sm'>{errors.techs?.[index]?.knowledge?.message}</span>}  
                </div>
              </div>
            )
          })}

          {errors.techs && <span className='text-red-500 text-sm'>{errors.techs.message}</span>}  
          
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
