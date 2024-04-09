import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Notification from '@/components/Notification';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '../components/AuthProvider';

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
					<div>
						<Notification />
						<Navbar />
						{children}
						<Footer />
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
