const
    mongoose = require("mongoose"),
    Category = require("../models/category"),
    Idea = require("../models/idea");


module.exports = {
    getCatedories: (req, res, next) =>
    {
        Category.find({})
            .then(categories =>
            {
                res.render("lists", { "categories": categories });
            })
            .catch(error =>
            {
                console.log("error.message");
                return [];
            })
    },

    getIdeas: (req, res, next) =>
    {
        let categoryName = req.params.category_name;
        if (categoryName === "全件")
        {
            Idea.find({})
                .then(ideas =>
                {
                    res.json(ideas);
                })
                .catch(error =>
                {
                    console.log("error.message");
                    return [];
                })
        } else
        {
            Idea.find({ category_name: categoryName })
                .then(ideas =>
                {
                    if (ideas.length <= 0)
                    {
                        res.status(404);
                        res.send("<h2>404エラー：該当のカテゴリは存在しません。</h2>");
                    } else
                    {
                        res.json(ideas);
                    };
                })
                .catch(error =>
                {
                    console.log("error.message");
                    return [];
                })
        }
    },


    createIdea: (req, res, next) =>
    {
        let newideaData = {
            category_name: req.body.category_name,
            body: req.body.body
        };

        Idea.create(newideaData)
            .then(idea =>
            {
                req.flash("success", "アイディアの登録が完了しました。");
                res.status(201);
                res.locals.redirect = "/";
                console.log(idea);
                next();
            })
            .catch(error =>
            {
                req.flash("error", "アイディアを作成できませんでした。お手数おかけしますが再度お試しください。");
                res.status(422);
                res.locals.redirect = "/";
                next();
            })
    },



    delete: (req, res, next) =>
    {
        let ideaId = req.params.id;
        Idea.findByIdAndRemove(ideaId)
            .then(idea =>
            {
                req.flash("success", `${idea._id} のアイディアを削除しました。`);
                res.locals.redirect = "/lists";
                next();
            })
            .catch(error =>
            {
                req.flash("error", "アイディアを削除できませんでした。お手数おかけしますが再度お試しください。");
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