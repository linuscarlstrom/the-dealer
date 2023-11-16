import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import '#/styles/global.scss'

import ThemeToggle from './components/themeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'The dealer',
	description: 'Rank two poker hands'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeToggle />
				{children}
			</body>
		</html>
	)
}
