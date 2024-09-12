import { NextRequest, NextResponse } from 'next/server';
import { getJwt, isNotExpiredToken } from './utils/auth';
import { ApiResponse, ApiRoles, AuthPayload } from './global';
import apiRolesJson from '../json/apiRoles.json';
import authConfig from "@config/authConfig";

// Add whatever paths you want to PROTECT here
const authRoutes = ['/app/*', '/account/*', '/admin/*'];

// Function to match the * wildcard character
function matchesWildcard(path: string, pattern: string): boolean {
	if (pattern.endsWith('/*')) {
		const basePattern = pattern.slice(0, -2);
		return path.startsWith(basePattern);
	}
	return path === pattern;
}

// Function to delete auth cookies and redirect
// function deleteCookiesAndRedirect(url: string) {
// 	const response = NextResponse.redirect(url);
// 	response.cookies.delete('token');
// 	response.cookies.delete('userData');
// 	return response;
// }

export async function middleware(request: NextRequest) {

	
	
	// // Shortcut for our login path redirect
	// // Note: you must use absolute URLs for middleware redirects
	// const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirect=${
	// 	request.nextUrl.pathname + request.nextUrl.search
	// }`;
	
	// let apiRoles: ApiRoles[];
	// apiRoles = apiRolesJson;
	
	// const apiRole = apiRoles.find(p=> p.url == request.nextUrl.pathname);
	// let methods = apiRole?.methods;
	// const hasMethod = methods?.some((t) => t === request.method);
	// let token: string | undefined;
	// if(request.cookies.has(authConfig.jwtTokenName)){
	// 	token = request.cookies.get(authConfig.jwtTokenName)?.value;
	// }
	// let jwtPayload = {} as AuthPayload | null;
	
	// if (authRoutes.some(pattern => matchesWildcard(request.nextUrl.pathname, pattern)) || (apiRole != null && methods?.some((t) => t === request.method))) {
	// 	//const token = request.cookies.get('token');
		
	// 	// For API routes, we want to return unauthorized instead of
	// 	// redirecting to login
	// 	// if (request.nextUrl.pathname.startsWith('/api')) {
	// 	// 	if (!token) {
	// 	// 		const response: ApiResponse = {
	// 	// 			success: false,
	// 	// 			message: 'Unauthorized',
	// 	// 		};
	// 	// 		return NextResponse.json(response, { status: 401 });
	// 	// 	}
	// 	// }
	// 	// If no token exists, redirect to login
	// 	if (token == undefined || token == "") {
	// 		NextResponse.redirect(LOGIN);
	// 	}else{
	// 		if(!isNotExpiredToken(token)){
	// 			request.cookies.delete(authConfig.jwtTokenName);
	// 			NextResponse.redirect(LOGIN);
	// 		}
	// 	}
	// 	try {
	// 		// Decode and verify JWT cookie
	// 		jwtPayload = await getJwt(token);
			
	// 		// If you have an admin role and path, secure it here
	// 		if (request.nextUrl.pathname.startsWith('/admin')) {
	// 			if (jwtPayload?.role !== 'admin') {
	// 				return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/access-denied`);
	// 			}
	// 		}
	// 		let isvalidRole = false;

	// 		apiRole?.roles.some((value) => {
	// 			if(value.toLowerCase() === jwtPayload?.role.toLowerCase()){
	// 				isvalidRole = true;
	// 			}
	// 		})
			
	// 		if(!isvalidRole)
	// 		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/access-denied`);

		
	// 	} catch (error) {
	// 		console.error(error);
	// 		NextResponse.redirect(LOGIN);
	// 	}
	// }
	// let redirectToApp = false;
	// // Redirect login to app if already logged in
	// if (request.nextUrl.pathname === '/login') {

	// 	if(token == undefined){
	// 		NextResponse.redirect(LOGIN);
	// 	}else{
	// 		redirectToApp = true;
	// 	}
	// }
	// if (redirectToApp) {
	// 	// todo: Redirect to app dashboard
	// 	return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
	// } else {
	// 	// Return the original response unaltered
	// 	return NextResponse.next();
	// }
}