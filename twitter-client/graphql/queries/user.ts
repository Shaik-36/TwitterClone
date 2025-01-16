import { graphql } from "../../gql"; // Adjust the import path based on your project structure

// Define the query to verify the Google token
export const verifyUserGoogleTokenQuery = graphql(`
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

// Example: Query to fetch the current user
export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      firstName
      lastname
      profileImageURL
    }
  }
`);
