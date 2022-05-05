import  React, { useEffect, useState }  from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUserFriends, FaStar  } from 'react-icons/fa';
import { FiMail } from "react-icons/fi"
import { BiBookBookmark } from "react-icons/bi"
import Moment from 'react-moment';

import { Loader } from '../components/Loader';
import { UserModel } from '../models/UserModel';
import { apiGit } from '../services/api';
import '../styles/repositories.scss';
import { IconBack } from '../components/iconBack';
interface CustomizedState {
  id: number;
  username: string;
}

export function Repositories(props: any) {
  const [ repo, setRepo ] = useState([]);
  const [ data, setData ] = useState<UserModel>();
  const [ count, setCount ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const [countStar, setCountStar] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const propsLocation = location.state as CustomizedState;
  const { user } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    async function loadRepositories() {
      // Validação dos dados para carregar user, 
      // pode vir tanto do github quanto do localStorage para um eventual loader da página
      if (!user) {
        const storage = localStorage.getItem('user');
        if (storage) {
          setData(JSON.parse(storage))
        } 
      } else {
        setData(user)
      }
      
      // carrega o username vindo da rota para get dos repos
      const username = propsLocation.username;
      try {
        // get dos repos
        const responseRepos = await apiGit.get(`/users/${username}/repos`);
        await responseRepos.data;
        const repos = responseRepos.data;

        // get dos repos com star para gerar quantidade de likes do usuário
        const star = await apiGit.get(`/users/${username}/starred`);
        await star.data;
        const stars = responseRepos.data;  

        setCount(repos.length)
        setCountStar(stars.length)
        setRepo(repos);
      } catch (err) {
          console.warn('Erro');
      } finally {
        setIsLoading(false);
      }
    }
    loadRepositories();
  }, []) 

  function goBackNavigate() {
    navigate('/');
  }

  return (
    <div>
      { isLoading ? <Loader /> : 
        <>
        <IconBack cursor="pointer" color="black" onClick={goBackNavigate}/>
          <div className="title">
            <BiBookBookmark id="icon-repo"/> 
            <h3>Repositories</h3> 
            <div className="count">
              <p>{count}</p>
            </div>
          </div>
          <div className="line">
            <div className="line-orange"></div>
          </div>
          <hr />

          <div className="container-repo">
            <div className="userSide">
              {data?.avatar ? 
              <img id="logo" src={data?.avatar} alt="avatar" /> :
              <div className="img-avatar">TESTE</div>
              }
              <h1>{data?.name}</h1>
              <p id="username">{data?.username}</p>
              <a href={data?.user_url} target="_blank">
              <button 
                className="btn-follow" 
                type='button'>
                Follow
              </button>
              </a>
              {data?.twitter ? <p id="twitter">@{data?.twitter}</p> : null}
              <div className="followers"> 
                <FaUserFriends id="icon-user"/> 
                <p id="followers-count">{data?.followers} </p> <p>followers &nbsp;</p> 
                <p id="followers-count">{data?.following} </p> <p>following &nbsp;</p> 
                <FaStar id="icon-star"/> 
                <p id="followers-count">{countStar}</p>
              </div>
              <div className="email">
                <FiMail id="icon-email"/>
                {data?.email ? <p>@{data?.email}</p> : <p>Email não Informado</p>}
              </div>
              <hr id="hr-title"/>
            </div>

            <div className="reposSide">
            <div className="title-repo">
              <BiBookBookmark id="icon-repo"/> 
              <h3>Repositories</h3> 
              <div className="count">
                <p>{count}</p>
              </div>
            </div>
            <div className="line-repo">
              <div className="line-orange"></div>
            </div>
            
            {repo.map((value: any) => (
                <div key={value.id} id="repos">
                  <a href={value.html_url} target="_blank">
                    <h3 id="title-repo">{value.name}</h3>
                  </a>
                    
                    <div className="info">
                    {value.language ? 
                      <div className="language">
                          <div className="circle"></div><label id="language-repo">{value.language}</label> 
                      </div>
                      : null }
                      <div className="datetime">
                        <label id="updated">
                          Updated on
                          <Moment 
                            format=" D MMMM"
                            >
                              {value.updated_at}
                          </Moment>
                        </label>
                      </div>
                    </div>
                    <hr />
                </div>
              ))}
            </div>
          </div>
        </>}
    </div>
  );
}