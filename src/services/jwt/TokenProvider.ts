import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import * as config from "@/constants";
import { AuthUser, UserSession } from "@/global";
import { v4 as uuidv4 } from "uuid";
import { toZonedTime } from 'date-fns-tz'

const TZ = "America/Sao_Paulo";

 function currentTimeInSeconds(): number {
  const now = toZonedTime(new Date(), TZ);

  return Math.floor(now.getTime() / 1000);
}

export class TokenProvider {
  
  payload: UserSession;
  tokenId: any;
  accessTokenExpirationTime: number;

  constructor(payload: UserSession) {
    this.payload = payload;
    
    this.accessTokenExpirationTime =
    currentTimeInSeconds() + config.jwtAccessTokenExpiration;
  }

  // public getIdToken(): any {
  // 	if (this.payload == "" || this.expired()) {
  // 		this.idToken = this.generateToken();
  // 	}
  // 	return this.idToken;
  // }

  public expired(): boolean {
    return currentTimeInSeconds() + 10 >= this.accessTokenExpirationTime;
  }

  public generateAccessToken(): string {
    return jwt.sign(this.payload, config.jwtAccessTokenSecret, {
      expiresIn: config.jwtAccessTokenExpiration + "ms",
      issuer: this.payload.email,
    });
  }

  public generateRefreshToken(): string {
    return jwt.sign(this.payload, config.jwtRefreshTokenSecret, {
      expiresIn: config.jwtRefreshTokenExpiration + "ms",
      issuer: this.payload.email,
    });
  }

  public getAccessTokenPayload(jwtAccessToken): any {
    return jwt.verify(
		jwtAccessToken,
		config.jwtAccessTokenSecret
	  );
  }

  public getRefreshTokenPayload(jwtRefreshToken): any {
	return jwt.verify(
		jwtRefreshToken,
		config.jwtRefreshTokenSecret
	  );
  }

  public refreshAccessToken(
    jwtRefreshToken: string,
    jwtAccessToken: string
  ): string | null {
    
	// const accessTokenExpirationTime = toZonedTime(new Date(this.getAccessTokenPayload(jwtAccessToken).exp * 1000), TZ);
  const refreshTokenExpirationTime = toZonedTime(new Date(this.getRefreshTokenPayload(jwtRefreshToken).exp * 1000), TZ);

    const now = toZonedTime(new Date(), TZ);

    if (refreshTokenExpirationTime > now) {
      return jwt.sign(this.payload, config.jwtAccessTokenSecret, {
        expiresIn: config.jwtAccessTokenExpiration + "ms",
        issuer: this.payload.email,
      });
    }

    return null;
  }
}
