const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    desc: { type: String},
    img: { type: String, required: true },
    imgTitle:{type:String},
   trailer:{type:String},
   thumbnail:{type:String},
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genra: { type: String },
   isSeries:{type:Boolean,default:false}
    
}, { timestamps: true });

module.export = mongoose.model("Movie", movieSchema);