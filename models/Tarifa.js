
// {"_id":{"$oid":"6148ee63ce5b82d2d83f8c15"},
//"material":"31344443",
//"description":"Test1",
//"prize":{"$numberDouble":"150.2"}}


import mongoose from 'mongoose'

const TarifaSchema = new mongoose.Schema({
    material: {
        type: String,
        required: [true, "material required"]
    },
    description: {
        type: String,
        required: [ true, "description required"]
    },
    prize:{
        type: Number,
        required: false,
        default: 0
    }
})

export default mongoose.models.Tarifa || mongoose.model('Tarifa', TarifaSchema)