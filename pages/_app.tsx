import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from "../context/UserContext";

import "../styles/globals.css";
import { NextPageWithLayout } from "./page";


interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <div className="font-geomanist">
      <AuthProvider>
        <GoogleOAuthProvider clientId="504618170521-qa7gi3u9u548d4g01k16niv5tljgdfis.apps.googleusercontent.com">
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
