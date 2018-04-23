// Creates a 3D Scatterplot from a simple column based dataset.

// x, y, z, color category  
let simpleData = [ 
    { name: "X data", min: 1, max: 10, values: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] },
    { name: "Y data", min: 10, max: 100, values: [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ] },
    { name: "Z data", min: -0.1, max: .7, values: [ -0.1, 0, .1, .3, .2, .4, .6, .5, .8, .7 ] },
    { name: "category", names: [ "category 1", "category 2", "category 3" ], values: [ 0, 0, 0, 0, 1, 1, 1, 2, 2, 2 ] },
];

function generateRandom() {
    let randomData = [ 
        { name: "Random X", min: Infinity, max: -Infinity, values: [] },
        { name: "Random Y", min: Infinity, max: -Infinity, values: [] },
        { name: "Random Z", min: Infinity, max: -Infinity, values: [] },
        { name: "category", names: [], values: [] }
    ];

    let nRows = 1000;
    let nCategories = 12;
    for (let i = 0; i < nCategories; i++ ) {
        randomData[ 3 ].names[ i ] = "Category" + ( i + 1 );
    }
    
    for (let i = 0; i < nRows; i++ ) {
        // X, Y, Z
        for (let j = 0; j < 3; j++ ) {
            value = Math.random();
            randomData[ j ].values[ i ] = value;
            // Update min or max.
            if ( value < randomData[ j ].min ) {
                randomData[ j ].min = value; 
            }
            if ( value > randomData[ j ].max ) {
                randomData[ j ].max = value; 
            } 
        }
        // Category
        randomData[ 3 ].values[ i ] = i % nCategories;
    }

    return randomData;
}

function setIrisColumnValues( irisData ) {
    let nRows = irisCSV.length;
    
    // Create values arrays
    for ( let i = 0; i < irisData.length; i++ ) {
        if ( i < 3 ) {
            irisData[ i ].min =  Infinity;
            irisData[ i ].max = -Infinity; 
        } 
    }

    // Get values for all;  min and max for the first three.
    let lastColumnIndex = irisCSV[ 0 ].length - 1 ;
    for ( let i = 0; i < nRows; i++ ) {
        let row = irisCSV[ i ];
        for ( let j = 0; j < 4; j++ ) {
            let columnIndex = j < 3 ? j : lastColumnIndex;
            let value = row[ columnIndex ]; 
            irisData[ j ].values[ i ] = value;
            // For the first three columns, update min and max. 
            if ( j < 3 ) {
                if ( value < irisData[ j ].min ) {
                    irisData[ j ].min = value; 
                }
                if ( value > irisData[ j ].max ) {
                    irisData[ j ].max = value; 
                }
            }
        }
    }
}

// Convert Raw Iris csv in arrays in csvIris.js to the column format.
function convertIris(){
    let nRows = irisCSV.length;
    let irisData = [];
    // Just add the first 3 columns as x, y and z.
    for (let i=0; i < 3; i++ ) {
        irisData[ i ] = { name: irisColumnNames[ i ], values:[] };
    }
    // Add the last (categorical) column.
    let lastColumnIndex = irisCSV[ 0 ].length - 1 ;
    irisData[ 3 ] = { 
        name: irisColumnNames[ lastColumnIndex ],
        names: irisCategories,
        values: [] 
    };

    setIrisColumnValues( irisData );
    return irisData;
}

let columns = convertIris(); /* simpleData; */
let loadedFont;

// Create text geometry.
function createTextGeometry( text, font ) {
    var textGeom = new THREE.BufferGeometry();
    var shapes = font.generateShapes( text, 70, 2 );
    var geometry = new THREE.ShapeGeometry( shapes );
    geometry.computeBoundingBox();
    var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    geometry.translate( xMid, 0, 0 );
    // make shape ( N.B. edge view not visible )
    textGeom.fromGeometry( geometry );
    return textGeom;
};

