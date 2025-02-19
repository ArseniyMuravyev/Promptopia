import { Post } from '@/utils/types'
import { FC } from 'react'
import { PromptCard } from './PromptCard'

interface IProfile {
	name: string
	desc: string
	data: Post[]
	handleEdit: (post: Post) => void
	handleDelete: (post: Post) => void
}

export const Profile: FC<IProfile> = ({
	name,
	desc,
	data,
	handleEdit,
	handleDelete,
}) => {
	return (
		<section className='w-full'>
			<h1 className='head_text text-left'>
				<span className='blue_gradient'>{name} Profile</span>
			</h1>
			<p className='desc text-left'>{desc}</p>
			<div className='mt-10 prompt_layout'>
				{data.map(post => (
					<PromptCard
						key={post._id}
						post={post}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</section>
	)
}
