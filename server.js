const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now} - ${req.method} - ${req.url}`;
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs',{
//     pageTitle:'Maintenance Page',
//     warningMessage:'Will be back soon'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});

hbs.registerHelper('getSomeVar',()=>{
  return 'my new web page hahahah ';
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

hbs.registerHelper('maintenance',()=>{
  return 'Maintenance in progress';
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page again',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});
