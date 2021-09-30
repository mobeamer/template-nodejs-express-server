const DataPacket = require("./server-data-packet.class");

module.exports = class User
{
  constructor(params) {
    this.debug = true;
    
    this.userID = -1;
    
    this.userGuid = -1;
    
    this.data = {};
    
    }



  async newUser(conn, data)
  {
    return new Promise(resolve => 
    {
      var dataOut = new DataPacket();
      dataOut.message = "loading";

      var sql = "select count(*) as numUsers from h_user where username = '" + data.username + "'";

      conn.query(sql, function (err, result) {
        if (err) throw err;
        result = result[0];
        console.log("RESULTS");
        console.log(result.numUsers);

        if(result.numUsers > 0)
        {
          dataOut.hadError = true;
          dataOut.message = "That username is in use";
          console.log("Username in use");
          resolve(dataOut);

        }
 
      });


      var sql = "insert into h_user (userName, userGuid, userPass, email, isGuestAccount, securityLevel) values ";
      sql += " ('" + data.username + "',";
      sql += " MD5('" + data.password + "'),";
      sql += " MD5('" + data.password + "'),";
      sql += " '" + data.email + "',";
      sql += " 'N',";
      sql += " 'user'";
      sql += " )";
      
      conn.query(sql, function (err, result) {
        if (err) throw err;
        
          dataOut.hadError = true;
          dataOut.message = "User was added";
          console.log("User was added");
          resolve(dataOut);
 
      });




      //resolve(dataOut);

    }) //end promise

  }


  
  async authenticate(conn, data)
  {
    return new Promise(resolve => 
    {
      var dataOut = new DataPacket();
      dataOut.message = "";

      var sql = "select count(*) as numUsers from h_user where username = '" + data.username + "' and userPass = MD5('" + data.password + "')";

      conn.query(sql, function (err, result) {
        if (err) throw err;
        result = result[0];

        if(result.numUsers <= 0)
        {
          dataOut.hadError = true;
          dataOut.message = "Invalid credentials";
          resolve(dataOut);

        }
 
      });

      var sql = "select userID, username, userGuid, securityLevel from h_user where username = '" + data.username + "' and userPass = MD5('" + data.password + "')";

      conn.query(sql, function (err, result) {
        if (err) throw err;
        result = result[0];

        dataOut.data = result;
        dataOut.hadError = false;
        resolve(dataOut);

      });


      console.log("OH NO, no promise hit...");

      //resolve(dataOut);

    }) //end promise

  }


  getData()
  {
    var out = new Object();
    out.userID = this.userID;
    out.userGuid = this.userGuid;
    out.data = this.data;
    return out;
  }
}
