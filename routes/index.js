var express = require('express');
var router = express.Router();
const upload = require("./multer");
const userModle = require('./users');
const postModle = require('./post');
const passport = require('passport');
const LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(userModle.authenticate()));
const flash = require("flash")

/* GET home page. */
router.get('/', function (req, res, next) {
  const error = req.flash('error');
  console.log(error);
  res.render('index', { error: error, nav: false });
});

router.get('/register', (req, res) => {
  const error = req.flash('error');
  console.log(error);
  res.render('register', { error: error, nav: false })
})


router.post('/fileupload', isLoggedIn, upload.single('image'), async (req, res) => {

  const user = await userModle.findOne({ username: req.session.passport.user })
  user.profileImage = req.file.filename
  await user.save()
  res.redirect('/profile');
})

router.get('/show/:id', async (req, res) => {
  try {
    // Retrieve post data based on the id parameter
    const postId = req.params.id;
    const postData = await postModle.findOne({ _id: postId }).populate('user'); // Populate the user field

    if (!postData) {
      // Handle case where post data with the given id is not found
      return res.status(404).send('Post not found');
    }
    // Render the 'show' template with the retrieved post data
    res.render('show', { postdata: postData , nav:true});
  } catch (error) {
    // Handle any errors that occur during the database query or rendering
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/createpost', isLoggedIn, upload.single('postimage'), async (req, res) => {
  try {
    const user = await userModle.findOne({ username: req.session.passport.user });
    if (!user) {
      throw new Error('User not found');
    }

    let imageFileName;
    if (req.file) {
      imageFileName = req.file.filename;
    } else {
      throw new Error('No file uploaded');
    }

    const post = await postModle.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      id:  Date.now() + '-' +Math.random()*.5,
      image: imageFileName // Use the filename only if it exists
    });

    user.posts.push(post._id);
    await user.save();

    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});


router.get('/profile', isLoggedIn, async (req, res) => {
  const user = await userModle.findOne({ username: req.session.passport.user })
  .populate('posts')
  res.render("profile", { user, nav: true });
})

router.get('/feed', isLoggedIn, async (req, res) => {
  try {
    // Fetch the current user
    const user = await userModle.findOne({ username: req.session.passport.user });
    
    // Fetch all posts and populate the 'user' field
    const pp = await postModle.find().populate('user');

    // Shuffle the 'pp' array containing all posts
    shuffleArray(pp);

    // Render the "feed" page with the shuffled posts and user data
    res.render("feed", { user, pp, nav: true });
  } catch (err) {
    // Handle errors
    console.error("Error fetching user or posts:", err);
    res.status(621).send("Internal Server Error");
  }
});

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


router.get('/add', isLoggedIn, async (req, res) => {
  const user = await userModle.findOne({ username: req.session.passport.user })
  res.render("add", { user, nav: true });
})

router.post('/login', passport.authenticate("local", {
  failureRedirect: '/',
  successRedirect: '/feed',
  failureFlash: true,

}), function (req, res, next) {
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});





router.get('/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    // Delete the post document based on the provided postId
    await postModle.findByIdAndDelete(postId);
    res.redirect('/profile');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('An error occurred while deleting the post.');
  }
});

router.post('/register', (req, res) => {
  const data = new userModle({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
  })

  userModle.register(data, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/profile')
      })

    })
    .catch((err) => {
      req.flash('error', err.message); // Flash the error message
      res.redirect('/register');
    })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

router.get('/profile2/:userId', async (req, res) => {
  try {
    // Extract userId from request parameters
    const userId = req.params.userId;

    // Find the user by userId
    const user = await userModle.findById(userId).populate('posts');

    if (!user) {
      // If user not found, return 404 Not Found
      return res.status(404).send('User not found');
    }

    // Render the user profile page with user data
    res.render('profile2', { user ,nav:true});
  } catch (error) {
    // Handle errors
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;