function replaceTitles( columns ) {
    let xColumnName = columns[0].name;
    let yColumnName = columns[1].name;
    let zColumnName = columns[2].name;

    // Main title.
    let mainTitle = scene.getObjectByName('mainTitle');
    let title = `${xColumnName} by ${yColumnName} by ${zColumnName}`;
    mainTitle.geometry = createTextGeometry( title, loadedFont );

    // X Axis title.
    let xAxisTitle = scene.getObjectByName('xAxisTitle');
    xAxisTitle.geometry = createTextGeometry( xColumnName, loadedFont );

    // Y Axis title.
    let yAxisTitle = scene.getObjectByName('yAxisTitle');
    yAxisTitle.geometry = createTextGeometry( yColumnName, loadedFont );
    
    // Z Axis title.
    let zAxisTitle = scene.getObjectByName('zAxisTitle');
    zAxisTitle.geometry = createTextGeometry( zColumnName, loadedFont );
}

function changeData() {
    let dataSelector = document.getElementById("select-data");
    if ( dataSelector.selectedIndex === 1 ) {
        columns = generateRandom();
    }  else {
        columns = convertIris(); // TODO: cache once converted?
    }
    let particleSystem = scene.getObjectByName('particleSystem');
    let particleGeo = particleSystem.geometry;
    let vertices = makeVertices( columns );
    let colors = makeColors( columns );
    // Can't just replace vertices and colors. 
    // Need to dispose of the geometry and create a new one.
    particleGeo.dispose();
    particleGeo = new THREE.Geometry();
    particleGeo.vertices = vertices;
    particleGeo.colors = colors;
    scene.remove( particleSystem );
    let particleMat = particleSystem.material;
    particleSystem = new THREE.Points( particleGeo, particleMat );
    scene.add( particleSystem );
    particleSystem.name = 'particleSystem';

    replaceTitles( columns ); 
}

// Calculate Mesh Coordinates and Colors.
// Coordinate space resolution 
const res = 2000;
const pad = 200; // keep away from walls 
// Convert values to coordinate space.
function scaleColumn ( column ) {
    let values = column.values;
    let n = values.length;
    let coords = [];
    let min = column.min;
    let max = column.max;
    let scaleFactor = ( res - 2 * pad ) / ( max - min );
    let offset = pad - res / 2 ;
      
    for ( let i = 0; i < n; i++ ) {
        coords[ i ] = offset + scaleFactor * ( values[ i ] - min ) ; 
    }
    // Add coords to column.
    column.coords = coords;
}

function scaleColumns( columns ) {
    for( let i = 0; i < 3; i++ ) {
        scaleColumn( columns[ i ]);
    }
}

// TODO: Category colors could be stored as hex in category column.  
function calculateColors( n ) {
    let colors = [];
    for( let i = 0; i < n; i++ ) {
        colors[ i ] = new THREE.Color( 0xffffff );
		colors[ i ].setHSL( i / n, 1, 0.5 );
    }
    return colors;
}

function setColors( columns ) {
    let categoryColumn = columns[ 3 ];
    let categoryColors = calculateColors( categoryColumn.names.length );

    // Store them to use in legend.
    categoryColumn.categoryColors = categoryColors;
    let n = categoryColumn.values.length;

    // Calculate row colors.
    let colors = [];
    for ( let i = 0; i < n; i++ ) {
        colors[ i ] = categoryColors[ categoryColumn.values[ i ]];
    }
    categoryColumn.colors = colors;
}

// Gui helpers
function handleColorChange( color1, color2 ) {
	return function ( value ) {
		if ( typeof value === 'string' ) {
			value = value.replace( '#', '0x' );
		}
        color1.setHex( value );
        if ( color2 ) {
            color2.setHex( value ); 
        }
	};
}

function guiScene( gui, scene, renderer, wallMat, particleMat ) {
var sceneFolder = gui.addFolder( 'Scene' );
	var data = {
        background: '#888888',
        //show_walls: wallMat.visible,
        walls: wallMat.color.getHex()
	};
	var color = new THREE.Color();
	var colorConvert = handleColorChange( color );

	sceneFolder.addColor( data, 'background' ).onChange( function ( value ) {
		colorConvert( value );
		renderer.setClearColor( color.getHex() );
    });
    
    sceneFolder.addColor( data, 'walls' ).onChange( handleColorChange( wallMat.color ));
    sceneFolder.add( wallMat, 'visible' );
    sceneFolder.add( particleMat, 'size', 20, 200 );
}

