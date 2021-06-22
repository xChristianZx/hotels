import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from '../../../config/config';

const providers = [
  Providers.Credentials({
    name: 'credentials',

    authorize: async (credentials, req) => {
      try {
        const res = await axios.post(
          '/auth/login',
          { email: credentials.email, password: credentials.password },
          {
            withCredentials: true,
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
            },
          }
        );

        if (res.status === 200) {
          return res.data;
        }
      } catch (e) {
        // Redirecting to the login page with error message and persisting callback in the URL
        const errorMessage = e.response.data.message;
        console.log('NextAuth Login Error', e.response.data);
        throw new Error(errorMessage + `&callbackUrl=${req.body.callbackUrl}`);
      }
    },
  }),
];

const callbacks = {
  async signIn(user, account, profile) {
    if (user) {
      return true;
    }
  },

  async redirect(url, baseUrl) {
    return url.startsWith(baseUrl)
      ? Promise.resolve(url)
      : Promise.resolve(baseUrl);
  },

  // Getting the JWT token from API response
  async jwt(token, user) {
    if (user) {
      token = user.user;
      token.name = user.user.fullName;
      token.accessToken = user.token;
    }
    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    session.user.firstName = token.firstName;
    session.user.lastName = token.lastName;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
