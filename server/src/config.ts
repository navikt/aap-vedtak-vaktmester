const APP_URL = process.env.APP_URL || 'localhost:3000'
const DEVTOOLS_API_URL = process.env.OPPGAVESTYRING_API_URL || 'localhost:5000'
const DEVTOOLS_API_AUDIENCE = process.env.DEVTOOLS_API_AUDIENCE || 'localhost:devtools'
const DEVTOOLS_API_SCOPE = process.env.DEVTOOLS_API_SCOPE || 'api://localhost.devtools/.default'
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  BASE_PATH: '/aap-vaktmester',
  APP_URL,
  DEVTOOLS_API_URL,
  DEVTOOLS_API_AUDIENCE,
  DEVTOOLS_API_SCOPE
};
