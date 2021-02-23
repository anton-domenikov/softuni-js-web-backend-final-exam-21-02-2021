const errorHandler = (err, req, res, next) => {
    err.message = err.message || 'something went wrong';
    err.status = err.status || 500;

    console.log(err);

    // TODO add page to renderrrr

    res.status(err.status).render('home', { error: err });
}

module.exports = errorHandler;