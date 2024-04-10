'use client'

import { Profile } from '@/components/Profile'
import { NextAuthSession, Post } from '@/utils/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

const page: FC = () => {
	const session = useSession().data as NextAuthSession | null
	const [myPosts, setMyPosts] = useState<Post[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user?.id}/posts`)
			const data: Post[] = await response.json()

			setMyPosts(data)
		}

		if (session?.user?.id) fetchPosts()
	}, [session?.user?.id])

	const handleEdit = (post: Post) => {
		router.push(`/update-prompt?id=${post._id}`)
	}

	const handleDelete = async (post: Post) => {
		const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id!.toString()}`, {
					method: 'DELETE',
				})
				const filteredPosts = myPosts.filter((p: Post) => p._id !== post._id)
				setMyPosts(filteredPosts)
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<Profile
			name='My'
			desc='Welcome to your personalized profile page'
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}

export default page
