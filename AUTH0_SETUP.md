# Auth0 Setup Guide

## Environment Variables

Create a `.env` file in the `CRUD-Frontend` directory with the following variables:

```env
# Auth0 Configuration
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=your-api-identifier

# API Configuration
API_URL=http://localhost:8080
```

## Auth0 Application Setup

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new application or use an existing one
3. Set the application type to "Single Page Application"
4. Configure the following settings:

### Allowed Callback URLs

```
http://localhost:3000
http://localhost:3000/
```

### Allowed Logout URLs

```
http://localhost:3000
http://localhost:3000/
```

### Allowed Web Origins

```
http://localhost:3000
```

## Social Connections (GitHub)

1. In your Auth0 dashboard, go to "Authentication" > "Social"
2. Enable GitHub connection
3. Configure your GitHub OAuth app:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth app
   - Set Authorization callback URL to: `https://your-domain.auth0.com/login/callback`
   - Copy the Client ID and Client Secret to Auth0

## API Setup (Optional)

If you want to use Auth0's API features:

1. In Auth0 dashboard, go to "Applications" > "APIs"
2. Create a new API or use the default "Auth0 Management API"
3. Set the identifier (this will be your `REACT_APP_AUTH0_AUDIENCE`)

## Testing

1. Start your backend server: `cd CRUD-Backend && npm start`
2. Start your frontend: `cd CRUD-Frontend && npm start`
3. Navigate to `http://localhost:3000`
4. Click "Login with Auth0" to test the integration

## Troubleshooting

- Make sure all environment variables are set correctly
- Check that your Auth0 application settings match the URLs above
- Ensure your GitHub OAuth app is properly configured
- Check the browser console for any error messages
