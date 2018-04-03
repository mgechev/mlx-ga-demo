const { fetch } = require('@mlx/ga');
const { parseRoutes, ProjectType } = require('@mlx/parser');
const { writeFileSync } = require('fs');
const { auth } = require('google-oauth2-node');
const { google } = require('googleapis');

const ClientID = '329457372673-hda3mp2vghisfobn213jpj8ck1uohi2d.apps.googleusercontent.com';
const ClientSecret = '4camaoQPOz9edR-Oz19vg-lN';
const Scope = 'https://www.googleapis.com/auth/analytics.readonly';

const key = require('./credentials.json');
const viewId = '128035004';

const applicationRoutes = parseRoutes(
  '/Users/mgechev/Projects/ng-dd-bundled/src/tsconfig.app.json',
  ProjectType.Angular
);

auth({
  clientId: ClientID,
  clientSecret: ClientSecret,
  scope: Scope
}).then(getData, err => {
  console.error(err);
});

const getData = ({ access_token, refresh_token }) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token,
    refresh_token
  });

  fetch({
    auth: oauth2Client,
    viewId,
    period: {
      startDate: new Date('2016-1-1'),
      endDate: new Date('2018-2-24')
    },
    formatter: r => r.replace('/app', ''),
    routes: applicationRoutes.map(f => f.path)
  }).then(g => {
    writeFileSync('data.json', JSON.stringify(g, null, 2));
  });
};
