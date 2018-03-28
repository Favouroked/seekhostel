const express = require('express');
const router = express.Router();
const multer = require('multer');
const Hostel = require('../models/hostel');
const User = require('../models/user');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/hostelImages/')
    },
    filename: function (req, file, cb) {
        var file_name = req.user.email + '-' + Date.now() + '.jpg';
        cb(null, file_name);
    }
});

const upload = multer({storage: storage});

Hostel.createMapping(function(err, mapping) {
    if (err) {
        console.log("Error creating mapping");
        console.log(err);
    } else {
        console.log('Mapping created');
        console.log(mapping);
    }
});

var stream = Hostel.synchronize();
var count = 0;

stream.on('data', function(){
    count++;
});

stream.on('close', function() {
    console.log("Indexed " + count + " documents");
});

stream.on('error', function(error) {
    console.log(error);
});

router.post('/hostel/search', function(req, res, next) {
    Hostel.search({
        query_string: { query: req.body.q }
    }, function(err, result) {
        if (err) next(err);
        console.log(result.hits.hits);
        res.render('search_result', { results: result.hits.hits, search_term: req.body.q });
        // res.send(results.hits.hits);
    })
});

router.get('/location/:name', function(req, res, next) {
    Hostel.search({
        query_string: { query: req.params.name }
    }, function(err, result) {
        if (err) next(err);
        console.log(result.hits.hits);
        res.render('search_result', { results: result.hits.hits, search_term: req.params.name });
        // res.send(results.hits.hits);
    })
});

router.get('/', function(req, res, next) {
    Hostel
        .find({})
        .sort({'date': -1})
        .limit(4)
        .exec(function (err, hostels) {
            if (err) throw err;
            res.render('index', { hostels : hostels });
        });
});

router.get('/school-list', (req, res) => {
    res.render('school_list');
});
/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index');
// });

router.get('/agent/home', (req, res) => {
    let agent_id = req.user._id;
    Hostel.find({ agent: agent_id }, function(err, hostels) {
        if (err) throw err;
        let the_count = hostels.length;
        res.render('admin_home', { number: the_count });
    })
});

router.get('/agent/add', (req, res) => {
    res.render('admin_uploading');
});

router.post('/test-upload', upload.array('other', 10), (req, res, next) => {
    console.log(req.files);
    res.send(req.files);
});

router.post('/agent/add', upload.array('other', 10), (req, res, next) => {
    let hostel = new Hostel();
    hostel.agent = req.user._id;
    hostel.hostel_type = req.body.hostel_type;
    hostel.price_range = req.body.price_range;
    hostel.price = req.body.price;
    hostel.date = Date.now();
    hostel.state = req.body.state;
    hostel.location = req.body.location;
    hostel.nearest_school = req.body.nearest_school;
    hostel.description = req.body.description;
    for (var i = 0; i < req.files.length; i++ ) {
        hostel.images.push(req.files[i].filename);
    }
    hostel.save(function(err, hostel) {
        if (err) throw err;
        res.redirect('/');
    })

});

router.get('/agent/uploads', function(req, res) {
    let agent_id = req.user._id;
    Hostel.find({ agent: agent_id }, function(err, hostels) {
        if (err) throw(err);
        res.render('agent_uploads', { hostels: hostels });
    })
});

router.get('/agent/:id', function(req, res) {
    let agent_id = req.params.id;
    Hostel.find({ agent: agent_id }, function(err, hostels) {
        if (err) throw(err);
        res.render('agent_uploads', { hostels: hostels });
    })
});

router.get('/hostel/:id', function(req, res) {
    let hostel_id = req.params.id;
    Hostel.findOne({ _id: hostel_id }, function(err, hostel) {
        if (err) next(err);
        let agent_id = hostel.agent;
        User.findOne({ _id: agent_id }, function(err, agent) {
            if (err) next (err);
            res.render('hostel_description', { hostel: hostel, agent: agent})
        })
    })
});

// router.get('/hostel/:id', function(req, res) {
//     res.render('hostel_description');
// });

// router.get('/agent/uploads', (req, res) => {
//     res.render('agent_uploads');
// });

module.exports = router;
