import './styles/globL.css'

function App() {
  return (
    <main className='h-screen bg-zinc-50 flex items-center justify-center'>
      <form action="" className='flex flex-col'>
        <label htmlFor="">E-mail</label>
        <input type="email" name='email' />

        <label htmlFor="">Senha</label>
        <input type="passwordd" name='password' />

        <button type='submit'>Salvar</button>

      </form>
    </main>
  )
}

export default App
