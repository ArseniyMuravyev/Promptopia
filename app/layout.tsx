import { Nav } from '@/components/Nav'
import { Provider } from '@/components/Provider'
import type { Metadata } from 'next'
import '../styles/global.css'

export const metadata: Metadata = {
	title: 'Promptopia',
	description: 'Discover & Share AI Prompts',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<Provider>
					<div className='main'>
						<div className='gradient' />
					</div>
					<main className='app'>
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	)
}
