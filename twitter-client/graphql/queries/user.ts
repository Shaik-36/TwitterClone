const verifyUserGoogleTokenQuery = `#graphql
  query verifyUserGoogleToken($token: String!) {
  
    verifyUserGoogleToken(token: $token) {
      id
      email
`