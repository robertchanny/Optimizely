var bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	express = require('express'),
	app = express();

mongoose.connect("mongodb://127.0.0.1/project_db");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var projectSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: {type: Date, default: Date.now()}
});

var Project = mongoose.model('Project', projectSchema);

//INDEX
app.get('/', function(req,res){
	res.redirect('/projects');
});

app.get('/projects', function(req,res){
	Project.find({}, function(err,showProjects){
		if(err){
			res.redirect('/projects');
		} else {
			res.render('index',{list:showProjects})
		}
	});
});

//NEW
app.get('/projects/new', function(req,res){
	res.render('new');
});

//CREATE
app.post('/projects', function(req,res){
	Project.create(req.body.grab, function(err,grabbed){
		if(err){
			res.redirect('/projects');
		} else {
			res.redirect('/projects');
		}
	});
});

//SHOW
app.get('/projects/:id', function(req,res){
	Project.findByID(req.params.id, function(err,){
		if(err){
			res.redirect('/projects');
		} else {
			res.render('show');
		}
	});
});

app.listen(3000, 'localhost', function(){
	console.log("Server's running");
});