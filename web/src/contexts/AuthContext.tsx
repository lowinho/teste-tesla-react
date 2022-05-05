import { createContext, ReactNode, useState } from "react";
import { UserModel } from "../models/UserModel";
import { apiGit } from '../services/api';


type AuthContextType = {
  user: UserModel | undefined;
  signInWithUser: (username: string) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserModel>();

  // função do context para carregar e preencher informações do usuário do github
  async function signInWithUser(username: string) {
    await apiGit.get(`/users/${username}`).then(async (response) => {
      const { data } = response;
          setUser({
            id: data.id,
            name: data.name,
            username: data.login,
            email: data.email,
            avatar: data.avatar_url,
            company: data.company,
            location: data.location,
            twitter: data.twitter_username,
            followers: data.followers,
            following: data.following,
            user_url: data.html_url
          })
    });
  }
  
  // validação criada, pois, se um usuário for pesquisa na home é validada aqui,
  // caso seja um recarregamento na página se mantém os dados salvos no localStorage
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
 
  return (
    <AuthContext.Provider value={{ user, signInWithUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}