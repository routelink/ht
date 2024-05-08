
import app from './app';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://${host}:${port}`);
  /* eslint-enable no-console */
});
