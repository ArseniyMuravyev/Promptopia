'use client'
import { NextAuthSession, Post } from '@/utils/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, MouseEventHandler, useState } from 'react'

interface IPromptCard {
	post: Post
	handleTagClick?: (tag: string) => void
	handleEdit?: MouseEventHandler<HTMLButtonElement>
	handleDelete?: MouseEventHandler<HTMLButtonElement>
}

export const PromptCard: FC<IPromptCard> = ({
	post,
	handleTagClick,
	handleEdit,
	handleDelete,
}) => {
	const session = useSession().data as NextAuthSession | null
	const pathName = usePathname()
	const [copied, setCopied] = useState('')
	const handleCopy = () => {
		setCopied(post.prompt)
		navigator.clipboard.writeText(post.prompt)
		setTimeout(() => setCopied(''), 3000)
	}
	return (
		<div className='prompt_card'>
			<div className='flex justify-between items-start gap-5'>
				<div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
					<Image
						src={post?.creator?.image ?? ''}
						alt='user image'
						width={40}
						height={40}
						className='rounded-full object-contain'
					/>

					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold font-gray-900'>
							{post?.creator?.username}
						</h3>
						<p className='font-inter text-sm text-gray-500'>
							{post?.creator?.email}
						</p>
					</div>
				</div>

				<button className='copy_btn' onClick={handleCopy}>
					<Image
						src={
							copied === post.prompt
								? '/assets/icons/tick.svg'
								: '/assets/icons/copy.svg'
						}
						alt='copy icon'
						width={16}
						height={16}
					/>
				</button>
			</div>
			<p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
			<button
				className='font-inter text-sm blue_gradient cursor-pointer'
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				#{post.tag}
			</button>
			{session?.user?.id === post?.creator?._id && pathName === '/profile' && (
				<div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
					<button
						className='font-inter text-sm green_gradient cursor-pointer'
						onClick={handleEdit}
					>
						Edit
					</button>
					<button
						className='font-inter text-sm orange_gradient cursor-pointer'
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}
