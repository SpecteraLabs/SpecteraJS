const mongoose = require('mongoose');
const mongoPath = "mongodb+srv://Obligator:Ecotis3017@cluster0.oin1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoose;
};