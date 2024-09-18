const fs = require("fs");
const logreqres=()=>{
    // Middleware for logging requests
return (req, res, next) => {
    fs.appendFile(filepath,
        `\n ${new Date().toLocaleDateString()} ${req.ip} ${req.path} ${req.method}`,
        (err, data) => {
            next();
        }
    );
};
}

module.exports={logreqres};