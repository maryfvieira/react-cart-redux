import { AuthPayload, I_UserPublic } from '@/global';
import authConfig from '@config/authConfig';
import { jwtVerify, JWTPayload, decodeJwt, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import cookie from 'cookie';

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

export async function getJwt() : Promise<AuthPayload | null> {
	const cookieStore = cookies();
	const token = cookieStore.get('token');

	if (token) {
		try {
			const payload = await verifyJwtToken(token.value);
			let expirationDate: number;
			expirationDate = (payload!= null && payload.exp!= null)? payload.exp: 0;
			if (Date.now() >= expirationDate * 1000) {
				deleteToken();
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

export function getUserDataServer() {
	try {
		const cookieStore = cookies();
		const cookieData = cookieStore.get('userData');
		if (!cookieData) return null;

		return JSON.parse(cookieData.value);
	} catch (_) {
		return null;
	}
}

export async function logout() {
	deleteToken();

	return null;
}

export function deleteToken(){

	const cookieStore = cookies();
	const token = cookieStore.get('token');

	if (token) {
		try {
			cookieStore.delete('token');
		} catch (_) {}
	}

	const userData = cookieStore.get('userData');
	if (userData) {
		try {
			cookieStore.delete('userData');
			return true;
		} catch (_) {}
	}
}

export function setUserDataCookie(userData: I_UserPublic, token: any) {
	const cookieStore = cookies();

	cookieStore.set({
		name: 'token',
		value: token,
		path: '/', // Accessible site-wide
		maxAge: 86400, // 24-hours or whatever you like
		httpOnly: true, // This prevents scripts from accessing
		sameSite: 'strict', // This does not allow other sites to access
	  });

	cookieStore.set({
		name: 'userData',
		value: JSON.stringify(userData),
		path: '/',
		maxAge: authConfig.jwtExpires,
		sameSite: 'lax',
	});
}

export async function setJWT(userData: I_UserPublic) {
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

	const cookieStore = cookies();

	cookieStore.set({
		name: 'token',
		value: token,
		path: '/',
		maxAge: authConfig.jwtExpires,
		sameSite: 'lax',
		httpOnly: true,
	});
}

interface I_TurnstileResponse {
	success: boolean;
}

export async function checkTurnstileToken(token: string) {
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

	const formData = new FormData();
	formData.append('secret', process.env.TURNSTILE_SECRET_KEY || '');
	formData.append('response', token);

	try {
		const result = await fetch(url, {
			body: formData,
			method: 'POST',
		});

		const outcome = (await result.json()) as I_TurnstileResponse;
		if (outcome.success) {
			return true;
		}
	} catch (err) {
		console.error(err);
	}
	return false;
}

export function getUserData() {
	const cookies = cookie.parse(document.cookie);
	const { userData } = cookies;

	// Check if userData exists and is a string
	if (!userData || typeof userData !== 'string') return null;

	try {
		return JSON.parse(userData) as I_UserPublic;
	} catch (error) {
		return null;
	}
}

export function isLoggedIn() {
	const userData = getUserData();
	return !!userData;
}