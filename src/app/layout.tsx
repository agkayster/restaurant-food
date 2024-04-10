import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Notification from '@/components/Notification';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '../components/AuthProvider';
import QueryProvider from '@/components/QueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'BlueFlame Restaurant',
	description: 'Come and enjoy!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthProvider>
					<QueryProvider>
						<div>
							<Notification />
							<Navbar />
							{children}
							<Footer />
						</div>
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
