const {app,server} = require('./app'),
      port = process.env.PORT;

// app.set('view engine','hbs');                                       //setup for handlebars --> include it!
// app.set('views',path.join(__dirname, '../templates/views'));        //setup for handlebars --> set the views dir to be called templates!
// hbs.registerPartials(path.join(__dirname, '../templates/partials'));//setup for handlebars --> set the partials dir

app.get('', (req, res)=>        res.render('index', dict.index));
server.listen(port,()=>console.log(`server is up on ${port}`));