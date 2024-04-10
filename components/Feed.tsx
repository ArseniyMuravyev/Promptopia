'use client'

import { Post } from '@/utils/types'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { PromptCard } from './PromptCard'

interface IPromptCardList {
	data: Post[]
	handleTagClick: (tag: string) => void
}

const PromptCardList: FC<IPromptCardList> = ({ data, handleTagClick }) => (
	<div className='mt-16 prompt_layout'>
		{data.map(post => (
			<PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
		))}
	</div>
)

export const Feed: FC = () => {
	const [searchText, setSearchText] = useState('')
	const [posts, setPosts] = useState([])
	const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value)
	}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt')
			const data = await response.json()

			setPosts(data)
		}

		fetchPosts()
	}, [])
	return (
		<section className='feed'>
			<form action='' className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchText}
					required
					className='search_input peer'
				/>
			</form>

			<PromptCardList data={posts} handleTagClick={() => {}} />
		</section>
	)
}
