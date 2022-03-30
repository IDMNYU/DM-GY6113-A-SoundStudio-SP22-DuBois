var probability = 0.5;
var thestuff = new Array(16);
for(var i = 0;i<16;i++)
{
		thestuff[i] = new Array(4);
}
generate();
output();

function prob(v)
{
	probability = v;
}

function bang()
{
	generate();
	output();
}

function generate()
{
	// step
	for(var i = 0;i<16;i++)
	{
		// drum
		for(var j = 0;j<4;j++)
		{
			var pick = Math.random()<probability;
			thestuff[i][j] = pick;
		}
	}
		
}

function evolve()
{
	// step
	for(var i = 0;i<16;i++)
	{
		// drum
		for(var j = 0;j<4;j++)
		{
			var pick = Math.random()<probability;
			if(pick) thestuff[i][j] = 1-thestuff[i][j];
		}
	}
	output();	
}

function reverse()
{
	var temp = new Array(16);
	for(var i = 0;i<16;i++)
	{
		temp[i] = [0,0,0,0];
	}
	
	// copy
	for(var i = 0;i<16;i++)
	{
		for(var j = 0;j<4;j++)
		{
			temp[i][j] = thestuff[i][j];
		}
	}
	// reverse
	for(var i = 0;i<16;i++)
	{
		for(var j = 0;j<4;j++)
		{
			thestuff[i][j] = temp[15-i][j];
		}
	}
	output();		
	
	
}

function output()
{
	// step
	for(var i = 0;i<16;i++)
	{
		// drum
		for(var j = 0;j<4;j++)
		{
			outlet(0, [i+1, j+1, thestuff[i][j]]);
		}
	}
	
}