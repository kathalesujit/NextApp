
import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log('Middleware Function call');

    const isLogin = request.cookies.get('logged');
    const isRestrictedPath = request.nextUrl.pathname.startsWith('/home') || request.nextUrl.pathname.startsWith('/demo');

    if (!isLogin) {
        // Redirect to login page if not logged in and trying to access a restricted path
        return NextResponse.redirect(new URL('/', request.url));
    }
    return null;
}

export const config = {
    // Define the paths that should be matched by this middleware
    matcher: ['/home/:path*'],
};
