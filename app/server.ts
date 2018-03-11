import * as express from 'express';
import * as meow from 'meow';

const cli = meow(
  `Usage
$ smarty <options>

Options
--port, -p Port to serve the report to.

Examples
$ smarty 
  --port 11111
`,
  {
    flags: {
      port: {
        type: 'string',
        alias: 'p'
      }
    }
  }
);

const app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/report', async (req, res) =>
  res.json(
    JSON.parse(
      require('fs')
        .readFileSync('./data.json')
        .toString()
    )
  )
);

export const listen = (port: number) => {
  app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
};

listen(parseInt(cli.flags.port, 10) || 3000);
