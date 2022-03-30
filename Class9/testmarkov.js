// hi there
var thechain = [];
var curnote = 60;
var prev = -1;

function add(v)
{
	if(prev!=-1) {
		if(!thechain[prev]) // add
		{
			thechain[prev] = [];
		}
		thechain[prev].push(v)
	}
	post(prev + ": " + thechain[prev] + '\n');
	prev = v;
}

function reset()
{
	curnote = prev;
}

function clear()
{
	thechain = []; // kaboom
	prev = -1;
}

function bang()
{
	post(curnote + "\n");
	if(thechain.length>0)
	{
		if(thechain[curnote])
		{
			var p = Math.floor(Math.random()*thechain[curnote].length);
			outlet(0, thechain[curnote][p]);
			curnote = thechain[curnote][p];
		}
		else {
			outlet(0, curnote);	
		}
	}
}