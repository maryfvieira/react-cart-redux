//import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import NextAuth, {
  getServerSession,
  NextAuthOptions,
  Session,
} from "next-auth";
import NextAuthResult from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import "reflect-metadata";
import { getUserService } from "@/hooks/container";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { I_UserPublic, T_UserRole, UserSession } from "@/global";
import { randomBytes, randomUUID } from "crypto";
import Email from "next-auth/providers/email";
import appConfig from "@config/appConfig";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
        capchaToken: { label: "capchaToken" },
      },

      async authorize(credentials, req) {
        let apiResponse = {} as ApiResponse<I_UserPublic>;
        if (
          credentials != null &&
          credentials.username &&
          credentials.password &&
          credentials.capchaToken
        ) {
          apiResponse = await getUserService().login(
            credentials.username,
            credentials.password,
            credentials.capchaToken
          );

          let user = {} as UserSession;

          if (!apiResponse.error && apiResponse.data) {
            user.id = apiResponse.data.id;
            user.avatar = apiResponse.data.avatar;
            user.firstName = apiResponse.data.firstName;
            user.lastName = apiResponse.data.lastName;
            user.role = apiResponse.data.role;
            user.email = apiResponse.data.email;

            
            return user;
          }
        }
        return null;
        // return {
        // 	error: apiResponse.error?._message,
        // };
        //let user = {} as UserSession;

        // user =
        // {
        // 	id: "1",
        // 	email: "adm@adm.com",
        // 	firstName: "Agnaldo",
        // 	lastName: "Petrucio",
        // 	avatar:"",
        // 	role: T_UserRole.User
        // };

        // return user;
      },
    }),
  ],

  secret: appConfig.getNextAuthSecret,
  jwt: {
    secret: appConfig.getNextAuthSecret,
    maxAge: 5 * 60 * 1000,
  },
  // session: {
  //   strategy: "jwt",
	// 	maxAge:  180,
  // },
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
    // async signIn({ user, account, profile, email, credentials }) {

    //   if (user) {
    //     return true;
    //   } else {
    //     // Return false to display a default error message
    //     return false;
    //     // Or you can return a URL to redirect to:
    //      //return '/unauthorized'
    //   }
    // },
    async jwt({ token, account, user }) {
       if (user) 
        token.user = user as UserSession;

      //  if (token.tokenExpiration < Date.now()) {

      //   return {...token, ...user};
      //  }
       return token;
     
     

      // if (account) {
      //   return {
      //     access_token: account.access_token,
      //     expires_at: account.expires_at,
      //     refresh_token: account.refresh_token,
      //     user: user,
      //   }
      // }else if (Date.now() < token.expires_at * 1000) {
      //   // Subsequent logins, if the `access_token` is still valid, return the JWT
      //   return token
      // }else {
      //   // Subsequent logins, if the `access_token` has expired, try to refresh it
      //   if (!token.refresh_token) 
      //     throw new Error("Missing refresh token");
      //   }

    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as UserSession;
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
