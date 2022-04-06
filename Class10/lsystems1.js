// hi there
outlets = 2;

var thestring = '';
var axiom = 'A';
var therules = [];
therules[0] = ['A', 'BA'];
therules[1] = ['B', 'AC'];
therules[2] = ['C', 'DB'];
therules[3] = ['D', 'ABDC'];
var numprods = 15;

init();

function init()
{
	thestring = axiom;
	post(thestring + '\n');
	for(var i = 0;i<numprods;i++)
	{
		doLsystem();
		post(thestring + '\n');
	}
	outlet(1, thestring.length);
}

function doLsystem()
{
	var outstring = '';
	for(var i = 0;i<thestring.length;i++)
	{
		var ismatch = 0;
		for(var j = 0;j<therules.length;j++)
		{
			if(thestring.charAt(i)==therules[j][0])
			{
				outstring+=therules[j][1];
				ismatch = 1;
				break;
			}
		}
		if(ismatch==0) outstring+=thestring.charAt(i);
	}
	thestring = outstring;
}

function query(x)
{
 outlet(0, thestring.charAt(x));
}