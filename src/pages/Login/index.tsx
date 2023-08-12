import { Button, Col, Image, Input, Row, Typography } from 'antd';

import api from "../../services/Api";
 
import './login.scss';
import logo from '../../assets/images/logo-fluit.png';
import { Link, useNavigate } from 'react-router-dom';
import { FocusEvent, useEffect, useState } from 'react';
import Password from 'antd/es/input/Password';

const { Text } = Typography;
function App() {
  
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  


  
  
  const handleEmail = (e: any) => {
    setUserEmail( e.target.value )
  };

  const handlePassword = (e: any) => {
    setUserPassword( e.target.value )
  };

  const handleFormSubmit = ()=> {
    api.post("http://localhost/api/v1/login", //ver como ler do .env
    {
      email: userEmail,
      password: userPassword
    }
  )
  .then((response) => {

    localStorage.setItem('access_token', JSON.stringify(response.data.plainTextToken));    
    window.location.href = "/cwa";

  })
  .catch(error => {
    if (error.response && error.response.status === 401) {
      setErrorMessage(error.response.data.message); // Defina a mensagem de erro para exibir
    } else {
      setErrorMessage('Ocorreu um erro ao processar a solicitação, tente novamente mais tarde.'); // Mensagem de erro padrão
    }
  });
  
  }
  

  return (
    <>
    <Row justify="space-around" align="middle" className='rowLogin'>
      <Col sm={12} md={8} className='mt-6 loginBox'>
        <Col span={24}>
          <Image src={logo} preview={false} className='logo mt-4 mb-4'/>        
        </Col>

        <Col span={24}>
          <Input placeholder='Usuário' className='mb-2' onBlur={handleEmail} />
        </Col>
        
        <Col span={24}>
          <Input type='password' placeholder='Senha' className='mb-2'   onBlur={handlePassword} />
        </Col>
        
          { errorMessage && 
            <Col span={24} className='mb-1 pb-1'>
              <Text type="danger">{errorMessage }</Text> 
            </Col>            
          } 
          
        <Col span={24}>
          
            <Button className='submit pt-1 pb-1' onClick={handleFormSubmit}>Entrar</Button>
          
        </Col>

        <Col span={24} className='mt-1'>
          <Text >Esqueci minha senha</Text>
        </Col>
        
        
      </Col>
    </Row>
    </>
    
  );
}

export default App;
