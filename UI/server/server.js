var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/apps', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(express.static(path.join(__dirname, './dist/v3App')));
app.use('/*',express.static(path.join(__dirname, '/*')));
app.use('/images',express.static(path.join(__dirname, '/images')));
app.use('/layout',express.static(path.join(__dirname, '/layout')));
app.set('view engine','html');
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: true
}));
const appSchema = mongoose.Schema({
    seckey: String,
    emailId: String
}, {
    timestamps: true
});
var appSecret = mongoose.model('appSecret', appSchema);
app.post('/seckey',(req,res)=>{
  console.log(req.body);
  const secret = new appSecret({
        emailId: 'req.body.emailId',
        seckey: 'req.body.seckey'
    });
    secret.save()
    .then(data => {
       // respData._id = data._id
       // respData.secret = data.secret
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the secret."
        });
    });
  //res.json({encrypted:'RpRxk72JWRyai/3lh4U2o873S4dtOcRcfjT/xGGgYa+oY1hATjRqEvx5fK8q1crNPBev/AxSejnZ4z3DV4BVC9OeGMTSkNh5/mN0r1V/XZU0H6azawG2U5nJu6KM7uZvOUu+4WnGnuVwckNwiPiLnjZM5jkBmZyB5nCjskWjEF5gSZqges/Yg9jQG8fMozMkfeVBZY+JBs/7WtNo0uVYgwfXwcIjGpIBZzzcVSDPhGNI4Gpa91R5XlgtjX/8fURY33QXZ906bGtGaNPrxEINBIZgEd64LhtqXN3/K3M2ZQLZ1ksB9bb/5hXDrDUGhQa9S6CZE/topY69WjQ6W3oQWdrDR7m3aFK+YLOGm9p7UzWpbxFUe9iwG6FdR2Q0xthMILIsWg+hBnrdsZV5c6URQSVaWprNgGIPihSfhKzOAYuTRE3OLdEUEadIAMn42aTjpVCqdbINsWwQjm2Yfh61r5ZPcFIkSXemx8S8rGF4XlpF61MBeu9pSAdCWQOaf2xGw/rhCR5pOL2KdTcbQv8AxDlt+EnVfKa5h/ubT94UumuOunLgxJyKJU/fI7f2uZYfxW26tpFxI1kdo3ByAWmZqAiiAFU4EkHaz9H5M8UXR0Dqe7/rM2oq5YY7kaqatJCJI/nuDDzPFdXSPgTKyFb9n1hjYHiFwYwgU2A8vOpDojo='});
})
app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname,'./dist/v3App/index.html'));
});
app.listen(8081,function(){
  console.log('EK Server running');
})