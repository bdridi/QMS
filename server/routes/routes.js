var router = require("express").Router();
var qms = require("../data/data");

router.use(function timeLog(req,res,next){
    console.log("api call ."+Date.now());
    next();
});

// forward the queue = get last called token and increment it 
router.get('/next/:desk_id',function(req,res){
    
    console.log('Desk number : '+req.params.desk_id+' calls for next ');
    console.log(qms.getState());    
    qms.next(req.params.desk_id);
    
    res.json(qms.getState());
       

     
});

// Get a new token 
router.get('/forward',function(req,res){
    
    
    console.log("Token forward api .."+Date.now());
    qms.forward();
    res.json(qms.getState());
    //req.app.io.emit('forward', qms.LastGivenToken); 
    
});


router.get('/init',function(req,res){
    
    qms.init();
});


router.get('/state',function(req,res){
    
    res.json(qms.getState());
   // res.json({succes:true,message:"testo"});    
});

module.exports = router;


