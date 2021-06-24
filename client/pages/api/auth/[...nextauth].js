import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from '../../../config/config';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: { accept: '*/*', 'Content-Type': 'application/json' },
});

const providers = [
  Providers.Credentials({
    id: 'credentials-signup',
    name: 'Sign Up',
    authorize: async (credentials, req) => {
      try {
        const { data, status } = await axiosInstance.post('/auth/signup', {
          ...credentials,
        });
        if (status === 201 && data.user) {
          return data;
        }
      } catch (e) {
        const errorMessage = e.response.data.message;
        console.log('NextAuth SignUp Error', e.response.data);
        // https://next-auth.js.org/providers/credentials#example
        throw `/auth/signup?error=${errorMessage}&callbackUrl=${req.body.callbackUrl}`;
      }
    },
  }),
  Providers.Credentials({
    id: 'credentials-login',
    name: 'Login',

    authorize: async (credentials, req) => {
      try {
        const { data, status } = await axiosInstance.post('/auth/login', {
          email: credentials.email,
          password: credentials.password,
        });

        if (status === 200 && data.user) {
          return data;
        }
      } catch (e) {
        // Redirecting to the login page with error message and persisting callback in the URL
        const errorMessage = e.response.data.message;
        console.log('NextAuth Login Error', e.response.data);
        throw `/auth/login?error=${errorMessage}&callbackUrl=${req.body.callbackUrl}`;
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
    return Promise.resolve(url);
    // Saving should there be issues in prod
    // return url.startsWith(baseUrl)
    //   ? Promise.resolve(url)
    //   : Promise.resolve(baseUrl);
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
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
