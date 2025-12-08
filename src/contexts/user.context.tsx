import { createContext, FunctionComponent, ReactNode, useState } from "react";

import User from "../types/user.type";
interface IUserContext {
    currentUser: User | null;
    isAuthenticated: boolean;
    loginUser: (user: User) => void;
    logoutUser: () => void;
}

export const UserContext = createContext<IUserContext>({
    currentUser: null,
    isAuthenticated: false,
    loginUser: () => { },
    logoutUser: () => { },
})

const UserContextProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);   

    const isAuthenticated = currentUser !== null;

    const loginUser = (user: User) => {
        setCurrentUser(user);
    }

    const logoutUser = () => {
        setCurrentUser(null);
    }

    return (
        <UserContext.Provider value= {{ currentUser, isAuthenticated, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;