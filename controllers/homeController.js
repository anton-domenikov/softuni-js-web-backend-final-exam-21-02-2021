const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const expenseService = require('../services/expenseService');

router.get('/', (req, res, next) => {
    if (req.user) {
        expenseService.getAll(req.user._id)
            .then(expenses => {
                res.render('home', { expenses });
            })
            .catch(next);
    } else {
        res.render('home');
    }
});

router.get('/profile', isAuth, (req, res, next) => {
    expenseService.getUser(req.user._id)
        .then(user => {

            let amountOfExpenses = 0;
            let totalMerchants = user.expenses.length;
            user.expenses.forEach((expense) => {
                amountOfExpenses += Number(expense.total);
            });

            let amountLeftOfUser = user.amount - amountOfExpenses;

            res.render('profile', {username: user.username, amountOfExpenses, totalMerchants, amountLeftOfUser});
        })
        .catch(next)
});

module.exports = router;