const router = require('express').Router();
const expenseService = require('../services/expenseService');
const { body, validationResult } = require('express-validator');

const allowedCategories = [
    'Advertising',
    'Benefits',
    'Car',
    'Equipment',
    'Fees',
    'Home Office',
    'Insurance',
    'Interest',
    'Labor',
    'Maintenance',
    'Materials',
    'Meals and Entertainment',
    'Office Supplies',
    'Other',
    'Professional Services',
    'Rent',
    'Taxes',
    'Travel',
    'Utilities'
];

const allowedCategoriesTwo = [
    'advertising',
    'benefits',
    'car',
    'equipment',
    'fees',
    'home-office',
    'insurance',
    'interest',
    'labor',
    'maintenance',
    'materials',
    'meals-and-entertainment',
    'office-supplies',
    'other',
    'professional-services',
    'rent',
    'taxes',
    'travel',
    'utilities'
];

router.get('/create', (req, res) => {
    res.render('createExpense');
});

router.post('/create', (req, res, next) => {
    let expenseData = extractExpenseData(req);

    // validation start
    if (expenseData.merchant.length < 4) {
        res.render('createExpense', { error: { message: 'Merchant should be at least 4 characters long!' }});
        return;
    }

    if (Number(expenseData.total) < 0) {
        res.render('createExpense', { error: { message: 'Total should be a positive number!' }});
        return;
    }

    if (expenseData.description.length < 3 || 30 < expenseData.description.length) {
        res.render('createExpense', { error: { message: 'Descriptions should be between 3 and 30 characters long!' }});
        return;
    }

    if (expenseData.category == undefined) {
        res.render('createExpense', { error: { message: 'You have to select a category!' }});
        return;
    }

    if (!allowedCategories.includes(expenseData.category)) {
        res.render('createExpense', { error: { message: 'You have to select a category from the allowed ones!' }});
        return;
    }
    // validation end

    expenseService.create(expenseData, req.user._id)
        .then(createdExpense => {
            res.redirect('/');
        })
        .catch(next)

});

router.post('/refill', (req, res, next) => {
    let { refillAmount } = req.body;
    expenseService.refill(refillAmount, req.user._id)
        .then(() => res.redirect('/'))
        .catch(next);
});

router.get('/report/:expenseId', (req, res, next) => {
    expenseService.getOne(req.params.expenseId)
    .then(expense => {
        res.render('report', expense);
    })
    .catch(next);
});

router.get('/delete/:expenseId', (req, res, next) => {
    expenseService.deleteOne(req.params.expenseId)
        .then(() => res.redirect('/'))
        .catch(next);
});

function extractExpenseData(req) {
    let {merchant, total, category, description, report} = req.body;

    let expenseData = {
        merchant,
        total,
        category,
        description,
        report: Boolean(report),
    };

    return expenseData;
}

module.exports = router;