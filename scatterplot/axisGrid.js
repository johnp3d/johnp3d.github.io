// The Axis grid draws major and minor grid lines from two different axes settings.
// Inspired by THREE.GridHelper.
function AxisGrid( axes, size ) {

	majorColor = new THREE.Color( 0x444444 );
	minorColor = new THREE.Color( 0x888888 );

	var halfSize = size / 2;

	var vertices = [], colors = [];

	// Lines for each axis.
	var k = 0; // index into color array.
	for ( var i = 0; i < 2; i++ ) {
		var nMajor = axes[ i ].nMajor;
		var majorStart = axes[ i ].majorStart; // don't assume it starts at -halfSize
		var majorStep = axes[ i ].majorStep;
		color = majorColor;
		for ( var j = 0; j < nMajor; j++ ) {
			var pos = majorStart + j * majorStep;
			if ( i === 0 ) {
				vertices.push( -halfSize, 0, pos, halfSize, 0, pos );
			} else {
				vertices.push( pos, 0, -halfSize, pos, 0, halfSize );
			}
			color.toArray( colors, k ); k += 3;
			color.toArray( colors, k ); k += 3;
		}
	}

	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	THREE.LineSegments.call( this, geometry, material );
}
AxisGrid.prototype = Object.create( THREE.LineSegments.prototype );
AxisGrid.prototype.constructor = AxisGrid;