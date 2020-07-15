const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = 'prod';
const isProduction = environment === 'prod';

const targetPath = isProduction
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    firebaseConfig: {
        "apiKey": "${process.env.FIREBASE_API_KEY}",
        "authDomain": "${process.env.FIREBASE_AUTH_DOMAIN}",
        "databaseURL": "${process.env.FIREBASE_DB_URL}",
        "projectId": "${process.env.FIREBASE_PROJECT_ID}",
        "storageBucket": "${process.env.FIREBASE_STORAGE_BUCKET}",
        "messagingSenderId": "${process.env.FIREBASE_MESSAGE_SEND_ID}",
        "appId": "${process.env.FIREBASE_APP_ID}"
    },
    stravaConfig: {
        "stravaAuthUrl": "${process.env.STRAVA_AUTH_URL}",
        "stravaBaseApiUrl": "${process.env.STRAVA_BASE_API_URL}",
        "clientId": "${process.env.STRAVA_CLIENT_ID}",
        "clientSecret": "${process.env.STRAVA_CLIENT_SECRET}",
        "grantType": "grant_type=authorization_code",
        "grantRefreshType": "grant_type=refresh_token"
    }
}
`;

writeFile(targetPath, environmentFileContent, function(err) {
    if(err) {
        console.log(err);
    }
});