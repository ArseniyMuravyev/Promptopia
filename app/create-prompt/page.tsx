'use client'

import { Form } from '@/components/Form'
import { NextAuthSession, Post } from '@/utils/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface Page {}

const page: FC<Page> = () => {
	const router = useRouter()
	const session = useSession().data as NextAuthSession | null
	const [submitting, setSubmitting] = useState<boolean>(false)
	const [post, setPost] = useState<Post>({
		prompt: '',
		tag: '',
	})

	const createPrompt = async (e: SubmitEvent) => {
		e.preventDefault()
		setSubmitting(true)

		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user?.id,
					tag: post.tag,
				}),
			})
			if (response.ok) {
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setSubmitting(false)
		}
	}
	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	)
}
export default page
