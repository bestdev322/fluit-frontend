import React from "react";

const AuthenticatedContext:any =  React.createContext({logged: false, expired: false});

const AuthenticatedDispatchContext:any =  React.createContext({logged: false, expired: false});


export {AuthenticatedContext, AuthenticatedDispatchContext}