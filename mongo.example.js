const mongoose = require('mongoose');
const mongoPath = "Your Mongo Path Here";

module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoose;
};
