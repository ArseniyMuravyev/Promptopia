'use client'

import { Form } from '@/components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface Page {}

const page: FC<Page> = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [submitting, setSubmitting] = useState(false)
	const promptId = searchParams.get('id')
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	})

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`)
			const data = await response.json()

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			})
		}
		if (promptId) getPromptDetails()
	}, [promptId])

	const updatePrompt = async (e: SubmitEvent) => {
		e.preventDefault()
		setSubmitting(true)

		if (!promptId) return

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
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
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	)
}
export default page
