import  React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

import '../styles/home.scss'

export function Home() {
  const [ username, setUsername ] = useState('');
  const { signInWithUser } = useAuth();
  const navigate = useNavigate();

  // Carrega dados ao subter usuário
  async function onSubmit() {
    if (!formValidation()) return;
    try {
      // chamada do AuthContext
      await signInWithUser(username);
    } catch (err) {
      toast.error('Usuário não encontrado no github. Verifique se você digitou o nome corretamente!')
    }
    handleNavigateRepositories();
  }

  // Validação do campo username
  function formValidation() {
    let valida = true;
    if (username.length < 1) {
      toast.error('Informe um nome de usuário válido do github'); 
      valida = false
    };
    return valida
  }

  // Navega até a página de repositórios
  function handleNavigateRepositories() {
    navigate('/repositories', { state: {username: username} });
  }

  return (
    <>
      <div className='container-home'>
        <div id="title">
          <h3>Buscar Repositório no github</h3>
        </div>
        <div id="search">
          <input 
            type="text"
            placeholder="Digite o nome do usuário"
            onChange={event => setUsername(event.target.value)}
            value={username}
          />
          <Button onClick={onSubmit}>
            <FaSearch id="icon-search"/>
            Buscar
          </Button>
        </div>
      </div>
    </>
  );
}