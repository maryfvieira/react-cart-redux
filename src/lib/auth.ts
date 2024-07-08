//import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import NextAuth,  { getServerSession, NextAuthOptions, Session } from 'next-auth';
import NextAuthResult from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import "reflect-metadata";
import { getUserService } from "@/hooks/container";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { I_UserPublic } from "@/global";
import { randomBytes, randomUUID } from "crypto";
import Email from "next-auth/providers/email";

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: { label: "username", type: "text"},
				password: { label: "password", type: "password" },
				//capchaToken: { label: "capchaToken" }
			},

			async authorize(credentials, req) {
				// let apiResponse = {} as ApiResponse<I_UserPublic>;
				// if (
				//   credentials != null &&
				//   credentials.username &&
				//   credentials.password &&
				//   credentials.capchaToken
				// ) {
				//   apiResponse = await getUserService().login(
				//     credentials.username,
				//     credentials.password,
				//     credentials.capchaToken
				//   );

				//   if (!apiResponse.error && apiResponse.data) {
				//     return {
				//       user: {
				//         id: apiResponse.data.id,
				//         email: apiResponse.data.email,
				//         firstName: apiResponse.data.firstName,
				//         lastName: apiResponse.data.lastName,
				//         avatar: apiResponse.data.avatar,
				//         role: apiResponse.data.role,
				//       },
				//     };
				//   }
				// }
				// return {
				//   error: apiResponse.error?._message,
				// };
				let user = {} as any;

				user =
				{
					id: "1",
					email: "adm@adm.com",
					firstName: "admin",
					lastName: "",
					avatar: null,
					role: "admin",
				};

				return user;
				
      },
		})
	],
	// session: {
	// 	strategy: "jwt",
	// 	// Seconds: how long until an idle session expires and is no longer valid.
	// 	maxAge: 300,
	// 	generateSessionToken: () => {
	// 		return randomUUID?.() ?? randomBytes(32).toString("hex");
	// 	}
	// },
	// jwt: {

	// },
	pages: {
		signIn: "/signin",
		 signOut: "/signout",
		// newUser: "/signup",
		// error: "/error",
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }) {
			session = token.user as any;
			return session;
		},
	},
};

export const getAuthSession = () => getServerSession(nextAuthOptions);

// const { auth, unstable_update, signIn, signOut, handlers }: NextAuthResult = NextAuth(nextAuthOptions);

// export { nextAuthOptions, auth, unstable_update as update, signIn, signOut, handlers };

// const handler = NextAuth(nextAuthOptions);

// export { handler as GET, handler as POST };