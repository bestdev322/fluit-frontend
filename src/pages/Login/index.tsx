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
  const [isLoading, setIsLoading] = useState(false);
  const [userPassword, setUserPassword] = useState();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  
  
  const handleEmail = (e: any) => {
    setUserEmail( e.target.value )
  };

  const handlePassword = (e: any) => {
    setUserPassword( e.target.value )
  };

  const handleFormSubmit = ()=> {
    setIsLoading(true);
    
    api.post("/v1/login", //ver como ler do .env
    {
      email: userEmail,
      password: userPassword
    }
  )
  .then((response) => {

    if(response.status === 200){
      
      localStorage.setItem('access_token', response.data.plainTextToken);    
      localStorage.setItem('user_name', response.data.user.name);    
      localStorage.setItem('user_email', response.data.user.email);    
      localStorage.setItem('user_image', response.data.user.avatar.image);    
      localStorage.setItem('user_letters', response.data.user.avatar.letters);    
      window.location.href = "/home";
      
    }
  })
  .catch(error => {
    if (error.response && error.response.status === 401) {
      setErrorMessage(error.response.data.message); // Defina a mensagem de erro para exibir
    } else {
      setErrorMessage('Ocorreu um erro ao processar a solicitação, tente novamente mais tarde.'); // Mensagem de erro padrão
    }
    setIsLoading(false);
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
          <Input placeholder='Usuário' className='mb-2'  onChange={handleEmail}/>
        </Col>
        
        <Col span={24}>
          <Input type='password' placeholder='Senha' className='mb-2'    onChange={handlePassword}/>
        </Col>
        
          { errorMessage && 
            <Col span={10} offset={7} className='mb-1 pb-1'>
              <Text type="danger">{errorMessage }</Text> 
            </Col>            
          } 
          
        <Col span={24} className='mt-1'>
          
            <Button className='submit pt-1 pb-1' onClick={handleFormSubmit} loading={isLoading}>Entrar</Button>
          
        </Col>

        <Col span={0} className='mt-1'>
          <Text >Esqueci minha senha</Text>
        </Col>
        
        
      </Col>
    </Row>
    </>
    
  );
}

export default App;
