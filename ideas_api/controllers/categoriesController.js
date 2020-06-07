const
    mongoose = require("mongoose"),
    Category = require("../models/category")
    ;


module.exports = {

    createCategory: (req, res, next) =>
    {
        Category.findOne({ category_name: req.body.category_name }, function (err, result)
        {
            if (result)
            {
                next();
            } else
            {
                Category.create({ category_name: req.body.category_name });
                next();
            }
        })
    },

    delete: (req, res, next) =>
    {
        let categoryId = req.params.id;
        Category.findByIdAndRemove(categoryId)
            .then(category =>
            {
                req.flash("success", `${category.category_name} カテゴリを削除しました。`);
                res.locals.redirect = "/lists";
                next();
            })
            .catch(error =>
            {
                req.flash("error", "カテゴリを削除できませんでした。お手数おかけしますが再度お試しください。");
                res.locals.redirect = "/lists";
                next();
            })
    },



    redirectView: (req, res, next) =>
    {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    }

};