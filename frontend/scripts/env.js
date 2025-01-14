const fs = require('fs');
const dotenv = require('dotenv');

// Load the appropriate .env file only for local development
if (process.env.NODE_ENV !== 'production') {
  const envFile = process.env.ENV_FILE || '.env.development';
  const envConfig = dotenv.parse(fs.readFileSync(envFile));

  // Write environment variables to a dynamic Angular environment file
  const targetPath = './src/environments/environment.dynamic.ts';
  const envFileContent = `export const environment = {
    production: ${process.env.NODE_ENV === 'production'},
    ${Object.keys(envConfig)
      .map(key => `${key}: '${envConfig[key]}'`)
      .join(',\n')}
  };`;

  fs.writeFileSync(targetPath, envFileContent);
  console.log(`Environment file generated at ${targetPath}`);
} else {
  // On Vercel (production), environment variables are automatically injected
  const targetPath = './src/environments/environment.dynamic.ts';
  const envFileContent = `export const environment = {
    production: true,
    API_URL: process.env.API_URL,  // Read from Vercel environment variables
    OTHER_VAR: process.env.OTHER_VAR  // Example of another environment variable
  };`;

  fs.writeFileSync(targetPath, envFileContent);
  console.log('Vercel environment variables injected');
}
