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

  const { code, state } = event.queryStringParameters;

  try {
    const tokenParams = {
      code,
      redirect_uri: `${process.env.URL}/.netlify/functions/callback`,
    };

    const accessToken = await client.getToken(tokenParams);
    const token = accessToken.token.access_token;

    const script = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
            message.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      </script>
    `;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: script,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
