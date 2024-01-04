const express = require('express');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));



app.use((req,res,next)=>{

  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers,Origin,X-Requested-With,Content-Type',);


  if(req.method === 'OPTIONS'){
      req.header('Access-Control-Allow-Methods','POST');
      return res.status(200).json({});
  }
  next();

});


app.post("/email",(req,res)=>{


    console.log(req.body);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "nodenoreplyjs@gmail.com",
        pass: "kqan jabk mpxr yqnj",
        }
      });
      
      var mailOptions = {
        to: req.body.friendEmail,
        subject: req.body.subject,
        text: req.body.body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);

             res.status(404).json({
                message:"Error To Send Mail",
                error:error

             })
        } else {
            res.status(200).json({
                message:"Successflly send the email",

             })
        }

     })  
});

app.use((req,res,next)=>{

  const error=new Error('Not found');
  error.status=400;

  next(error);

});


app.use (  (error,req,res,next)=>{

  res.status(error.status || 500);
  res.json({
      error:{
         message:error.message
      }
  }) });




   

app.listen(  process.env.PORT || '3000', () => {
  console.log('Server started on port 3000');
});
