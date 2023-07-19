import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignInButton,
  SignUp
} from "@clerk/nextjs";
import { DataProvider } from '@/context/DataProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <DataProvider>
        <SignedIn>
          <Component {...pageProps}/>
        </SignedIn>
        <SignedOut>
          <SignInButton/>
        </SignedOut>
      </DataProvider>
    </ClerkProvider>
  );
}
