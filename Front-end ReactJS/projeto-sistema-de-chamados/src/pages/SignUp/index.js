


import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import './signup.css'
import logo from '../../assets/logo.png'

function SignUp() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')

  const { signUp, loadingAuth } = useContext(AuthContext)


  function handleSubmit(e) {
    e.preventDefault()
    
    if(nome !== '' && email !== '' && password !== ''){
      signUp(nome, email, password)
    }
    
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='logo-area'>
          <img src={logo} alt="Logo Sistema" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Conta</h1>
          <input type="text" placeholder="Seu nome..." value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder="Digite seu email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Digite sua Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' >{ loadingAuth ? 'Carregando...' : 'Cadastrar' }</button>
        </form>

        <Link to='/'>Já possuo uma conta</Link>
      </div>
    </div>
  );
}



export default SignUp;