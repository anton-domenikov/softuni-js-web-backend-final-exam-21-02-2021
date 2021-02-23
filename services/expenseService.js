const User = require('../models/User');
const Expense = require('../models/Expense');

const getAll = async (userId) => {
    let result = await Expense.find({}).lean()

    if (result) {
        result = result.filter(x => x.creator == userId);
    };

    return result;
};

const getUser = (id) => {
    return User.findById(id).populate('expenses');
}

const getOne = (id) => Expense.findById(id);

const create = async (expenseData, userId) => {
    let expense = new Expense({...expenseData, creator: userId});
    console.log(expense);
    let user = await User.findById(userId);
    user.expenses.push(expense);
    user.save();

    return expense.save();
};

const refill = async (amount, userId) => {
    let user = await User.findById(userId);
    console.log(user);
    user.amount += Number(amount);
    console.log(user);

    return user.save();
}


const deleteOne = (expenseId) => {
    return Expense.deleteOne({_id: expenseId});
}


module.exports = {
    getAll,
    getUser,
    getOne,
    create,
    refill,
    deleteOne,
};