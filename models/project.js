var mongoose=require('mongoose');
var projectSchema = new mongoose.Schema({
	name:{type: String, required: true}
});
mongoose.model('Project', projectSchema);