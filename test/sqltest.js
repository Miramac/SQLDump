var sql = require("node-sqlserver-unofficial"),
config = require("./sql_config.js").config,
assert = require("assert"),
util = require("util")
fs = require("fs")
;

var options = {
  table: "dbo.Employee",
  where: false
}


if(!config.connectionString) {
	console.log("This script cannot run without a connection string");
	return;
}

var query = "SELECT * FROM "+options.table+" WHERE 1=1";
query += (options.where) ? " AND ( "+options.where+" ) " : "";

sql.open( config.connectionString, function( err, conn ) {
  conn.queryRaw( query, function(err, results){
    if(assert) assert.ifError( err );
    if(results.rows.length === 0) {
       console.log("No data received");
      return false;
     }
    var i, exportColumns = [],  tableDump = "INSERT INTO "+options.table+" ( ";
    for(i=0; i<results.meta.length; i++) {
      if(results.meta[i].sqlType.indexOf('identity') === -1) {
        tableDump += ((i>0) ? ",":"") +results.meta[i].name;
        exportColumns.push(i);
      }
    }
    tableDump += ")\n";
    
    //data rows
    var rowStr, colIndex, cellVal;
    for(i=0;i<results.rows.length;i++) {
      rowStr = ((i>0) ? "UNION ALL\n":"") + "SELECT ";
      for(colIndex=0; colIndex<exportColumns.length; colIndex++) {
        cellVal = results.rows[i][exportColumns[colIndex]];
        cellVal = ((typeof cellVal === 'string' || typeof cellVal === 'object') && cellVal !== null) ? "'"+cellVal+"'": cellVal;
        rowStr += ((colIndex>0) ? ",":"") + cellVal;
      }
      tableDump += rowStr+"\n";
    }
    
    fs.writeFile(__dirname + "/"+options.table+".Data.sql", tableDump, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    }); 
    //console.log( util.inspect( results ) );
    //console.log(tableDump);
  });
});
  