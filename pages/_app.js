import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // If the component below is wrapped in empty tags and another component is added above it, that will show up on all pages.
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
