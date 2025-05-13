const fs = require('fs');
const path = require('path');
const FTPServer =require('ftp-srv');

const ftpFolder = path.join(__dirname,  "ftp_uploads");

fs.mkdirSync(ftpFolder, {recursive: true});

const logFilePathn = path.join(__dirname, 'uploads.log');

function logUPload(fileName){
    const time = new Date().toDateString()
    const message = `[UPLOAD] ${fileName} - ${time}\n`
    
    fs.appendFileSync(logFilePathn, message)

    console.log("log gravado", message.trim())

}
 
const Serve = new FTPServer({
    url: "ftp://127.0.0.1.21",
    annoymous: false,
    pasv_min: 1024,
    pasv_max: 1050,
    pasv_url: "127.0.0.1"
})

const USER = "admin"
const PASSWORD = "1234"

server.on("login", ({username, password}, resolve, 
    reject)=>{
    console.log(`tentativa de login: ${username}`)
    if (username === USER && password === PASSWORD) {
        resolve({root: ftpFolder})
    } else {
        reject(new Error('credenciais invalidas'))
    }
}
)

server.listen().then(()=>{
    console.log(`Servidor rodando em ftp://127.0.0.1:21`)

    fs.watch(ftpFolder,(eventType, fileName)=>{
         if (eventType === "rename" && fileName) {
            const fullPath = path.join(ftpFolder,fileName);
         }
         if(fs.existsSync(fullPath)){
            logUPload(fileName)
         }
    })
})