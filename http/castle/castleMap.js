/**
 * @description Creates a THREE.Object3D castle
 * @depends THREE.js
 * @depends THREE.Densaugeo.js
 * @depends EventEmitter.js
 * 
 * @example scene.add(castleMap.castle);
 * @example castleMap.load(callback);
 */

if(window.THREE == null) {
  console.error('castleMap.js requires THREE.js');
}

if(window.THREE.Densaugeo == null) {
  console.error('castleMap.js requires THREE.Densaugeo.js');
}

castleMap = new EventEmitter();

// @prop THREE.Object3D castle -- Base object
castleMap.castle = new THREE.Object3D();

// @prop [String] modelPaths -- Paths to each THREE.js model
castleMap.modelPaths = [
  "models/Annex_Door.json",
  "models/Annex_Gate.json",
  "models/Annex_Wall_1.json",
  "models/Annex_Wall_2.json",
  "models/Annex_Wall_S_End.json",
  "models/Annex_Wall_Stretched.json",
  "models/Citadel_Door.json",
  "models/Citadel_Door_Side.json",
  "models/Citadel_Mezzanine.json",
  "models/Citadel_Side.json",
  "models/Fortress_Bridge_Extension.json",
  "models/Fortress_Bridge.json",
  "models/Fortress_Bridge_Wall_1_Extension.json",
  "models/Fortress_Bridge_Wall_1.json",
  "models/Fortress_Bridge_Wall_2.json",
  "models/Fortress_Bridge_Wall_Mirrored_2.json",
  "models/Fortress_Causeway_Drawbridge.json",
  "models/Fortress_Causeway_Drop.json",
  "models/Fortress_Causeway.json",
  "models/Fortress_Corner.json",
  "models/Fortress_Dock.json",
  "models/Fortress_Gate_1_Banner.json",
  "models/Fortress_Gate_1.json",
  "models/Fortress_Gate_1_L_Door.json",
  "models/Fortress_Gate_1_R_Door.json",
  "models/Fortress_Gate_1_Spiral.json",
  "models/Fortress_Gate_2_Drawbridge.json",
  "models/Fortress_Gate_2.json",
  "models/Fortress_Gate_3_Drawbridge.json",
  "models/Fortress_Gate_3_Wall.json",
  "models/Fortress_Gate_3.json",
  "models/Fortress_Inner_Corner.json",
  "models/Fortress_Ramp.json",
  "models/Fortress_Tower_Base_1.json",
  "models/Fortress_Tower_Base_2.json",
  "models/Fortress_Tower_E.json",
  "models/Fortress_Tower_Lower_Drawbridge.json",
  "models/Fortress_Tower_Upper_Drawbridge.json",
  "models/Fortress_Tower_W.json",
  "models/Fortress_Wall_Battlement.json",
  "models/Fortress_Wall.json",
  "models/Gilded_Bridge_Wall.json",
  "models/Gilded_Fortress_Bridge.json",
  "models/Gilded_Keep_Battlement.json",
  "models/Gilded_Keep_Corner.json",
  "models/Gilded_Keep_Wall.json",
  "models/Ground.json",
  "models/Harbor_Bridge.json",
  "models/Harbor_Gate.json",
  "models/Harbor_Gate_Mirrored.json",
  "models/Harbor_Island_Door.json",
  "models/Harbor_Island.json",
  "models/Harbor_Tower_N.json",
  "models/Harbor_Tower_S.json",
  "models/Keep_Corner.json",
  "models/Keep_Dock_Bridge.json",
  "models/Keep_Dock.json",
  "models/Keep_Tower.json",
  "models/Keep_Tower_Supports_3S.json",
  "models/Keep_Tower_Supports.json",
  "models/Keep_Wall_Battlement.json",
  "models/Keep_Wall.json",
]

var f3D = THREE.Densaugeo.forgeObject3D;
var fM  = THREE.Densaugeo.forgeMesh;

