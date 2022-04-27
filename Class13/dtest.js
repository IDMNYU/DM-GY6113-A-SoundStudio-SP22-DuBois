
var d = new Dict("foo");
var j = JSON.parse(d.stringify());

post(j.apples + "\n");