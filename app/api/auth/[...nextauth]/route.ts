import User from '@/models/user'
import { connectToDb } from '@/utils/database'
import { Profile } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

interface ExtendedProfile extends Profile {
	picture?: string
}

interface ExtendedUser {
	id: string
}

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session?.user?.email })

			if (session.user && sessionUser) {
				;(session.user as ExtendedUser).id = sessionUser._id.toString()
			}

			return session
		},
		async signIn({ profile }) {
			const extendedProfile = profile as ExtendedProfile
			try {
				await connectToDb()

				const userExists = await User.findOne({
					email: extendedProfile?.email,
				})


				if (!userExists) {
					await User.create({
						email: extendedProfile?.email,
						username: extendedProfile?.name?.replace(' ', '').toLowerCase(),
						image: extendedProfile?.picture,
					})
				}

				return true
			} catch (error) {
				console.log(error)
				return false
			}
		},
	},
})

export { handler as GET, handler as POST }
