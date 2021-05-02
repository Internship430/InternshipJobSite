const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "InternshipAdmin",
	password: "430Admin",
	database: "internship"
};

const pool = new Pool(config);  //database

function selectQuery(what, table, where){
    if(where != ""){
        where = " WHERE " + where;
    }
    select = "SELECT " + what + " FROM $" + table + where +";";
    return pool.query(select);
}