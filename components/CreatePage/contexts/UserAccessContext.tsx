import React, {createContext, Dispatch, SetStateAction, useState} from "react";


export type HasAccess = {
    access: boolean
}

export interface UserAccessInterface {
    access: boolean
    setAccess: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
    access: false,
    setAccess: (access: boolean) => {}
}
// @ts-ignore
export const UserAccessContext = createContext<UserAccessInterface>(defaultState)

type ProviderProps = {
    children: React.ReactNode
}

export function UserAccessContextProvider ({children}: ProviderProps) {
    const [access, setAccess] = useState(false)
    return (
        <UserAccessContext.Provider value={{access, setAccess}}>
            {children}
        </UserAccessContext.Provider>
    )
}