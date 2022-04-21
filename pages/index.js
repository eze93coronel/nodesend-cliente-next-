import React,{ useContext,useEffect} from 'react';
import Layout from '../components/Layout'
import authContext from '../context/auth/authContext'

const Index = () => {
  //EXTRAEER EL USUARIO AUTENTICADO 
const AuthContext = useContext(authContext);

const {usuarioAutenticadoJWS} = AuthContext;
useEffect(() => {
 usuarioAutenticadoJWS();
},[])

  return (  
   <Layout>
       <h1>index</h1>   
    </Layout>
     
  );
}
 
export default Index;