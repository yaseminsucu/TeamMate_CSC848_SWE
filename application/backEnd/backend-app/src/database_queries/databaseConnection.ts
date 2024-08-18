import mysql from 'mysql2';

const databaseConnection = mysql.createPool({
    host: "csc648db.cxm460sq6jky.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "concatpassword",
    database: "TeammateDB",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default databaseConnection;