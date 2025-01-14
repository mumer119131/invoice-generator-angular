const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
const envFile = process.env.ENV_FILE || '.env.production';
const envConfig = dotenv.parse(fs.readFileSync(envFile));

// Write environment variables to dynamic Angular environment files
const targetPath = './src/environments/environment.production.ts';  // Ensure this is correct for production
const envFileContent = `export const environment = {
  production: true,
  ${Object.keys(envConfig)
    .map(key => `${key}: '${envConfig[key]}'`)
    .join(',\n')}
};`;

fs.writeFileSync(targetPath, envFileContent);
console.log(`Production environment file generated at ${targetPath}`);
