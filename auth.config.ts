import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    // callbacks: {
    //     authorized({ auth, request: { nextUrl } }) {
    //         const isLoggedIn = !auth?.user;
    //         const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //         if (isOnDashboard) {
    //             if (isLoggedIn) return true;
    //             return false; // redirect unauthenticated users to login page
    //         } else if (isLoggedIn) {
    //             return Response.redirect(new URL('/dashboard', nextUrl));
    //         }
    //         return true;
    //     },
    // },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          const isLoginPage = nextUrl.pathname === '/login';
      
          if (isOnDashboard) {
            return isLoggedIn; // allow access only if logged in
          }
      
          if (isLoginPage && isLoggedIn) {
            // redirect logged-in users away from login page
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
      
          return true; // allow access to all other pages
        },
      },
      
    providers: [], // add providers with an empty array for now
} satisfies NextAuthConfig;