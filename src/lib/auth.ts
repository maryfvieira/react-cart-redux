//import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import NextAuth,  { getServerSession, NextAuthOptions, Session } from 'next-auth';
import NextAuthResult from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import "reflect-metadata";
import { getUserService } from "@/hooks/container";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { I_UserPublic, T_UserRole, UserSession } from "@/global";
import { randomBytes, randomUUID } from "crypto";
import Email from "next-auth/providers/email";

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: { label: "username", type: "text"},
				password: { label: "password", type: "password" },
				capchaToken: { label: "capchaToken" }
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
				let user = {} as UserSession;

				user =
				{
					id: "1",
					email: "adm@adm.com",
					firstName: "Agnaldo",
					lastName: "Petrucio",
					avatar:"",
					role: T_UserRole.User
				};

				return user;
				
      },
		})
	],
	session: {
		strategy: 'jwt',
},
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
		signIn: "/login",
		 signOut: "/logout",
		 //newUser: "/signup",
		// error: "/error",
	},
	callbacks: {
		async jwt({ token, user }) {

			if (user)
				 token.user = user as UserSession;
      	return token;
			
		},
		async session({ session, token }) {
			if(token){
				session.user = token.user as UserSession
				// session.user.id = token.user.id;
				// session.user.avatar = token.avatar;
				// session.user.email = token.email;
				// session.user.firstName = token.firstName;
				// session.user.lastName = token.lastName;
				// session.user.role = token.role;
              
			}
		
			return session;
		},
	},
};

export const getAuthSession = () => getServerSession(nextAuthOptions);

// const { auth, unstable_update, signIn, signOut, handlers }: NextAuthResult = NextAuth(nextAuthOptions);

// export { nextAuthOptions, auth, unstable_update as update, signIn, signOut, handlers };

// const handler = NextAuth(nextAuthOptions);

// export { handler as GET, handler as POST };