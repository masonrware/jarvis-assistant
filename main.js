const { app, BrowserWindow, Menu } = require("electron")
require('electron-reload')(__dirname)

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1020,
        height: 770,
        icon: 'src/public/tempIcon.ico'
    })
    mainWindow.loadFile('src/ui/index.html')
    
    mainWindow.webContents.openDevTools()

    let menu = Menu.buildFromTemplate([
        {
            label:"File",
            submenu:[
                {label:'Get Article'},
                {label:'Exit',
                click() {
                    app.quit()
                }}
            ],
            label:'About'
        }
    ])
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    createWindow()
})

// // Authentication
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// // here we set up authentication with passport
// const passport = require('passport')
// const configPassport = require('./config/passport')
// configPassport(passport)


// var app = express();

// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));



// /*************************************************************************
//      HERE ARE THE AUTHENTICATION ROUTES
// **************************************************************************/

// //app.use(session({ secret: 'zzbbyanana',resave: false,  saveUninitialized: false }));
// app.use(session(
//   {secret: 'zzbbyanana',
//    resave: false,
//    saveUninitialized: false,
//    cookie:{maxAge:24*60*60*1000}, // allow login for one day...
//    store:new MongoStore({mongooseConnection: mongoose.connection})}))
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));




// const approvedLogins = ["tjhickey724@gmail.com","csjbs2018@gmail.com"];

// // here is where we check on their logged in status
// app.use((req,res,next) => {
//   res.locals.title="Peer Review App"
//   res.locals.loggedIn = false
//   if (req.isAuthenticated()){
//       res.locals.user = req.user
//       res.locals.loggedIn = true
//     }
//   else {
//     res.locals.loggedIn = false
//   }
//   next()
// })



// // here are the authentication routes

// app.get('/loginerror', function(req,res){
//   res.render('loginerror',{})
// })

// app.get('/login', function(req,res){
//   res.render('login',{})
// })



// // route for logging out
// app.get('/logout', function(req, res) {
//         req.session.destroy((error)=>{console.log("Error in destroying session: "+error)});
//         req.logout();
//         res.redirect('/');
//     });


// // =====================================
// // GOOGLE ROUTES =======================
// // =====================================
// // send to google to do the authentication
// // profile gets us their basic information including their name
// // email gets their emails
// app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


// app.get('/login/authorized',
//         passport.authenticate('google', {
//                 successRedirect : '/',
//                 failureRedirect : '/loginerror'
//         })
//       );


// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//     res.locals.loggedIn = false
//     if (req.isAuthenticated()){
//       res.locals.loggedIn = true
//       return next();
//     } else {
//       res.redirect('/login');
//     }
// }
