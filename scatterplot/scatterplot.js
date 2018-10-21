// Creates a 3D Scatterplot from a simple column based dataset.

// x, y, z, color category  
let simpleData = [ 
    { name: "X data", min: 1, max: 10, values: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] },
    { name: "Y data", min: 10, max: 100, values: [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ] },
    { name: "Z data", min: -0.1, max: .7, values: [ -0.1, 0, .1, .3, .2, .4, .6, .5, .8, .7 ] },
    { name: "category", names: [ "category 1", "category 2", "category 3" ], values: [ 0, 0, 0, 0, 1, 1, 1, 2, 2, 2 ] },
];

let carsData = [
    { name : "Weight", min: 1695, max: 4285, values: [2700, 3265, 2935, 2670, 2790, 2895, 3640, 2880, 3350, 3325, 3465, 2640, 4285, 3545, 3480, 4025, 2655, 3110, 3320, 3855, 2485, 3280, 3195, 3630, 3570, 2975, 3065, 3450, 3385, 2270, 2885, 2935, 3080, 3735, 2300, 2670, 3145, 2560, 2780, 3665, 2345, 1845, 3850, 2850, 3310, 2695, 2870, 3015, 3190, 2750, 3610, 1695, 2255, 2455, 2920, 2260, 2170, 2710, 2345, 2885, 4000, 3930, 3695, 3780, 4040, 2780, 3480, 3735, 2210, 2690, 2440, 3020, 3315, 2285, 2745, 2185, 3110, 3415, 2775, 3350, 3185, 3200, 2390, 2275, 2920, 3690, 3220, 2645, 2765, 2575, 3000, 2840, 2350, 2900, 2775, 2995, 3065, 3295, 1900, 2935, 2295, 2485, 2920, 2885, 2390, 3480, 3470, 2075, 2680, 2190, 2215, 2270, 2330, 3460, 2985, 3140] },
    { name : "Turning Circle", min: 32, max: 47, values: [37, 42, 39, 35, 35, 35, 39, 41, 43, 42, 41, 39, 44, 43, 42, 42, 38, 41, 41, 42, 38, 42, 42, 42, 43, 39, 41, 42, 42, 32, 38, 38, 42, 47, 40, 38, 39, 36, 39, 42, 37, 33, 45, 40, 44, 38, 38, 42, 41, 39, 38, 34, 35, 37, 41, 34, 32, 34, 35, 41, 42, 40, 42, 43, 45, 39, 39, 39, 33, 36, 36, 34, 37, 36, 39, 37, 41, 36, 38, 38, 38, 42, 38, 37, 39, 38, 41, 39, 42, 37, 39, 39, 35, 36, 37, 37, 40, 42, 32, 37, 35, 36, 39, 39, 36, 36, 40, 35, 34, 34, 35, 35, 35, 37, 37, 37] },
    { name : "Displacement", min: 61, max: 350, values: [112, 163, 141, 121, 141, 152, 209, 151, 231, 231, 231, 151, 307, 273, 273, 262, 133, 191, 305, 305, 133, 350, 151, 191, 202, 153, 181, 202, 153, 90, 153, 135, 153, 202, 135, 153, 180, 97, 122, 182, 114, 81, 302, 140, 302, 133, 133, 153, 182, 141, 232, 61, 97, 97, 132, 91, 97, 125, 90, 143, 274, 242, 232, 302, 302, 133, 180, 181, 97, 133, 113, 159, 181, 97, 122, 90, 181, 143, 146, 180, 146, 180, 97, 97, 146, 146, 189, 151, 151, 116, 132, 107, 98, 165, 121, 121, 121, 163, 73, 135, 109, 109, 122, 132, 97, 180, 180, 89, 109, 109, 109, 109, 109, 129, 141, 141] },
    { name : "Type", names: ["Compact", "Large", "Medium", "Small", "Sporty"], values: [3, 2, 2, 0, 0, 0, 2, 2, 1, 1, 2, 0, 1, 1, 2, 1, 0, 4, 4, 1, 0, 4, 2, 1, 2, 2, 0, 2, 1, 3, 4, 4, 2, 1, 3, 0, 2, 3, 4, 1, 3, 3, 1, 4, 4, 4, 4, 2, 2, 0, 2, 3, 3, 4, 0, 3, 4, 4, 3, 2, 2, 2, 2, 2, 1, 0, 2, 1, 4, 4, 3, 0, 2, 3, 0, 3, 0, 1, 4, 4, 1, 2, 4, 3, 0, 1, 2, 0, 2, 0, 2, 4, 3, 4, 0, 0, 2, 2, 3, 0, 3, 4, 0, 4, 3, 2, 4, 3, 4, 3, 3, 4, 3, 1, 0, 2, ]  }
  ];

