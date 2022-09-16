import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // If the component below is wrapped in empty tags and another component is added above it, that will show up on all pages. 
  return <Component {...pageProps} />
}

export default MyApp
