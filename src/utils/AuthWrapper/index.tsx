
import Login from '../../pages/Login/index';
import { useState, useReducer, useEffect } from 'react';
import {  AuthenticatedContext, AuthenticatedDispatchContext } from '../../context/AuthContext';

function authReducer(state: any, action: any): any {
    return {logged: action.logged, expired: action.expired ?? false};
}

const AuthWrapper = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [auth, dispatchAuth] = useReducer(authReducer, {logged: false, expired: false});

    useEffect(() => {

        
    
        
        if (loading) {
            const access_token = localStorage.getItem('access_token');
            if(access_token )
            {
                dispatchAuth({logged: true});
                setLoading(false);
            }else{
                dispatchAuth({logged: false});
                if( auth.logged === false){
                    if(window.location.pathname !== "/login"){
                        window.location.href = "/login";
                    }
                }
                setLoading(false);
            }
        }

            
    }, [loading]);

    return (
               
        <AuthenticatedContext.Provider  value={auth} >
            <AuthenticatedDispatchContext.Provider value={dispatchAuth} >
          
                { !loading && (auth.logged ? props.children : <Login />)}    

            </AuthenticatedDispatchContext.Provider>
        </AuthenticatedContext.Provider>
    );
};

export default AuthWrapper;