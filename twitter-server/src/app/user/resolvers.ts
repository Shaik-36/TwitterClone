import axios from 'axios';
import prisma from '../../client/db';
import JWTService from '../../services/jwt';
import { GraphqlContext } from '../../interfaces';

interface GoogleTokenResult {
  iss?: string;               // Issuer of the token
  nbf?: string;               // Not before (optional time constraint)
  aud?: string;               // Audience the token is intended for
  sub?: string;               // Subject (unique identifier for the user)
  email: string;              // User's email address
  email_verified: string;     // Whether the email is verified
  azp?: string;               // Authorized party
  name?: string;              // Full name of the user
  picture?: string;           // URL to the user's profile picture
  given_name: string;         // User's first name
  family_name?: string;       // User's last name (optional)
  iat?: string;               // Issued at time
  exp?: string;               // Expiration time
  jti?: string;               // Token ID (unique identifier for the token)
  alg?: string;               // Algorithm used to sign the token
  kid?: string;               // Key ID used in the signature
  typ?: string;               // Type of the token (optional)
}


const queries = {


  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOauthURL = new URL('https://www.googleapis.com/oauth2/v3/tokeninfo');
    googleOauthURL.searchParams.append('id_token', googleToken);
    const { data } = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
      responseType: 'json',
    });

    // Check if the user exists in the database
    const CheckForUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // If the user does not exist, create a new user
    if (!CheckForUser) {
      await prisma.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastname: data.family_name, 
          profileImageURL: data.picture,
        },
      });
    }

    // Then generate a JWT token for the user
    // This token will be used to authenticate the user in future requests
    // This token will be stored in the client's browser
    // The client will send this token in the Authorization header of future requests
    // The server will then verify the token and authenticate the user
    // The client will then be able to access protected resources
    
    const userInDb = await prisma.user.findUnique({ where: { email: data.email } });

    if(!userInDb) throw new Error('User not found.');

    const userToken = JWTService.generateTokenForUser(userInDb);
    return userToken;

  },

  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {

    const id = ctx.user?.id;
    if(!id) return null;
    
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    }); 

    return user; 
  },  



};




  
export const resolvers = { queries };   