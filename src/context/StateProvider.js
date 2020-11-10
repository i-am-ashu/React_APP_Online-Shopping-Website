import React,{ useContext,useReducer,createContext} from 'react'

//creates context
export const StateContext = createContext();

//wrap our app within it and provide context
export const StateProvider = ({reducer,initialState,children}) =>{
   return ( <StateContext.Provider value={useReducer(reducer,initialState)}>
                {children}
            </StateContext.Provider> )
};

//pull from context
export const useStateValue = () => useContext(StateContext);