function generateRandom( nRows ) {
    let randomData = [ 
        { name: "Random X", min: Infinity, max: -Infinity, values: [] },
        { name: "Random Y", min: Infinity, max: -Infinity, values: [] },
        { name: "Random Z", min: Infinity, max: -Infinity, values: [] },
        { name: "category", names: [], values: [] }
    ];

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

let columns = carsData; // convertIris(); /* simpleData; */
let loadedFont;
let labelMat;

// Create text geometry.
function createTextGeometry( text, font, size ) {
    var height = size || 70;
    var textGeom = new THREE.BufferGeometry();
    var shapes = font.generateShapes( text, height, 2 );
    var geometry = new THREE.ShapeGeometry( shapes );
    geometry.computeBoundingBox();
    var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    geometry.translate( xMid, 0, 0 );
    // make shape ( N.B. edge view not visible )
    textGeom.fromGeometry( geometry );
    return textGeom;
};

function makeLegend( catColumn ) {
    // Find legend and add categories
    let legend = document.getElementById('legend');
    let legendTitle = document.getElementById('legend-title');
    legendTitle.innerHTML = catColumn.name;
    for ( let i = 0; i < catColumn.names.length; i++ ) {
        let li = document.createElement( 'li' );
        let ball = document.createElement( 'div' );
        ball.setAttribute('class','ball');
        ball.style.backgroundColor = catColumn.categoryColors[ i ].getStyle();
        li.appendChild( ball );
        var t = document.createTextNode( catColumn.names[ i ]);
        li.appendChild( t );
        legend.appendChild( li );
    }
}

function replaceLegend( catColumn ) {
    // Find legend and replace categories
    let legend = document.getElementById('legend');
    // Remove old categories
    while ( legend.hasChildNodes()) {
        legend.removeChild( legend.lastChild );
    }
    // Add current categories.
    makeLegend( catColumn );
}

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

function replaceAxesAndGrid( columns, size ) {

    var xAxis = makeAxis( columns[ 0 ], size ); 
    var yAxis = makeAxis( columns[ 1 ], size );
    var zAxis = makeAxis( columns[ 2 ], size );
    // var gridXZ = new AxisGrid([ zAxis, xAxis ], size );
    // var gridXY = new AxisGrid([ yAxis, xAxis ], size );
    // var gridYZ = new AxisGrid([ zAxis, yAxis ], size );

    // XZ Grid.
    let gridXZ = scene.getObjectByName('gridXZ');
    scene.remove( gridXZ );
    gridXZ = new AxisGrid([ zAxis, xAxis ], size );

    // XY Grid.
    let gridXY = scene.getObjectByName('gridXY');
    scene.remove( gridXY );
    gridXY = new AxisGrid([ yAxis, xAxis ], size );

    // YZ Grid.
    let gridYZ = scene.getObjectByName('gridYZ');
    scene.remove( gridYZ );
    gridYZ = new AxisGrid([ zAxis, yAxis ], size );

    gridXZ.position.y = -1000;
    gridXY.rotation.x = Math.PI / 2;
    gridXY.position.z = -1000;
    gridYZ.rotation.z = Math.PI / 2;
    gridYZ.position.x = -1000;

    gridXZ.name = "gridXZ";
    gridXY.name = "gridXY";
    gridYZ.name = "gridYZ";
    scene.add( gridXZ );
    scene.add( gridXY );
    scene.add( gridYZ );

    // X Axis labels.
    let xAxisLabels = scene.getObjectByName('xAxisLabels');
    // Remove label children and make new ones.
    while ( xAxisLabels.children.length ) {
        xAxisLabels.remove( xAxisLabels.children[ 0 ] );
    }
    makeTickLabels( xAxisLabels, "x", xAxis, loadedFont, labelMat );

    // Y Axis labels.
    let yAxisLabels = scene.getObjectByName('yAxisLabels');
    // Remove label children and make new ones.
    while ( yAxisLabels.children.length ) {
        yAxisLabels.remove( yAxisLabels.children[ 0 ] );
    }
    makeTickLabels( yAxisLabels, "y", yAxis, loadedFont, labelMat );
    
    // Z Axis title.
    let zAxisLabels = scene.getObjectByName('zAxisLabels');
    // Remove label children and make new ones.
    while ( zAxisLabels.children.length ) {
        zAxisLabels.remove( zAxisLabels.children[ 0 ] );
    }
    makeTickLabels( zAxisLabels, "z", zAxis, loadedFont, labelMat );
}

function changeData() {
    let dataSelector = document.getElementById("select-data");
    
    switch ( dataSelector.selectedIndex ) {
    case 0:     columns = carsData;         break;
    case 1:     columns = diamondsData;     break;
    case 2:     columns = convertIris();    break; // TODO: cache once converted?
    case 3:     columns = generateRandom( 1000 ); break;
    case 4:     columns = generateRandom( 5000 ); break;
    default:    columns = generateRandom( 25000 ); break;
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
    replaceAxesAndGrid( columns, res );
    replaceLegend(columns[ 3 ]); 
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
    particleGeo.computeBoundingBox();

    return particleGeo;
}

function makeParticleMaterial( columns ) {
    let ball = new THREE.TextureLoader().load('./img/ball.png');
    let particleMat = new THREE.PointsMaterial({
        //color: 'rgb(5, 5, 200)',
        vertexColors: THREE.VertexColors,
        size: particleSize,
        //particle texture...
        map: ball,
        alphaTest: 0.7,
        transparent: true,
        depthWrite: true
    });
    return particleMat;
}

function makeAxis( column, size ) {
    // Determine a good major tick step.
    // TODO: spreading/destructuring?
    let max = column.max;
    let min = column.min;
    // Minimal increment to avoid round extreme values to be on the edge of the chart.
    let epsilon = ( max - min ) / 1e6;
    max += epsilon;
    min -= epsilon;
    let range = max - min;

    // Target number of values to be displayed on the Y axis (it may be less).
    let stepCount = 10;
    // First approximation
    let roughStep = range / ( stepCount - 1 );

    // Set best step for the range
    let goodNormalizedSteps = [ 1, 2, 5, 10 ]; // Keep the 10 at the end.

    // Normalize rough step to find the normalized one that fits best.
    let stepPower = Math.pow( 10, -Math.floor( Math.log10( Math.abs( roughStep ))));
    let normalizedStep = roughStep * stepPower;

    //var goodNormalizedStep = goodNormalizedSteps.First(n => n >= normalizedStep);
    // Find first in goodNormalizedSteps such that n >= normalizedStep.
    let i = 0;
    while ( goodNormalizedSteps[ i ] < normalizedStep ) {
        i++;
    }
    let step = goodNormalizedSteps[ i ] / stepPower;

    // Determine the scale limits based on the chosen step.
    let scaleMax = Math.ceil( max / step ) * step;
    let scaleMin = Math.floor( min / step ) * step;

    // convert to range -1000, 1000 
    let nMajor = Math.ceil(( scaleMax - scaleMin ) / step ); 
    console.log ( `${column.name}[${column.min},${column.max}]: ${nMajor} steps of size ${step} starting at ${scaleMin}`);    
    let majorStep = step * size / ( scaleMax - scaleMin );
    return { 
        // scene coordinates used for positioning.
        nMajor : nMajor, 
        majorStart:  -size / 2,
        majorStep: majorStep,
        // world coords used for labeling.
        worldStart: scaleMin,
        worldStep: step  
    };
}

function getDigitsOfPrecision( num ) {
    let digitsAfterDecimal = num.toString().split('.')[ 1 ];
    let digitsOfPrecision = 0; 
    if ( digitsAfterDecimal ) {
        digitsOfPrecision = digitsAfterDecimal.length; 
    }
    return digitsOfPrecision;
}

function makeTickLabels( axisGroup, whichAxis, axis, font, mat ) {
    // TODO: To use billboard text, it might be better not to group the labels.
    // Fix numbers like 0.60000000001
    let digitsOfPrecision = getDigitsOfPrecision( axis.worldStep ); 
    for( let i = 1; i < axis.nMajor; i++ ) {
        let label = ( axis.worldStart + i * axis.worldStep );
        if ( getDigitsOfPrecision( label ) > digitsOfPrecision + 1 ) {
            label = label.toFixed( digitsOfPrecision );
        }
        let labelText = label.toString();
        let axisLabel = new THREE.Mesh( createTextGeometry( labelText, font, 40 ), mat );
        if ( whichAxis === "y" ) {
            axisLabel.position.y = axis.majorStart + i * axis.majorStep;
        } else {    
            axisLabel.position.x = axis.majorStart + i * axis.majorStep;
        }
        axisGroup.add( axisLabel ); 
    }
}

// Create and add axis tick labels.
function addTickLabels( scene, whichAxis, axis, font, mat ) {

    // Put labels in a group that can be positioned.
    let axisGroup = new THREE.Object3D(); //create an empty container

    makeTickLabels( axisGroup, whichAxis, axis, font, mat );

    // Place labels.
    switch( whichAxis ) {
    case "x":
        axisGroup.position.z =  1000;
        axisGroup.position.y = -1000;
        break;
    case "y":
        axisGroup.position.z =  1000;
        axisGroup.position.x = -1000;
        break;
    case "z":
    default:
        axisGroup.position.x = -1000;
        axisGroup.position.y =  1000;
        axisGroup.rotation.y = Math.PI / 2;
        break;
    }

    // Add labels.
    axisGroup.name = whichAxis + "AxisLabels";
    scene.add( axisGroup );
}

// scene
var scene = new THREE.Scene();
var renderer, camera; // Made global for updating window size.
// picking
var particleSize = 100; 
var rayCaster,  intersection,
    threshold = particleSize,
    toggle = 0;
var spheres = [];
var spheresIndex = 0;
var clock;
var mouse = new THREE.Vector2();


try {
function init() {
     var stats = new Stats();
    // render performance stats using github.com/mrdoob/stats.js
    /* document.body.appendChild( stats.dom ); */
    var gui = new dat.GUI(); // UI controls

	// camera
	camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		10000 // far clipping plane
    );
    
    scene.position.set( 0, 200, 0 );
    camera.position.set( 1300, 1000, 3600 );
    camera.updateMatrix();
    
    let particleGeo = makeParticleGeo( columns );
    let particleMat =  makeParticleMaterial();
    let particleSystem = new THREE.Points( particleGeo, particleMat );
    particleSystem.name = 'particleSystem';
    scene.add( particleSystem );

    // Grids
    var size = res;
    var step = 10;
    var xAxis = makeAxis( columns[ 0 ], size ); 
    var yAxis = makeAxis( columns[ 1 ], size );
    var zAxis = makeAxis( columns[ 2 ], size );
    // Flip zAxis majorStart & majorStep.
    zAxis.majorStart *= -1;
    zAxis.majorStep *= -1;
    var gridXZ = new AxisGrid([ zAxis, xAxis ], size );
    var gridXY = new AxisGrid([ yAxis, xAxis ], size );
    var gridYZ = new AxisGrid([ zAxis, yAxis ], size );
    gridXZ.position.y = -1000;
    gridXY.rotation.x = Math.PI / 2;
    gridXY.position.z = -1000;
    gridYZ.rotation.z = Math.PI / 2;
    gridYZ.position.x = -1000;

    gridXZ.name = "gridXZ";
    gridXY.name = "gridXY";
    gridYZ.name = "gridYZ";

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
        labelMat = mainTitleMat; 

        let xColumnName = columns[0].name;
        let yColumnName = columns[1].name;
        let zColumnName = columns[2].name;
        let title = `${xColumnName} by ${yColumnName} by ${zColumnName}`;
        let mainTitle = new THREE.Mesh( createTextGeometry( title, font ), mainTitleMat );
        mainTitle.name = 'mainTitle';
        // X Axis title.
        let axisTitleMat = new THREE.MeshBasicMaterial({
            color: 0x222288,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        let xAxisTitle = new THREE.Mesh( createTextGeometry( xColumnName, font ), axisTitleMat );
        xAxisTitle.name = 'xAxisTitle';

        // Y Axis title.
        let yAxisTitle = new THREE.Mesh( createTextGeometry( yColumnName, font ), axisTitleMat );
        yAxisTitle.name = 'yAxisTitle';

        // Z Axis title.
        let zAxisTitle = new THREE.Mesh( createTextGeometry( zColumnName, font ), axisTitleMat );
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

        // Create and add tick labels.
        addTickLabels( scene, "x", xAxis, font, mainTitleMat ); // TODO: Use a specific material for axis ticks.
        addTickLabels( scene, "y", yAxis, font, mainTitleMat );
        addTickLabels( scene, "z", zAxis, font, mainTitleMat );

    }); // end font load function

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight - 50);

	renderer.setClearColor('rgb(200, 200, 200)');
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    guiScene( gui, scene, renderer, wallMat, particleMat );

	document.getElementById('webgl').appendChild(renderer.domElement);

    // Picking
    rayCaster = new THREE.Raycaster();
    rayCaster.params.Points.threshold = threshold;
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    clock = new THREE.Clock();
    let sphereGeometry = new THREE.SphereBufferGeometry( 0.1, 32, 32 );
    let sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    for ( let i = 0; i < 40; i++ ) {
        let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        scene.add( sphere );
        spheres.push( sphere );
    }

    update(renderer, scene, camera, controls, stats);
    
    makeLegend( columns[ 3 ]);

    window.addEventListener( 'resize', onWindowResize, false );

	return scene;
}

} catch( e ) {
    alert("exception");
}