function makeVertices( columns ) {
    let vertices = [];
    scaleColumns( columns );
   
    let particleCount = columns[ 0 ].values.length;
    let xCoords = columns[ 0 ].coords;
    let yCoords = columns[ 1 ].coords;
    let zCoords = columns[ 2 ].coords;

    for ( let i = 0; i < particleCount; i++ ) {
        let particle = new THREE.Vector3( xCoords[ i ], yCoords[ i ], zCoords[ i ]);
        vertices.push( particle );
    }
    return vertices;
}

function makeColors( columns ) {
    setColors( columns );
    return columns[ 3 ].colors;
} 

function makeParticleGeo( columns ) {
    let particleGeo = new THREE.Geometry();
     
    particleGeo.vertices = makeVertices( columns );
    particleGeo.colors = makeColors( columns );

    return particleGeo;
}

function makeParticleMaterial( columns ) {
    let ball = new THREE.TextureLoader().load('./img/ball.png');
    let particleMat = new THREE.PointsMaterial({
        //color: 'rgb(5, 5, 200)',
        vertexColors: THREE.VertexColors,
        size: 100,
        //particle texture...
        map: ball,
        alphaTest: 0.7,
        transparent: true,
        depthWrite: true
    });
    return particleMat;
}

// scene
var scene = new THREE.Scene();

function init() {
     var stats = new Stats();
    // render performance stats using github.com/mrdoob/stats.js
    /* document.body.appendChild( stats.dom ); */
    var gui = new dat.GUI(); // UI controls

	// camera
	var camera = new THREE.PerspectiveCamera(
		50, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		10000 // far clipping plane
	);
    camera.position.z = 3500;
    camera.position.y = 1500;
    
    let particleGeo = makeParticleGeo( columns );
    let particleMat =  makeParticleMaterial();
    let particleSystem = new THREE.Points( particleGeo, particleMat );
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
        color:  0xeeeeee,
        transparent: false,
        side: THREE.FrontSide
    });
    
    var wallXY = new THREE.Mesh( new THREE.PlaneGeometry( size, size, 2, 2 ), wallMat );
    var wallYZ = new THREE.Mesh( new THREE.PlaneGeometry( size, size, 2, 2 ), wallMat );
    var floorXZ = new THREE.Mesh( new THREE.PlaneGeometry( size, size, 2, 2 ), wallMat );
    wallXY.position.z = -1005;
    wallYZ.rotation.y = Math.PI / 2;
    wallYZ.position.x = -1005;
    floorXZ.rotation.x = -Math.PI / 2;
    floorXZ.position.y = -1005;

    scene.add( wallXY );
    scene.add( wallYZ );
    scene.add( floorXZ );

    // Create and add titles
    var loader = new THREE.FontLoader();
    loader.load( 'font/helvetiker_regular.typeface.json', function ( font ) {

        loadedFont = font;

        // Main title.
        let mainTitleMat = new THREE.MeshBasicMaterial({
            color: 0x111144,
            transparent: false,
           // opacity: 0.8,
            side: THREE.DoubleSide
        });

        let xColumnName = columns[0].name;
        let yColumnName = columns[1].name;
        let zColumnName = columns[2].name;
        let title = `${xColumnName} by ${yColumnName} by ${zColumnName}`;
        let mainTitle = new THREE.Mesh(createTextGeometry( title, font ), mainTitleMat);
        mainTitle.name = 'mainTitle';
        // X Axis title.
        let axisTitleMat = new THREE.MeshBasicMaterial({
            color: 0x222288,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        let xAxisTitle = new THREE.Mesh(createTextGeometry( xColumnName, font ), axisTitleMat );
        xAxisTitle.name = 'xAxisTitle';

        // Y Axis title.
        let yAxisTitle = new THREE.Mesh(createTextGeometry( yColumnName, font ), axisTitleMat );
        yAxisTitle.name = 'yAxisTitle';

        // Y Axis title.
        let zAxisTitle = new THREE.Mesh(createTextGeometry( yColumnName, font ), axisTitleMat );
        zAxisTitle.name = 'zAxisTitle';

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
	renderer.setSize(window.innerWidth, window.innerHeight - 50);

	renderer.setClearColor('rgb(200, 200, 200)');
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    guiScene( gui, scene, renderer, wallMat, particleMat );

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

if (Detector.webgl) {
    var scene = init();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

