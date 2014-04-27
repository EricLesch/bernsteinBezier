var factorialTable = [];
factorialTable[0] = 1.0;
factorialTable[1] = 1.0;
factorialTable[2] = 2.0;
factorialTable[3] = 6.0;
factorialTable[4] = 24.0;
factorialTable[5] = 120.0;
factorialTable[6] = 720.0;
factorialTable[7] = 5040.0;
factorialTable[8] = 40320.0;
factorialTable[9] = 362880.0;
factorialTable[10] = 3628800.0;
factorialTable[11] = 39916800.0;
factorialTable[12] = 479001600.0;
factorialTable[13] = 6227020800.0;
factorialTable[14] = 87178291200.0;
factorialTable[15] = 1307674368000.0;
factorialTable[16] = 20922789888000.0;
factorialTable[17] = 355687428096000.0;
factorialTable[18] = 6402373705728000.0;
factorialTable[19] = 121645100408832000.0;
factorialTable[20] = 2432902008176640000.0;
factorialTable[21] = 51090942171709440000.0;
factorialTable[22] = 1124000727777607680000.0;
factorialTable[23] = 25852016738884976640000.0;
factorialTable[24] = 620448401733239439360000.0;
factorialTable[25] = 15511210043330985984000000.0;
factorialTable[26] = 403291461126605635584000000.0;
factorialTable[27] = 10888869450418352160768000000.0;
factorialTable[28] = 304888344611713860501504000000.0;
factorialTable[29] = 8841761993739701954543616000000.0;
factorialTable[30] = 265252859812191058636308480000000.0;
factorialTable[31] = 8222838654177922817725562880000000.0;
factorialTable[32] = 263130836933693530167218012160000000.0;

/**
 * @return {number}
 */
function Ni(n, i)
{
	var ni;
	var a1 = factorialTable[n];
	var a2 = factorialTable[i];
	var a3 = factorialTable[n - i];
	ni =  a1/ (a2 * a3);
	return ni;
}

/**
 * @return {number}
 */
function Bernstein(n, i, t)
{
	var basis;
	var ti; /* t^i */
	var tni; /* (1 - t)^i */

	/* Prevent problems with pow */

	if (t == 0.0 && i == 0)
		ti = 1.0;
	else
		ti = Math.pow(t, i);

	if (n == i && t == 1.0)
		tni = 1.0;
	else
		tni = Math.pow((1 - t), (n - i));

	//Bernstein basis
	basis = Ni(n, i) * ti * tni;
	return basis;
}

/**
 *
 * @param numberOfPointsToCalculate
 * @param startPoint
 * @param endPoint
 * @param arrayOfControlPoints
 */
function bezier2D(startPoint, endPoint, arrayOfControlPoints, numberOfPointsToCalculate)
{
	var outputPoints = [];
	var points = createArrayOfPoints(startPoint, endPoint, arrayOfControlPoints);
	var numberOfPts = points.length / 2;
	var icount, jcount;
	var step, time;

	icount = 0;
	time = 0;
	step = 1 / (numberOfPointsToCalculate - 1);

	for (var i1 = 0; i1 != numberOfPointsToCalculate; i1++)
	{
		if ((1 - time) < 5e-6)
		{
			time = 1;
		}

		jcount = 0;
		outputPoints[icount] = 0;
		outputPoints[icount + 1] = 0;
		for (var i = 0; i != numberOfPts; i++)
		{
			var basis = Bernstein(numberOfPts - 1, i, time);
			outputPoints[icount] = outputPoints[icount] + (basis * points[jcount]);
			outputPoints[icount + 1] = outputPoints[icount + 1] + (basis * points[jcount + 1]);
			jcount = jcount + 2;
		}

		icount += 2;
		time += step;
	}

	return createOutputPointsFromArray(outputPoints);
}

function createArrayOfPoints(startPoint, endPoint, arrayOfControlPoints)
{
	var points = [];
	points.push(startPoint.x);
	points.push(startPoint.y);
	if (arrayOfControlPoints)
	{
		for (var i = 0, len = arrayOfControlPoints.length; i < len; i++)
		{
			var currentPoint = arrayOfControlPoints[i];
			points.push(currentPoint.x);
			points.push(currentPoint.y);
		}
	}
	points.push(endPoint.x);
	points.push(endPoint.y);
	return points;
}

function createOutputPointsFromArray(pointsArray)
{
	var outputPointsArray = [];
	for(var i = 0, len = (pointsArray.length / 2); i < len; i++)
	{
		var outputPoint = {
			x: pointsArray[i * 2],
			y: pointsArray[(i * 2) + 1]

		};
		outputPointsArray.push(outputPoint);
	}
	return outputPointsArray;
}
