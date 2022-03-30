// these are comments
outlets = 4;

function go(r)
{
	// outlet commands are outlet # followed by data
	outlet(3, Math.random()*r);
	outlet(2, Math.random()*r);
	outlet(1, Math.random()*r);
	outlet(0, Math.random()*r);
}