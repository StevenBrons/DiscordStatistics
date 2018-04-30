require('./env');
const Database = require('./Database');

const database = new Database();

const databaseConf = {
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

console.log(databaseConf)

database.connect(databaseConf).then(async () => {
  await database._deleteGuildMember({ id: 43, guild: { id: 53 } });
});
