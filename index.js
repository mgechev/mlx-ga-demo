const { fetch } = require('@mlx/ga');
const { parseRoutes, ProjectType } = require('@mlx/parser');
const { writeFileSync } = require('fs');

const key = require('./credentials.json');
const viewId = '128035004';

const applicationRoutes = parseRoutes(
  '/Users/mgechev/Projects/ng-dd-bundled/src/tsconfig.app.json',
  ProjectType.Angular
);

fetch({
  key,
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

