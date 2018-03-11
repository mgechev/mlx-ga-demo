const { fetch } = require('@mlx/ga');
const { parseRoutes, ProjectType } = require('@mlx/parser');
const { writeFileSync } = require('fs');

const key = require('./credentials.json');
const viewId = '128035004';

const applicationRoutes = parseRoutes(
  '/Users/mgechev/Projects/ng-dd-bundled/src/tsconfig.app.json',
  ProjectType.Angular
);

fetch(
  key,
  viewId,
  {
    startDate: new Date('2016-1-1'),
    endDate: new Date('2018-2-24')
  },
  r => r.replace('/app', ''),
  applicationRoutes.map(f => f.path)
).then(g => {
  writeFileSync('data.json', JSON.stringify(g, null, 2));
});
