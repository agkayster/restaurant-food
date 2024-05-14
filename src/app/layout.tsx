import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React, { Suspense } from 'react';

import Notification from '@/components/Notification';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '../components/AuthProvider';
import QueryProvider from '@/components/QueryClientProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'BlueFlame Restaurant',
	description: 'Come and enjoy!',
};

function SucessFallback() {
	return <>Success Page</>;
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className} suppressHydrationWarning={true}>
				<AuthProvider>
					<QueryProvider>
						<div>
							<Notification />
							<Navbar />
							<Suspense fallback={<SucessFallback />}>
								{children}
							</Suspense>
							<Footer />
							<ToastContainer
								position='bottom-right'
								theme='dark'
								autoClose={3000}
							/>
						</div>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
