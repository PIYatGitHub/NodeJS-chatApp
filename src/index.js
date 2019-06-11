const app = require('./app'),
      express = require('express'),
      path = require('path'),
      port = process.env.PORT;

// app.set('view engine','hbs');                                       //setup for handlebars --> include it!
// app.set('views',path.join(__dirname, '../templates/views'));        //setup for handlebars --> set the views dir to be called templates!
// hbs.registerPartials(path.join(__dirname, '../templates/partials'));//setup for handlebars --> set the partials dir
app.use(express.static(path.join(__dirname, '../public')));         //setup for static dir to serve, e.g. the public folder...

app.get('', (req, res)=>        res.render('index', dict.index));


app.listen(port,()=>console.log(`server is up on ${port}`));