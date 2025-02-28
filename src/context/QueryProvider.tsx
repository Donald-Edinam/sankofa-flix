"use client";

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { useState } from "react";

interface QueryProviderProps {
    children: React.ReactNode;  
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};