require('@babel/register');
const app = require('./app.js');

app.listen(process.env.APP_PORT || process.env.PORT || 3000, () => {
  console.log('Process is listening to all incoming requests on post 3000');
});
