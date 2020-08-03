// import db from "./dbOracle";   
const oracledb = require( 'oracledb' );
const db = require("./dbOracle");   

const report = {

    testResult:async (req,res) => {
        try {
            var query = `
            UPDATE no_dmlrupdtab
           SET name = :name
           WHERE id IN (:id1, :id2)
           RETURNING id, ROWID INTO :ids, :rids
            `;

            var binds = {
                id1:   1001,
                id2:   1002,
                name:  "Chris",
                ids:   { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
                rids:  { type: oracledb.STRING, dir: oracledb.BIND_OUT }
            };

            var conn = await db.init();
            var result = await conn.execute(query, binds);

            conn.execute(query, function(err, result) {
                if (err) {
                  console.error(err.message);
                  doRelease(connection);
                  return;
                }
                console.log(result.metaData);
                console.log(result.rows);
                doRelease(connection);
                return callback(null, result.rows)
              });
        
              function doRelease(connection) {
                connection.release(function(err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
            }
            
console.log('result :>> ', result);
            return result; // Though return is here, finally will still run
        } catch (err) {
            throw err; // Let this bubble out after finally
        } finally {
            if (conn) { // If conn assignment worked, need to close
                try {
                    console.log('closed');
                    await conn.close();
                } catch (e) {
                    console.log(e); // want to know, but transaction already complete
                }
            }
        }
    }

}

report.testResult()

module.exports = report;