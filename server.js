require('dotenv').config();
const app = require('./app/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running inside container on port ${PORT}`);
  console.log(`🌐 Accessible from browser at http://localhost:5000`);
});
