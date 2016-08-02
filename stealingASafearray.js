function safeArr(){
  var arr = ['here'];
  return {
    get: function(i){
      return arr[i];
    },
    append: function(val){
      arr.push(val); // entry point

      // This arr is exposed here, because it doesn't have a local method called push on it so it goes out to the push prototype (built in method).

    },
    store: function(i, val){
      arr[i] = val;
    }
  };
};

var safety = safeArr()
var stolen;
safety.store("push", function(){
    console.log(this)
    stolen = this;
    delete this.push;
    // this.push(val);
  })
  // This sets a local "push" method. Deletes the push method, and then calls the global prototype push method on the passed value.
safety.append(function(){
  stolen = this;
})
console.log(safety.get(1))
// console.log(safety.get("self"))
console.log(stolen)
