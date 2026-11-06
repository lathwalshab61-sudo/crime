import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  CrimeScene Hub Forensics API Server`);
  console.log(`  Port: http://localhost:${PORT}`);
  console.log(`  Status: ONLINE • ISO/IEC 17025 Accredited`);
  console.log(`=======================================================`);
});

