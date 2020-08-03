const oracledb = require('oracledb');


try {
    oracledb.initOracleClient({ libDir: '/Users/diego.teles/Downloads/instantclient_19_3' });
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

oracledb.connectionClass = "HRPOOL";
// oracledb.outFormat = oracledb.OBJECT;

const dbOracle = {
  init: async () => {
      
    return new Promise(resolve => {
        oracledb.createPool(
          {
            user: 'dummy',
            password: 'dummy',
            connectString: `localhost:1521/ORCLCDB.localdomain`,
            _enableStats: true,
            poolMax: 44,
            poolMin: 2,
            poolIncrement: 5,
            poolTimeout: 4
          },
          (err, pool) => {
            if (err) {
              console.log(
                "ERROR: ",
                new Date(),
                ": createPool() callback: " + err.message
              );
              return;
            }
            console.log(
              "INFO: Module getConnection() called - attempting to retrieve a connection using the node-oracledb driver"
            );
            pool.getConnection((err, connection) => {
              pool._logStats();
              if (err) {
                console.log("ERROR: Cannot get a connection: ", err);
                return resolve(err);
              }
              if (typeof pool !== "undefined") {
                console.log(
                  "INFO: Connections open: " + pool.connectionsOpen
                );
                console.log(
                  "INFO: Connections in use: " + pool.connectionsInUse
                );
              }
              
              /* var sql = "SELECT CURRENT_DATE FROM DUAL";
              connection.execute(sql, (err, r) => {
                console.log(r.rows);
              });  */
              return resolve(connection);
            });
          }
        );
    });
  }
}
module.exports = dbOracle
