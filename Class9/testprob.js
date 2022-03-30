// hi there

var thestuff = [];

function add(v)
{
	thestuff.push(v)
	post(thestuff + "\n");
}

function clear()
{
	thestuff = []; // kablooie
}

function bang()
{
	if(thestuff.length>0) {
		var p = Math.floor(Math.random()*thestuff.length);
		outlet(0, thestuff[p]);
	}
}