var loader = new THREE.Densaugeo.JSONMultiLoader();

// @method undefined load() -- Loads all the models and fires events at start and finish
// @event loading {} -- REquests for models have been sent to server
// @event loaded {} -- Models have finished loading; scene is available in .castle
castleMap.load = function() {
  loader.loadAll(castleMap.modelPaths, function(geometries, materialses) {
    var geometry, material;
    
    // Stock the O3D/Mesh forge. Strip paths and file extensions from model names
    for(var i in geometries) {
      fM.geometries[i.split('/').pop().split('.').shift()] = geometries[i];
    }
    for(var i in materialses) {
      fM.materials[i.split('/').pop().split('.').shift()] = new THREE.MeshFaceMaterial(materialses[i]).makeFlat();
    }
    
    var keep = f3D(THREE.Object3D, {}, [
      fM('Keep_Tower'          , {}),
      fM('Keep_Tower_Supports' , {}),
      fM('Keep_Wall'           , {position: [ 0, -3, 0]}),
      fM('Keep_Wall'           , {position: [ 3,  0, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Keep_Wall'           , {position: [ 0,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall'           , {position: [-3,  0, 0], euler: [0, 0, 1.5*Math.PI]}),
      fM('Keep_Corner'         , {position: [-3, -3, 0]}),
      fM('Keep_Corner'         , {position: [ 3, -3, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Keep_Corner'         , {position: [ 3,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Corner'         , {position: [-3,  3, 0], euler: [0, 0, 1.5*Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [ 2, -3, 0]}),
      fM('Keep_Wall_Battlement', {position: [ 2,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [-3,  2, 0], euler: [0, 0, 1.5*Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [-3, -2, 0], euler: [0, 0, 1.5*Math.PI]}),
    ]);
    
    var harborKeep = f3D(THREE.Object3D, {}, [
      fM('Keep_Tower'            , {position: [-8, 0, 0]}),
      fM('Keep_Tower_Supports_3S', {position: [-8, 0, 0]}),
      fM('Keep_Tower'            , {}),
      fM('Keep_Tower_Supports_3S', {euler: [0, 0, Math.PI]}),
      
      fM('Keep_Corner'         , {position: [-11, -3, 0]}),
      fM('Keep_Wall_Battlement', {position: [-10, -3, 0]}),
      fM('Keep_Wall'           , {position: [- 8, -3, 0]}),
      fM('Keep_Wall_Battlement', {position: [- 6, -3, 0]}),
      fM('Keep_Wall'           , {position: [- 4, -3, 0]}),
      fM('Keep_Wall'           , {position: [  0, -3, 0]}),
      fM('Keep_Wall_Battlement', {position: [  2, -3, 0]}),
      fM('Keep_Corner'         , {position: [  3, -3, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [  3, -2, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Keep_Wall'           , {position: [  3,  0, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [  3,  2, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Keep_Corner'         , {position: [  3,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [  2,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall'           , {position: [  0,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [- 2,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall'           , {position: [- 4,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [- 6,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall'           , {position: [- 8,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [-10,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Keep_Corner'         , {position: [-11,  3, 0], euler: [0, 0, 1.5*Math.PI]}),
      fM('Keep_Wall_Battlement', {position: [-11,  2, 0], euler: [0, 0, 1.5*Math.PI]}),
      fM('Keep_Wall'           , {position: [-11,  0, 0], euler: [0, 0, 1.5*Math.PI]}),
    ]);
    
    var gildedKeep = f3D(THREE.Object3D, {}, [
      fM('Keep_Tower'            , {}),
      fM('Keep_Tower_Supports'   , {}),
      fM('Gilded_Keep_Wall'      , {position: [ 0, -3, 0]}),
      fM('Gilded_Keep_Wall'      , {position: [ 3,  0, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Gilded_Keep_Wall'      , {position: [ 0,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Gilded_Keep_Wall'      , {position: [-3,  0, 0], euler: [0, 0, 1.5*Math.PI]}),
      fM('Gilded_Keep_Corner'    , {position: [-3, -3, 0]}),
      fM('Gilded_Keep_Corner'    , {position: [ 3, -3, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Gilded_Keep_Corner'    , {position: [ 3,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Gilded_Keep_Corner'    , {position: [-3,  3, 0], euler: [0, 0, 1.5*Math.PI]}),
      fM('Gilded_Keep_Battlement', {position: [-2, -3, 0]}),
      fM('Gilded_Keep_Battlement', {position: [ 2, -3, 0]}),
      fM('Gilded_Keep_Battlement', {position: [ 3, -2, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Gilded_Keep_Battlement', {position: [ 3,  2, 0], euler: [0, 0, 0.5*Math.PI]}),
      fM('Gilded_Keep_Battlement', {position: [-2,  3, 0], euler: [0, 0,     Math.PI]}),
      fM('Gilded_Keep_Battlement', {position: [-3, -2, 0], euler: [0, 0, 1.5*Math.PI]}),
    ]);
    
    var fortressTower1 = f3D(THREE.Object3D, {}, [
      fM('Fortress_Tower_Base_1'          , {position: [0  ,  0  , 0  ]}),
      fM('Fortress_Tower_E'               , {position: [0  ,  0  , 4.2]}),
      fM('Fortress_Tower_Lower_Drawbridge', {position: [0.5, -1.5, 4.4]}),
      fM('Fortress_Tower_Upper_Drawbridge', {position: [0.5, -1.5, 7.6]}),
    ]);
    
    var fortressTower2 = f3D(THREE.Object3D, {}, [
      fM('Fortress_Tower_Base_2'          , {position: [ 0  ,  0  , 0  ]}),
      fM('Fortress_Tower_W'               , {position: [ 0  ,  0  , 4.2]}),
      fM('Fortress_Tower_Lower_Drawbridge', {position: [-0.5, -1.5, 4.4]}),
      fM('Fortress_Tower_Upper_Drawbridge', {position: [-0.5, -1.5, 7.6]}),
    ]);
    
    var fortressGate2 = f3D(THREE.Object3D, {}, [
      fM('Fortress_Gate_2'           , {position: [0,  0  , 0  ]}),
      fM('Fortress_Gate_2_Drawbridge', {position: [0, -2  , 3.8]}),
      fM('Fortress_Ramp'             , {position: [0, -4.5, 0  ], euler: [0, 0, Math.PI]}),
      fM('Fortress_Ramp'             , {position: [0, -4.5, 0  ]}),
    ]);
    
    var annexGate = f3D(THREE.Object3D, {}, [
      fM('Annex_Gate', {position: [ 0  ,  0  , 0]}),
      fM('Annex_Door', {position: [-0.6,  1.2, 0]}),
      fM('Annex_Door', {position: [-0.6, -1.2, 0], euler: [0, 0, Math.PI]}),
    ]);
    
    castleMap.castle.add(
      castleMap.ground = fM('Ground', {}),
      castleMap.fortress = f3D(THREE.Object3D, {position: [0, 0, 0]}, [
        fM('Fortress_Gate_1'       , {position: [ 0  , -21   , 0  ]}),
        fM('Fortress_Gate_1_R_Door', {position: [-1.5, -25   , 4  ]}),
        fM('Fortress_Gate_1_R_Door', {position: [ 1.5, -25   , 4  ]}),
        fM('Fortress_Gate_1_Banner', {position: [-2.5, -28.25, 7.8]}),
        fM('Fortress_Gate_1_Banner', {position: [ 2.5, -28.25, 7.8]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 0.2], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 0.6], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 1.0], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 1.4], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 1.8], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 2.2], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 2.6], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [-2.5, -27.5 , 3.0], euler: [0, 0, 7.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 0.2], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 0.6], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 1.0], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 1.4], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 1.8], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 2.2], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 2.6], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Gate_1_Spiral', {position: [ 2.5, -27.5 , 3.0], euler: [0, 0, 172.5/180*Math.PI]}),
        fM('Fortress_Ramp'         , {position: [ 0  , -23   , 0  ], euler: [0, 0, 1.5*Math.PI]}),
        
        fM('Fortress_Wall_Battlement', {position: [ 4  , -22  , 0]}),
        fM('Fortress_Wall'           , {position: [ 5.5, -22  , 0]}),
        fM('Fortress_Wall_Battlement', {position: [ 7  , -22  , 0]}),
        fM('Fortress_Wall'           , {position: [ 8.5, -22  , 0]}),
        fM('Fortress_Wall_Battlement', {position: [10  , -22  , 0]}),
        
        fM('Fortress_Corner', {position: [11, -22, 0], euler: [0, 0, 0.5*Math.PI]}),
        
        fM('Fortress_Wall'           , {position: [11, -19.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, -18  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [11, -16.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, -15  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [11, -13.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, -12  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [11, -10.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, - 9  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [11, - 7.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, - 6  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [11, - 4.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, - 3  , 0], euler: [0, 0, 0.5*Math.PI]}),
        
        fM('Harbor_Bridge'           , {position: [11, 0, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, 0, 0], euler: [0, 0, 0.5*Math.PI]}),
        
        fM('Fortress_Wall_Battlement', {position: [11, 3  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [11, 4.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, 6  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [11, 7.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [11, 9  , 0], euler: [0, 0, 0.5*Math.PI]}),
        
        fM('Fortress_Corner', {position: [11, 10, 0], euler: [0, 0, Math.PI]}),
        
        fM('Fortress_Wall_Battlement', {position: [ 10  , 10, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall'           , {position: [  8.5, 10, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [  7  , 10, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall'           , {position: [  5.5, 10, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [  4  , 10, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall'           , {position: [  2.5, 10, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [  1  , 10, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall'           , {position: [- 0.5, 10, 0], euler: [0, 0, Math.PI]}),
        
        fM('Fortress_Inner_Corner', {position: [-3, 10, 0]}),
        
        fM('Fortress_Wall'           , {position: [-3, 12  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-3, 13.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-3, 15  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-3, 16.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        
        fM('Fortress_Gate_3'           , {position: [-4   , 20.5, 0  ], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Gate_3_Wall'      , {position: [ 2.5 , 20.5, 0  ], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Gate_1_Banner'    , {position: [ 3.25, 18  , 7.8], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Gate_1_Banner'    , {position: [ 3.25, 23  , 7.8], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Gate_3_Drawbridge', {position: [ 3   , 20.5, 3.8]}),
        fM('Fortress_Dock'             , {position: [ 8.5 , 20.5, 0  ]}),
        
        fM('Fortress_Wall_Battlement', {position: [-3, 24.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-3, 26  , 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-3, 27.5, 0], euler: [0, 0, 0.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-3, 29  , 0], euler: [0, 0, 0.5*Math.PI]}),
        
        fM('Fortress_Corner', {position: [-3, 31.5, 0], euler: [0, 0, Math.PI]}),
        
        fM('Fortress_Wall_Battlement', {position: [- 4  , 31.5, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall'           , {position: [- 5.5, 31.5, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [- 7  , 31.5, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall'           , {position: [- 8.5, 31.5, 0], euler: [0, 0, Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-10  , 31.5, 0], euler: [0, 0, Math.PI]}),
        
        fM('Fortress_Corner', {position: [-11, 31.5, 0], euler: [0, 0, 1.5*Math.PI]}),
        
        fM('Fortress_Wall'           , {position: [-11, 29, 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11, 27.5, 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11, 26, 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11, 24.5, 0], euler: [0, 0, 1.5*Math.PI]}),
        
        f3D(fortressGate2.clone(), {position: [-10, 20.5, 0], euler: [0, 0, 1.5*Math.PI]}),
        
        fM('Fortress_Wall_Battlement', {position: [-11,  16.5 , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11,  15   , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11,  13.5 , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11,  12   , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11,  10.75, 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11,   9.5 , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11,   8   , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11,   6.5 , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11,   5   , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11,   3.5 , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11,   2   , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11,   0.5 , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11, - 1   , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11, - 2.5 , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11, - 4   , 0], euler: [0, 0, 1.5*Math.PI]}),
        
        f3D(fortressGate2.clone(), {position: [-10, -8, 0], euler: [0, 0, 1.5*Math.PI]}),
        
        fM('Fortress_Wall_Battlement', {position: [-11, -12  , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11, -13.5, 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11, -15  , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11, -16.5, 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall_Battlement', {position: [-11, -18  , 0], euler: [0, 0, 1.5*Math.PI]}),
        fM('Fortress_Wall'           , {position: [-11, -19.5, 0], euler: [0, 0, 1.5*Math.PI]}),
        
        fM('Fortress_Corner'         , {position: [-11, -22, 0]}),
        
        fM('Fortress_Wall_Battlement', {position: [-10  , -22, 0]}),
        fM('Fortress_Wall'           , {position: [- 8.5, -22, 0]}),
        fM('Fortress_Wall_Battlement', {position: [- 7  , -22, 0]}),
        fM('Fortress_Wall'           , {position: [- 5.5, -22, 0]}),
        fM('Fortress_Wall_Battlement', {position: [- 4  , -22, 0]}),
        
        fM('Citadel_Door_Side', {}),
        fM('Citadel_Door'     , {position: [-1.275, -2.85, 5.1]}),
        fM('Citadel_Side'     , {euler: [0, 0, 0.5*Math.PI]}),
        fM('Citadel_Side'     , {euler: [0, 0,     Math.PI]}),
        fM('Citadel_Side'     , {euler: [0, 0, 1.5*Math.PI]}),
        fM('Citadel_Mezzanine', {}),
        fM('Citadel_Mezzanine', {euler: [0, 0, 0.5*Math.PI]}),
        fM('Citadel_Mezzanine', {euler: [0, 0,     Math.PI]}),
        fM('Citadel_Mezzanine', {euler: [0, 0, 1.5*Math.PI]}),
        
        fM('Fortress_Causeway_Drop'      , {position: [ 0    , -8, 0   ]}),
        fM('Fortress_Causeway'           , {position: [-6.5  , -8, 0   ]}),
        fM('Fortress_Causeway_Drawbridge', {position: [-7.275, -8, 3.55]}),
        fM('Fortress_Causeway'           , {position: [ 6.5  , -8, 0   ], euler: [0, 0, Math.PI]}),
        fM('Fortress_Causeway_Drawbridge', {position: [ 7.275, -8, 3.55], euler: [0, 0, Math.PI]}),
        
        f3D(fortressTower2.clone(), {position: [-6.5, -19, 0]}),
        f3D(fortressTower1.clone(), {position: [ 6.5, -19, 0]}),
        f3D(fortressTower2.clone(), {position: [ 7  ,   7, 0], euler: [0, 0, Math.PI]}),
        
        f3D(keep.clone(), {position: [-21.5, -23, 0]}),
        fM('Fortress_Bridge'       , {position: [-14.75, -21, 4.2]}),
        fM('Fortress_Bridge_Wall_2', {position: [-14.75, -21, 0  ]}),
        fM('Keep_Wall_Battlement'  , {position: [-23.5 , -26, 0  ]}),
        fM('Keep_Wall_Battlement'  , {position: [-18.5 , -25, 0  ], euler: [0, 0, 0.5*Math.PI]}),
        
        fM('Annex_Wall_S_End'    , {position: [-23.5, -18   , 0]}),
        fM('Annex_Wall_2'        , {position: [-23.5, -14   , 0]}),
        f3D(annexGate.clone()            , {position: [-23.5, - 8   , 0]}),
        fM('Annex_Wall_2'        , {position: [-23.5, - 2   , 0]}),
        fM('Annex_Wall_1'        , {position: [-23.5,   2   , 0]}),
        fM('Annex_Wall_Stretched', {position: [-23.5,   6.25, 0]}),
        fM('Annex_Wall_1'        , {position: [-23.5,  10.5 , 0]}),
        fM('Annex_Wall_2'        , {position: [-23.5,  14.5 , 0]}),
        f3D(annexGate.clone()            , {position: [-23.5,  20.5 , 0]}),
        fM('Annex_Wall_2'        , {position: [-23.5,  26.5 , 0]}),
        
        f3D(keep.clone(), {position: [-21.5, 32.5, 0]}),
        fM('Fortress_Bridge'                , {position: [-14.75, 30.5, 4.2]}),
        fM('Fortress_Bridge_Wall_Mirrored_2', {position: [-14.75, 30.5, 0  ]}),
        fM('Keep_Wall_Battlement'           , {position: [-23.5 , 35.5, 0  ], euler: [0, 0, Math.PI]}),
        fM('Keep_Wall_Battlement'           , {position: [-18.5 , 34.5, 0  ], euler: [0, 0, 0.5*Math.PI]}),
        
        f3D(gildedKeep.clone(), {position: [20.5, -23, 0]}),
        fM('Gilded_Fortress_Bridge', {position: [14.5, -21, 4.2]}),
        fM('Gilded_Bridge_Wall'    , {position: [14.5, -21, 0  ]}),
        
        fM('Harbor_Tower_S'      , {position: [22.5, -15  , 0  ]}),
        fM('Keep_Dock_Bridge'    , {position: [21  , -17  , 4.4]}),
        fM('Keep_Dock'           , {position: [18.5, -17  , 0  ]}),
        fM('Harbor_Gate'         , {position: [22.5, - 3.5, 0  ]}),
        fM('Harbor_Island_Door'  , {position: [23.5, - 4.5, 3.8]}),
        fM('Harbor_Island'       , {position: [22.5,   1.5, 0  ]}),
        fM('Harbor_Island_Door'  , {position: [21.5,   7.5, 3.8], euler: [0, 0, Math.PI]}),
        fM('Harbor_Gate_Mirrored', {position: [22.5,   6.5, 0  ]}),
        fM('Harbor_Gate'         , {position: [22.5,  21.5, 0  ]}),
        fM('Harbor_Tower_N'      , {position: [22.5,  24.5, 0  ]}),
        
        f3D(harborKeep.clone(), {position: [24.5, 32.5, 0]}),
        fM('Fortress_Bridge'                 , {position: [ 0.75, 30.5, 4.2], euler: [0, 0, Math.PI]}),
        fM('Fortress_Bridge_Extension'       , {position: [ 5.75, 30.5, 4.2], euler: [0, 0, Math.PI]}),
        fM('Fortress_Bridge_Extension'       , {position: [10.25, 30.5, 4.2], euler: [0, 0, Math.PI]}),
        fM('Fortress_Bridge_Wall_1'          , {position: [ 0.75, 30.5, 0  ], euler: [0, 0, Math.PI]}),
        fM('Fortress_Bridge_Wall_1_Extension', {position: [ 5.75, 30.5, 0  ], euler: [0, 0, Math.PI]}),
        fM('Fortress_Bridge_Wall_1_Extension', {position: [10.25, 30.5, 0  ], euler: [0, 0, Math.PI]}),
      ])
    ); // castleMap.castle
    
    castleMap.emit('loaded');
  }); // Loader.loadAll();
  
  castleMap.emit('loading');
} // castleMap.load