function update( renderer, scene, camera, controls, stats ) {
    controls.update();
    /* stats.update(); */

    // Picking
    let particleSystem = scene.getObjectByName('particleSystem');
    rayCaster.setFromCamera( mouse, camera );
    var intersections = rayCaster.intersectObjects( [ particleSystem ] );

    let tip = document.getElementById('tip');
    intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;
    if  ( intersection ) {
        //console.dir( intersection.index );
        
        let i = intersection.index;
        let xTip = document.getElementById('x-tip');
        xTip.innerHTML = columns[ 0 ].name + ": " +  columns[ 0 ].values[ i ];
        let yTip = document.getElementById('y-tip');
        yTip.innerHTML = columns[ 1 ].name + ": " +  columns[ 1 ].values[ i ];
        let zTip = document.getElementById('z-tip');
        zTip.innerHTML = columns[ 2 ].name + ": " +  columns[ 2 ].values[ i ];
        let catTip = document.getElementById('cat-tip');
        catTip.innerHTML = columns[ 3 ].name + ": " +  columns[ 3 ].names[ columns[ 3 ].values[ i ]];
        tip.classList.add('visible');
        //for ( let j = 0; j < 3; j++ ) {
        //    console.log( columns[ j ].name + ":" +  columns[ j ].values[ i ]);
        //}
    } else {
        // let xTip = document.getElementById('x-tip');
        // xTip.innerHTML = columns[ 0 ].name + ":";
        // let yTip = document.getElementById('y-tip');
        // yTip.innerHTML = columns[ 1 ].name + ":";
        // let zTip = document.getElementById('z-tip');
        // zTip.innerHTML = columns[ 2 ].name + ":";
        // let catTip = document.getElementById('cat-tip');
        // catTip.innerHTML = columns[ 3 ].name + ":";
        tip.classList.remove('visible');
    }

    //for ( var i = 0; i < intersections.length; i++ ) {

		//intersections[ i ].object.material.color.set( 0xff0000 );

    //}

 /*   intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;
    if ( toggle > 0.02 && intersection !== null) {
        spheres[ spheresIndex ].position.copy( intersection.point );
        spheres[ spheresIndex ].scale.set( 1, 1, 1 );
        spheresIndex = ( spheresIndex + 1 ) % spheres.length;
        toggle = 0;
    }
    for ( var i = 0; i < spheres.length; i++ ) {
        var sphere = spheres[ i ];
        sphere.scale.multiplyScalar( 0.98 );
        sphere.scale.clampScalar( 0.01, 1 );
    }
    toggle += clock.getDelta();
*/
    renderer.render( scene, camera );
	
	requestAnimationFrame( function() {
		update( renderer, scene, camera, controls, stats );
	});
}

function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

if (Detector.webgl) {
    var scene = init();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

