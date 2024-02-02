const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')


// const mongoConnect=require('./util/database').mongoConnect
const errorController = require('./controllers/error');
const User=require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65bb4f4052fe327e443153de')
    .then(user => {
        // console.log(user)
      req.user =user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// mongoConnect(()=>{
//     console.log('connected')
//     app.listen(3000)
// })
mongoose.connect('mongodb+srv://adnanfayazwani07:00000000@shoppinapp07.mea8bcg.mongodb.net/shop?retryWrites=true&w=majority')
  .then(() => {
    console.log('connected to mongoose')
    User.findOne().then(user => {
      if (!user) {
        User.create({
          name: "adnan",
          email: "adnanfayazwani07@gmail.com",
          cart: []
        })
      }
    }).then(() => {
      app.listen(3000);
    }).catch((err) => {
      console.log('error in connection', err)
    })
  })

app.use(errorController.get404);