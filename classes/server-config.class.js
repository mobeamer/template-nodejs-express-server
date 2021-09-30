module.exports = class Config
{
  constructor() {}

  getDatabaseConfig()
  {
    var out = {
        host: "localhost",
        database: "test_database",
        user: "web-db-user",
        password: "ChangeThisPass!"
      };
    
      return out;
  }
}

