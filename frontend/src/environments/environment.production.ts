export const environment = {
  production: false,
  BACKEND_URL: process.env['BACKEND_URL'] || 'http://localhost:3000',
  FRONTEND_URL: process.env['FRONTEND_URL'] || 'http://localhost:4200'
};