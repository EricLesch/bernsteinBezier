var expect = chai.expect;

describe("bezier2d()",
	function()
	{
		it('should return the correct values when fed 2 points and no control points',
			function()
			{
				var outputPoints = bezier2D( { x: 1, y: 1 }, { x: 2, y: 2 }, null, 5);

				expect(outputPoints[0].x).to.be.equal(1);
				expect(outputPoints[0].y).to.be.equal(1);
				expect(outputPoints[1].x).to.be.equal(1.25);
				expect(outputPoints[1].y).to.be.equal(1.25);
				expect(outputPoints[2].x).to.be.equal(1.5);
				expect(outputPoints[2].y).to.be.equal(1.5);
				expect(outputPoints[3].x).to.be.equal(1.75);
				expect(outputPoints[3].y).to.be.equal(1.75);
				expect(outputPoints[4].x).to.be.equal(2);
				expect(outputPoints[4].y).to.be.equal(2);
			}
		);

		it('should return the correct values when fed 2 points and 1 control point',
			function()
			{
				var outputPoints = bezier2D({ x: 1, y: 1}, {x: 3, y: 1}, [{x: 2, y: 2}], 5);

				console.log(outputPoints);
				expect(outputPoints[0].x).to.be.equal(1);
				expect(outputPoints[0].y).to.be.equal(1);
				expect(outputPoints[1].x).to.be.equal(1.5);
				expect(outputPoints[1].y).to.be.equal(1.375);
				expect(outputPoints[2].x).to.be.equal(2);
				expect(outputPoints[2].y).to.be.equal(1.5);
				expect(outputPoints[3].x).to.be.equal(2.5);
				expect(outputPoints[3].y).to.be.equal(1.375);
				expect(outputPoints[4].x).to.be.equal(3);
				expect(outputPoints[4].y).to.be.equal(1);
			}
		);
	}
);


