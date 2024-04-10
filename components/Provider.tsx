'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

interface IProvider {
	children: ReactNode
	session?: Session
}

export const Provider: FC<IProvider> = ({ children, session }) => {
	return <SessionProvider session={session}>{children}</SessionProvider>
}
