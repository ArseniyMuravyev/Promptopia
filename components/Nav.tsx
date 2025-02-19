'use client'
import { NextAuthSession } from '@/utils/types'
import { BuiltInProviderType } from 'next-auth/providers/index'
import {
	ClientSafeProvider,
	LiteralUnion,
	getProviders,
	signIn,
	signOut,
	useSession,
} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

export const Nav: FC = () => {
	const session = useSession().data as NextAuthSession | null
	const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null)

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders()

			setProviders(response)
		}
		setUpProviders()
	}, [])
	return (
		<nav className='flex-between w-full mb`-16 pt-3'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					alt='logo'
					width={30}
					height={30}
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>

			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>
						<button
							type='button'
							onClick={() => signOut}
							className='outline_btn'
						>
							Sign Out
						</button>

						<Link href='/profile'>
							<Image
								src={session?.user.image ?? ''}
								alt='profile'
								width={37}
								height={37}
								className='rounded-full'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									type='button'
									key={provider.name}
									className='black_btn'
									onClick={() => signIn(provider.id)}
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image ?? ''}
							alt='profile'
							width={37}
							height={37}
							className='rounded-full'
							onClick={() => setToggleDropdown(prev => !prev)}
						/>
						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='profile'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href='create-prompt'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									type='button'
									onClick={() => {
										setToggleDropdown(false)
										signOut()
									}}
									className='mt-5 w-full black_btn'
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									type='button'
									key={provider.name}
									className='black_btn'
									onClick={() => signIn(provider.id)}
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	)
}
