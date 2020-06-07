const mongoose = require("mongoose"),
    { Schema } = mongoose,
    categorySchema = new Schema({
        category_name: {
            type: String,
            required: true,
            unique: true
        }
    });


//SchemaModelの作成
module.exports = mongoose.model("Category", categorySchema);