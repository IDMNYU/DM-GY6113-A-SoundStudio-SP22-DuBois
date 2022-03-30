// strange.js
//
// generate strange attractors according to random/evolved coefficients
//
// attractor is generated via:
//
//	X = sin(A*y)-z*cos(B*x)
//	Y = z*sin(C*x)-cos(D*y)
//	Z = E*sin(x)
//

var x, y, z;
var newx, newy, newz;
var A, B, C, D, E;

init();

function init()
{
	x = 0.;
	y = 0.;
	z = 0.;
	A = Math.random()*4.-2.;
	B = Math.random()*4.-2.;
	C = Math.random()*4.-2.;
	D = Math.random()*4.-2.;
	E = Math.random()*4.-2.;

}

function bang()
{
	newx = Math.sin(A*y)-z*Math.cos(B*x);
	newy = z*Math.sin(C*x)-Math.cos(D*y);
	newz = E*Math.sin(x);
	outlet(0, [newx, newy, newz]);
	x = newx;
	y = newy;
	z = newz;
}