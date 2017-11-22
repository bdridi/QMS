'use strict'
module.exports = {
   
  
   desks : [1,2,3,4], 
   lastCalledToken : 0,
   LastGivenToken : 10,
   map : new Map(),
   that : this,
   
   // Call the next token
   next : function(desk){
      
       if( this.lastCalledToken < this.LastGivenToken){
            this.lastCalledToken =  this.getIncremental(this.lastCalledToken);
            this.map.set(desk, this.lastCalledToken);
           
       }          
      
   },
   // Advance the token 
   forward : function(){
           this.LastGivenToken = this.getIncremental(this.LastGivenToken); 
   },
   
   getState : function(){
       // State of the queue
       /*
       @sdesks : availables desks and assigned tokens
       @lastCalled : last called token
       @lastGiven : last given token 
       */
       var state = {
           sdesks : {},
           lastGiven : this.LastGivenToken, 
           lastCalled : this.lastCalledToken 
       };
       
        // convert the map to a javascript object to be manipulated in the frontend
        this.map.forEach((value, key) => {
            state.sdesks[key] = value;
        });
        return (state); 
       
        
    },
    
    /* Initialize the state */
    init : function(){
        this.LastGivenToken = 0;
        this.lastCalledToken = 0;
        var that = this;
        this.desks.forEach(function(el){
            that.map.set(el,0);
        });
        
    },
    
    // increment the token 
    getIncremental : function(token){
        token < 99 ? token++ : token = 1;
        return token;
    }
    
   
 
   
}; 