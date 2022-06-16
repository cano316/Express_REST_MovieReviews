const express = require('express')
const app = express();
const path = require('path')
// Method Override
const methodOverride = require('method-override')

//UUID
const { v4: uuid } = require('uuid');

// Serve Stylesheet
app.use(express.static(path.join(__dirname, '/public')))
// Parse incoming post request form data
app.use(express.urlencoded({ extended: true }));
// Use method override
app.use(methodOverride('_method'))
// Views Folder Set Up
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Fake Movie Reviews Database

let reviews = [
    {
        username: 'batmanisreal209',
        movieTitle: 'The Dark Knight',
        year: 2008,
        stars: 5,
        review: 'One of the best movies of 2008!',
        id: uuid()
    },
    {
        username: 'iheartstrangefilms',
        movieTitle: 'A Clockwork Orange',
        year: 1971,
        stars: 4,
        review: 'Trippy dystopian crime film...loved it.',
        id: uuid()
    },
    {
        username: 'dumb_moviesareGREAT',
        movieTitle: 'Leprechaun 5: In The Hood',
        year: 2000,
        stars: 1,
        review: 'Cannot say that ive seen a dumber movie',
        id: uuid()
    }
]




//Routes

// GET Home Page
app.get('/reviews', (req, res) => {
    res.render('reviews/index', { reviews })
})

//Serve the page to allow new review creation
app.get('/reviews/new', (req, res) => {
    res.render('reviews/new')
})

// POST request from the new review form data
app.post('/reviews', (req, res) => {
    const { username, movieTitle, year, stars, review } = req.body;
    reviews.push({ username, movieTitle, year, stars, review, id: uuid() });
    res.redirect('/reviews')
})

//Show, render a page for each specific review using ID
app.get('/reviews/:id', (req, res) => {
    const { id } = req.params;
    const review = reviews.find(review => review.id === id);
    res.render('reviews/show', { review })
})

//Serve Edit Form
app.get('/reviews/:id/edit', (req, res) => {
    const { id } = req.params;
    const review = reviews.find(review => review.id === id);
    res.render('reviews/edit', { review })
})

// PATCH Request to submit edited Review

app.patch('/reviews/:id', (req, res) => {
    const { id } = req.params;
    //Select the text content from the edit text area (new review)
    const newReview = req.body.review;
    const newStars = req.body.stars;
    const foundReview = reviews.find(review => review.id === id);
    foundReview.review = newReview;
    foundReview.stars = newStars;
    res.redirect('/reviews')
});

app.delete('/reviews/:id', (req, res) => {
    const { id } = req.params;
    reviews = reviews.filter(review => review.id !== id);
    res.redirect('/reviews')
})










//Listen Port 3000
app.listen(3000, () => {
    console.log(`LISTENING ON PORT 3000`)
})