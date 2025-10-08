const { AuthorizationCode } = require('simple-oauth2');

exports.handler = async (event) => {
  const client = new AuthorizationCode({
    client: {
      id: process.env.OAUTH_CLIENT_ID,
      secret: process.env.OAUTH_CLIENT_SECRET,
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize',
    },
  });

  const authorizationUri = client.authorizeURL({
    redirect_uri: `${process.env.URL}/.netlify/functions/callback`,
    scope: 'repo,user',
    state: event.queryStringParameters.state || '',
  });

  return {
    statusCode: 302,
    headers: {
      Location: authorizationUri,
    },
  };
};
