import axios from 'axios';
import prisma from '../../client/db';
import JWTService from '../../services/jwt';
import { GraphqlContext } from '../../interfaces';

interface GoogleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  // Verify Google Token and create/find user
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleOauthURL = new URL('https://www.googleapis.com/oauth2/v3/tokeninfo');
    googleOauthURL.searchParams.append('id_token', token);

    let data: GoogleTokenResult;

    try {
      const response = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
        responseType: 'json',
      });
      data = response.data;
    } catch (error) {
      console.error("Google OAuth verification failed:", error);
      throw new Error("Invalid Google token.");
    }

    // Validate email and email verification
    if (!data.email || data.email_verified !== "true") {
      throw new Error("Invalid or unverified email address.");
    }

    // Check if user exists or create a new one
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {}, // No update needed
      create: {
        email: data.email,
        firstName: data.given_name,
        lastname: data.family_name ?? '', // Handle optional last name
        profileImageURL: data.picture ?? '', // Handle optional picture
      },
    });

    console.log("User found or created:", user.email);

    // Generate a JWT for the user
    const userToken = await JWTService.generateTokenForUser(user); // Await the promise


    return userToken;
  },

  // Get the current logged-in user
  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;

    if (!id) {
      console.warn("No user ID found in context.");
      return null;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        console.warn(`User with ID ${id} not found.`);
        return null;
      }
      console.log("Fetched current user:", user.email);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to retrieve user.");
    }
  },
};

export const resolvers = { queries };
