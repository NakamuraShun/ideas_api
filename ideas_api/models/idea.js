const mongoose = require("mongoose"),
    Category = require("./category"),
    { Schema } = mongoose,
    ideaSchema = new Schema({
        category_name: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    });

//pre
ideaSchema.pre("save", function (next)
{
    let newidea = this;
    if (newidea.category_id === undefined)
    {
        Category.findOne({ category_name: newidea.category_name })
            .then(category =>
            {
                newidea.category_id = category._id;
                next();
            })
            .catch(error =>
            {
                console.log("一致するカテゴリ名なし");
                next(error);
            });
    } else
    {
        next();
    };
});






//SchemaModelの作成
module.exports = mongoose.model("Idea", ideaSchema);