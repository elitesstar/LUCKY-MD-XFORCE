const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0dKV0xWZGFTYWliNUdFcktFZXRBT0h5L01pOW1QY081NlBBNWRCQ1Axdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL294cnArNy9iNlpzVSsyanpLUzE3aXJPV1JGZUtoUGFFTzVPcndTcDR3UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRkxVTzFXb1JqbnY1NHVtdXFVS29ZbDRyKzRuY2lOSXQwaUlkdkpjU2wwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmT3RQTllad0FhRkYwWlZqaG9zWGk5Y1ZlSXZNcXd0elYrNGE0cmVjSmhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlKcHd3VjFZRUVRaUhYbW9DUStoQkJtUmtOSDU1Y3B3dFBVcW5sRXZBVjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktZN1p1R0JaQWxoVys2V0VHejNYcms3NmtyVmpZNUJoamJoWW9iSFB4bFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0tsVmNTTm5mV3pUR2dmTmExc2ZCdDMrZitvK3JMSzhqUlVKTXpxUitsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNjlnaHgrWGkrK3lscXNZZHU4RWlMSDA5RkR6ZnVTaHVnTlNJTFhXdjdBST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFjV2pBVHAvbjgzbWUzdmhmekRBUjRGbmdwTFo0aktLeWdqRHp5Yk1mczg2SUVuUSt6LzF2MXhGL0ZZeXJrbWFUaTRlNmcrTkhpYTFzZHlkRGs5bmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJNd1VGbG5hVUd5S0ZUdVpyQ29kQjM5T1k0cFZZeVpRT3Y4U0c4OERIaDIwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwNzcyNDYzMDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNkE1RTFGRDA4QUZGOTUxNTA5N0M1RkM1QUMzNTZEMDgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NjkzMDkxM30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA3NzI0NjMwM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3ODUyMDg5MEE3RDU1QjBCMUQ0RUNFMkQ0MTg5NjVBMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ2OTMwOTE0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MDc3MjQ2MzAzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVDNEVCQzlBRTYwRTExNUM0MUM2QTBDRjFDQUI0N0YzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDY5MzA5MTV9XSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImItZ2VQNGlFUXVhSk5la1QxWkREQWciLCJwaG9uZUlkIjoiNmYwZmQzOGUtMTc1NC00MTI3LWEwNjQtNDU3Y2JkY2UwYzJiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlovM0ZGTXNKSEZuUXptTnM1TzZJZ3ZMY2hlbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwOSthdGlBTmttcDNpTk1sUWwvS3hsQzJOQTA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiM1ROQUJOM0QiLCJtZSI6eyJpZCI6IjIzNDgwNzcyNDYzMDM6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJXZXNzb24gMiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2F4cC9FQ0VOS1pnTUVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaE1XcWNvaWIrN3JLZkYxSnppbXhwdHFsanRkcGdReThPYXVzb1BGcTdoRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNnRlRDRMamtQY1dWeDcrdFY5Y25WcnBMM08weE8yTXBTL3llek9HZi9YRjF6SUVkT0tZS2llTGVuSzFvb0prbHFYcHgzZms2WVZaWHJpMGRXSXVFQVE9PSIsImRldmljZVNpZ25hdHVyZSI6ImQ4Y0lpNXZKWFFzMTE5OVpJL1VYdkR5N29sS2lHR2RYOUFQMStnYy8weVVXWktlbDhMN3EwOVB5QmQ2bkNIUmFtN1cwMHc5dnR3dWJZdFE1YUlyTGhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA3NzI0NjMwMzoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllURnFuS0ltL3U2eW54ZFNjNHBzYWJhcFk3WGFZRU12RG1ycktEeGF1NFIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDY5MzA5MTIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSnowIn0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348075679581",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️LUCKY-MD-XFORCE☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "☢️LUCKY-MD-XFORCE☢️",
    BOT : process.env.BOT_NAME || '☢️LUCKY-MD-XFORCE☢️⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dar_Es_Salam", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
