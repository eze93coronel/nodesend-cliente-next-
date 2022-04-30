import React,{ useContext,useEffect} from 'react';
import Layout from '../components/Layout'
import Alerta from '../components/Alerta';
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'

import Dropzone from '../components/Dropzone';
import Link from 'next/link';
const Index = () => {
  //EXTRAEER EL USUARIO AUTENTICADO 
const AuthContext = useContext(authContext);

const {usuarioAutenticadoJWS} = AuthContext;

//extraer el mensaje de archivos 
const AppContext = useContext(appContext);
const {mensaje_archivo} = AppContext;


useEffect(() => {
 usuarioAutenticadoJWS();
},[])

  return (  
   <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32"> 
            
     {mensaje_archivo && <Alerta /> }

            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0"> 
              <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">compartir aqui archivos de dropson de forma sencilla y privada</h2>
                <p className="text-lg leading-loose">
                    <span className="text-red-500 font-bold">ReactNodeSend</span>
                  
                </p>
                <Link href="/crearcuenta">
                      <a className="text-red-500 font-bold text-lg hover:text-red-700">crea una cuenta para mayores beneficios</a>
                </Link>
              </div>

            </div>

      </div>
    </Layout>
     
  );
}
 
export default Index;