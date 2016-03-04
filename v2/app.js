var bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	express = require('express'),
	app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

mongoose.connect('mongodb://127.0.0.1/project_data');

var experimentSchema = new mongoose.Schema({
	title: String,
	date: {type: Date, default: Date.now()},
	description: String
});

var Experiment = mongoose.model('Experiment', experimentSchema);

//INDEX
app.get('/', function(req,res){
	res.redirect('/experiments');
});

app.get('/experiments', function(req,res){
	Experiment.find({},function(err,holder){
		if(err){
			res.redirect('/experiments');
		} else {
			res.render('index',{experimentList:holder});
		}
	});
});

//NEW
app.get('/experiments/new', function(req,res){
	res.render('new');
});

//CREATE
app.post('/experiments', function(req,res){
	Experiment.create(req.body.grab, function(err,holder){
		if(err){
			res.redirect('/experiments');
		} else {
			res.redirect('/experiments');
		}
	});
});

//SHOW
app.get('/experiments/:id', function(req,res){
	Experiment.findById(req.params.id, function(err,holder){
		if(err){
			res.redirect('/experiments');
		} else {
			res.render('show', {entry:holder});
		}
	});
});

app.listen(3000,'localhost',function(){
	console.log("Server's running");
});