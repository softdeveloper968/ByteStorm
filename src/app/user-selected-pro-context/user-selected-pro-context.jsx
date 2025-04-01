"use client";

import { createContext, useState } from 'react';


export const UserSelectedProContext = createContext();


export function UserSelectedProProvider({ children }) {
    const [userSelectedPro, setUserSelectedPro] = useState(null);

    return (
        <UserSelectedProContext.Provider
            value={{ userSelectedPro, setUserSelectedPro }}
        >
            {children}
        </UserSelectedProContext.Provider>
    );
};
