"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from "react-hot-toast";
import React from "react";
import {UserAccessContextProvider} from './CreatePage/contexts/UserAccessContext'


const queryClient = new QueryClient()

const QueryWrapper = ({children}: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <UserAccessContextProvider>
            <Toaster />
            {children}
        </UserAccessContextProvider>
    </QueryClientProvider>
)

export default QueryWrapper