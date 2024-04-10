'use client';
import React from 'react';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

type Props = {
	children: React.ReactNode;
};

const QueryProvider = ({ children }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default QueryProvider;
