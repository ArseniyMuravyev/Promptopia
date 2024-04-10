import Prompt from '@/models/prompt'
import { connectToDb } from '@/utils/database'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export const GET = async (req: Request, { params }: Params) => {
	try {
		await connectToDb()

		const prompt = await Prompt.findById(params.id).populate('creator')
		if (!prompt) return new Response('Prompt not found', { status: 404 })
		return new Response(JSON.stringify(prompt), { status: 200 })
	} catch (error) {
		return new Response('Failed to get prompts', { status: 500 })
	}
}

export const PATCH = async (req: Request, { params }: Params) => {
	const { prompt, tag } = await req.json()
	try {
		await connectToDb()

		const existingPrompt = await Prompt.findById(params.id)

		if (!existingPrompt)
			return new Response('Prompt not found', { status: 404 })

		existingPrompt.tag = tag
		existingPrompt.prompt = prompt

		await existingPrompt.save()
		return new Response(JSON.stringify(existingPrompt), { status: 200 })
	} catch (error) {
		return new Response('Failed to update prompts', { status: 500 })
	}
}

export const DELETE = async (req: Request, { params }: Params) => {
	try {
		await connectToDb()

		await Prompt.findByIdAndDelete(params.id)

		return new Response('Prompt deleted successfully', { status: 200 })
	} catch (error) {
		return new Response('Failed to delete prompt', { status: 500 })
	}
}
