const mongoose = require('mongoose');
const mongoPath = ""

module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoose;
};
