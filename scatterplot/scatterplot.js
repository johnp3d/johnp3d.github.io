function init() {
     var stats = new Stats();
    // render performance stats using github.com/mrdoob/stats.js
    /* document.body.appendChild( stats.dom ); */

	// camera
	var camera = new THREE.PerspectiveCamera(
		50, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		10000 // far clipping plane
	);
    camera.position.z = 3500;
    camera.position.y = 1500;
    
    // scene
    var scene = new THREE.Scene();
    var particleGeo = new THREE.Geometry();
    var ball = new THREE.TextureLoader().load('./img/ball.png');
    var particleCount = 1000;

    var colorChoices = [], colors = [];
    for ( var i = 0; i < 12; i++ ) {
        colorChoices[ i ] = new THREE.Color( 0xffffff );
		colorChoices[ i ].setHSL( i / 12, 1, 0.5 );
    }

    for ( var i = 0; i < particleCount; i++ ) {
        var particle = new THREE.Vector3();
        
        particle.x = 1900 * Math.random() - 1000;
        particle.y = 1900 * Math.random() - 1000
        particle.z = 1900 * Math.random() - 1000;

        colors[ i ] = colorChoices[ i % 12 ];
    
        particleGeo.vertices.push( particle );
    }
    particleGeo.colors = colors;

    var particleMat = new THREE.PointsMaterial({
        //color: 'rgb(5, 5, 200)',
        vertexColors: THREE.VertexColors,
        size: 100,
        //particle texture...
        map: ball,
        alphaTest: 0.7,
        transparent: true,
        depthWrite: true
    });
    var particleSystem = new THREE.Points( particleGeo, particleMat );
    particleSystem.name = 'particleSystem';
    scene.add( particleSystem );

    // Grids
    var size = 2000;
    var step = 10;
    var gridXZ = new THREE.GridHelper( size, step );
    var gridXY = new THREE.GridHelper( size, step );
    var gridYZ = new THREE.GridHelper( size, step );
    gridXZ.position.y = -1000;
    gridXY.rotation.x = Math.PI / 2;
    gridXY.position.z = -1000;
    gridYZ.rotation.z = Math.PI / 2;
    gridYZ.position.x = -1000;

    scene.add( gridXZ );
    scene.add( gridXY );
    scene.add( gridYZ );

    // Walls & Floor
    var wallMat = new THREE.MeshBasicMaterial({
        color: 0xeeeeee,
        transparent: false,
        side: THREE.FrontSide
    });
    var floorMat = new THREE.MeshBasicMaterial({
        color: 0xeeeeee,
        transparent: false,
        side: THREE.BackSide
    });
    
    var wallXY = new THREE.Mesh( new THREE.PlaneGeometry( size, size, 2, 2 ), wallMat );
    var wallYZ = new THREE.Mesh( new THREE.PlaneGeometry( size, size, 2, 2 ), wallMat );
    var floorXZ = new THREE.Mesh( new THREE.PlaneGeometry( size, size, 2, 2 ), floorMat );
    wallXY.position.z = -1005;
    wallYZ.rotation.y = Math.PI / 2;
    wallYZ.position.x = -1005;
    floorXZ.rotation.x = Math.PI / 2;
    floorXZ.position.y = -1005;

    scene.add( wallXY );
    scene.add( wallYZ );
    scene.add( floorXZ );

    // Create text geometry.
    var createTextGeometry = function( text, font ) {
        var textGeom = new THREE.BufferGeometry();
        var shapes = font.generateShapes( text, 100, 2 );
        var geometry = new THREE.ShapeGeometry( shapes );
        geometry.computeBoundingBox();
        var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( xMid, 0, 0 );
        // make shape ( N.B. edge view not visible )
        textGeom.fromGeometry( geometry );
        return textGeom;
    };

    // Create and add titles
    var loader = new THREE.FontLoader();
    loader.load( 'font/helvetiker_regular.typeface.json', function ( font ) {

        // Main title.
        var mainTitleMat = new THREE.MeshBasicMaterial({
            color: 0x111144,
            transparent: false,
           // opacity: 0.8,
            side: THREE.DoubleSide
        });
        var mainTitle = new THREE.Mesh(createTextGeometry("<X var> by <Y var> by <Z var>", font ), mainTitleMat);

        // X Axis title.
        var axisTitleMat = new THREE.MeshBasicMaterial({
            color: 0x222288,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        var xAxisTitle = new THREE.Mesh(createTextGeometry("<X Title>", font ), axisTitleMat);

        // Y Axis title.
        var yAxisTitle = new THREE.Mesh(createTextGeometry("<Y Title>", font ), axisTitleMat);

        // Y Axis title.
        var zAxisTitle = new THREE.Mesh(createTextGeometry("<Z Title>", font ), axisTitleMat);

        // Place titles.
        mainTitle.position.z = -1000;
        mainTitle.position.y = 1100;
        
        xAxisTitle.position.z = 1000;
        xAxisTitle.position.y = -1150;
       
        yAxisTitle.position.z = 1000;
        yAxisTitle.position.x = -1100;
        yAxisTitle.rotation.z = Math.PI / 2;
        
        zAxisTitle.position.x = -1000;
        zAxisTitle.position.y = 1050;
        zAxisTitle.rotation.y = Math.PI / 2;

        // Add titles.
        scene.add( mainTitle );
        scene.add( xAxisTitle );
        scene.add( yAxisTitle );
        scene.add( zAxisTitle );

    }); //end load function


	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.setClearColor('rgb(200, 200, 200)');

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	document.getElementById('webgl').appendChild(renderer.domElement);

	update(renderer, scene, camera, controls, stats);

	return scene;
}


function update(renderer, scene, camera, controls, stats) {
    controls.update();
    /* stats.update(); */

    renderer.render(scene, camera);
	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls, stats);
	});
}

var scene = init();
