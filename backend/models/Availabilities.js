const mongoose = require("mongoose");
const availabilitySchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    availables: {
        type: Array,
        required: false,
        default:
        {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false,
        }
    },
});
module.exports = mongoose.model("Availabilities", availabilitySchema);