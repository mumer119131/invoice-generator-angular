const fs = require('fs');
const dotenv = require('dotenv');

// Load the appropriate .env file
const envFile = process.env.ENV_FILE || '.env.development';
const envConfig = dotenv.parse(fs.readFileSync(envFile));

// Write the variables to a file
const targetPath = './src/environments/environment.dynamic.ts';
const envFileContent = `export const environment = {
  production: ${process.env.ENV === 'production'},
  ${Object.keys(envConfig)
    .map(key => `${key}: '${envConfig[key]}'`)
    .join(',\n')}
};`;

fs.writeFileSync(targetPath, envFileContent);
console.log(`Environment file generated at ${targetPath}`);
