# VeraCodia OAuth Provider for Decap CMS

This is a simple OAuth provider for GitHub authentication with Decap CMS.

## Deployment Steps

### 1. Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name**: VeraCodia CMS OAuth
   - **Homepage URL**: `https://veracodia.github.io/VeraCodia-WebApp`
   - **Authorization callback URL**: `https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/callback`
     (You'll update this after deployment)
4. Click **Register application**
5. Note your **Client ID** and generate a **Client Secret**

### 2. Deploy to Netlify

1. Go to https://app.netlify.com
2. Click **Add new site** → **Import an existing project**
3. Choose **Deploy manually** or connect this folder as a Git repo
4. Set base directory to: `oauth-provider`
5. Leave build command empty
6. Click **Deploy**

### 3. Configure Environment Variables

After deployment:
1. Go to **Site settings** → **Environment variables**
2. Add:
   - `OAUTH_CLIENT_ID` = Your GitHub OAuth Client ID
   - `OAUTH_CLIENT_SECRET` = Your GitHub OAuth Client Secret

### 4. Update GitHub OAuth App Callback

1. Go back to your GitHub OAuth App settings
2. Update **Authorization callback URL** to:
   `https://YOUR-ACTUAL-NETLIFY-URL.netlify.app/.netlify/functions/callback`

### 5. Update Your Admin Config

In your main website's `src/pages/admin/index.astro`, update:

```javascript
backend: {
  name: 'github',
  repo: 'VeraCodia/VeraCodia-WebApp',
  branch: 'main',
  base_url: 'https://veracodia-cms-oauth.netlify.app',
  auth_endpoint: '/.netlify/functions/auth'
}
```

## Testing

1. Visit your admin page: `https://veracodia.github.io/VeraCodia-WebApp/admin/`
2. Click "Login with GitHub"
3. Authorize the app
4. You should be logged in and able to edit content!
