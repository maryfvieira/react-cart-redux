import { AuthPayload, I_UserPublic } from '@/global';
import authConfig from '@config/authConfig';
import { jwtVerify, JWTPayload, decodeJwt, SignJWT } from 'jose';

export function getJwtSecretKey() {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT Secret key is not set');
	}

	const enc: Uint8Array = new TextEncoder().encode(secret);
	return enc;
}

export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(token, getJwtSecretKey());

		return payload;
	} catch (error) {
		return null;
	}
}

export function decodeJwtToken(token: string): JWTPayload | null {
	try {
		const { payload } = decodeJwt(token) as { payload: JWTPayload };

		return payload;
	} catch (error) {
		return null;
	}
}

export async function isNotExpiredToken(token: string){
	if (token != null) {
		try {
			const payload = await verifyJwtToken(token);
			let expirationDate: number;
			expirationDate = (payload!= null && payload.exp!= null)? payload.exp: 0;
			if (Date.now() < expirationDate * 1000) {
				return true;
			}else{
				return false;
			}
		}catch(error){
			//todo: logar erro
			return false;
		}
	}
}

export async function getJwt(token: string | undefined) : Promise<AuthPayload | null> {

	if (token != null) {
		try {
			const payload = await verifyJwtToken(token);
			let expirationDate: number;
			expirationDate = (payload!= null && payload.exp!= null)? payload.exp: 0;
			if (Date.now() >= expirationDate * 1000) {
				return null;
			  }
			if (payload) {
				const authPayload: AuthPayload = {
					id: payload.id as string,
					firstName: payload.firstName as string,
					lastName: payload.lastName as string,
					email: payload.email as string,
					phone: payload.phone as string,
					role: payload.role as string,
					iat: payload.iat as number,
					exp: payload.exp as number,
					openIdSub: payload.openIdSub as string,
				};
				return authPayload;
			}
		} catch (error) {
			return null;
		}
	}
	return null;
}


export async function generateJwtToken(userData: I_UserPublic){

	const token = await new SignJWT({
		id: userData.id,
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		phone: userData.phone,
		role: userData.role,
	})
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(authConfig.jwtExpiresString)
		.sign(getJwtSecretKey());

		return token;
}






