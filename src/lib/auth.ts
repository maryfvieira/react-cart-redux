//import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import NextAuth, {
  getServerSession,
  NextAuthOptions,
  Session,
} from "next-auth";
import NextAuthResult from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import "reflect-metadata";
import { getUserService } from "@/hooks/container";
import { ApiResponse } from "@/services/httpclient/model/apiResponse";
import { AuthUser, I_UserPublic, UserSession } from "@/global";
import { randomBytes, randomUUID } from "crypto";
import Email from "next-auth/providers/email";
import appConfig from "@config/appConfig";
import * as config from "@/constants";
import { JWT } from "next-auth/jwt";
import { TokenProvider } from "@/services/jwt/TokenProvider";
import { toZonedTime } from "date-fns-tz";
import { JsonWebTokenError } from "jsonwebtoken";
const TZ = "America/Sao_Paulo";

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

          let userAuth = {} as AuthUser;
          userAuth.user = {} as UserSession;

          if (!apiResponse.error && apiResponse.data) {
            userAuth.user.id = apiResponse.data.id;
            userAuth.user.avatar = apiResponse.data.avatar;
            userAuth.user.firstName = apiResponse.data.firstName;
            userAuth.user.lastName = apiResponse.data.lastName;
            userAuth.user.role = apiResponse.data.role;
            userAuth.user.email = apiResponse.data.email;

            //****todo: bloco deveria estar num Identity service para gerar tokens(chamando aqui via api)

            const tokenProvider = new TokenProvider(userAuth.user);
            const access_token = tokenProvider.generateAccessToken();
            const refresh_token = tokenProvider.generateRefreshToken();

            //****** */

            const accessTokenPayload =
              tokenProvider.getAccessTokenPayload(access_token);
            const refreshTokenPayload =
              tokenProvider.getRefreshTokenPayload(refresh_token);

            userAuth.access_token = access_token;
            userAuth.refresh_token = refresh_token;
            userAuth.expires_at = accessTokenPayload.exp;
            userAuth.refresh_expire_at = refreshTokenPayload.exp;

            return userAuth as any;
            // return {
            //   user: {
            //     id: apiResponse.data.id,
            //     email: apiResponse.data.email,
            //     firstName: apiResponse.data.firstName,
            //     lastName: apiResponse.data.lastName,
            //     avatar: apiResponse.data.avatar,
            //     role: apiResponse.data.role,
            //   },
            // };
          }
        }
        return null;

        // return {
        //   error: apiResponse.error?._message,
        // };
        // let user = {} as any;

        // user = {
        //   id: "1",
        //   email: "adm@adm.com",
        //   firstName: "admin",
        //   lastName: "",
        //   avatar: null,
        //   role: "admin",
        // };

        // return user;
      },
    }),
  ],
  secret: appConfig.getNextAuthSecret,
  // jwt: {
  //   secret: appConfig.getNextAuthSecret,
  //   maxAge: config.jwtAccessTokenExpiration / 1000,
  // },
  session: {
    // Seconds: how long until an idle session expires and is no longer valid.
    strategy: "jwt",
    maxAge: config.sessionExpiration,
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
    signIn: "/signin",
    signOut: "/signout",
    // newUser: "/signup",
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
    async jwt({ token, account, user, trigger, session }) {
      if (account && user) {
        let userAuth = user as unknown as AuthUser;

        let jwt = {
          user: userAuth.user,
          access_token: userAuth.access_token,
          expires_at: userAuth.expires_at,
          refresh_expire_at: userAuth.refresh_expire_at,
          refresh_token: userAuth.refresh_token,
        } as JWT;

        return jwt;
      }

      // if (trigger == "update") {
      //   const tokenProvider = new TokenProvider(token.user);
      //   const newAccessToken = tokenProvider.refreshAccessToken(
      //     token.refresh_token,
      //     token.access_token
      //   );
      //   if (newAccessToken != null) {
      //     token.access_token = newAccessToken;
      //     token.exp = token.expires_at =
      //       tokenProvider.getAccessTokenPayload(newAccessToken).exp;
      //   }
      //   // return token;
      // }

      if (token != null) {
        const tokenProvider = new TokenProvider(token.user);

        const now = Date.now() / 1000;
        const now_ = currentTimeInSeconds();

        if (token.expires_at > now) {
          let payload = tokenProvider.getAccessTokenPayload(token.access_token);
          token.expires_at = token.exp = payload.exp;

          return token;
        }

        if (token.refresh_expire_at < now) {

          let jwt = {
            expires_at: token.refresh_expire_at,
            access_token: token.access_token,
            user: token.user,
          } as JWT;
          
          return jwt;
        }

        const newAccessToken = tokenProvider.refreshAccessToken(
          token.refresh_token,
          token.access_token
        );

        if (newAccessToken != null) {
          token.access_token = newAccessToken;
          let payload = tokenProvider.getAccessTokenPayload(token.access_token);
          token.expires_at = token.exp = payload.exp;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user == undefined ? {} as UserSession : token.user as UserSession;
        session.access_token = token.access_token;
        session.expires_at = token.expires_at;

      }

      return session;
    },
  },
};

export function currentTimeInSeconds(): number {
  const now = toZonedTime(new Date(), TZ);

  return Math.floor(now.getTime() / 1000);
}

export const getAuthSession = () => getServerSession(nextAuthOptions);

// const { auth, unstable_update, signIn, signOut, handlers }: NextAuthResult = NextAuth(nextAuthOptions);

// export { nextAuthOptions, auth, unstable_update as update, signIn, signOut, handlers };

// const handler = NextAuth(nextAuthOptions);

// export { handler as GET, handler as POST };
