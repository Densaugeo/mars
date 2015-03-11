# castleMap.js

Creates a THREE.Object3D castle

Dependencies: `THREE.js` , `THREE.Densaugeo.js` , `EventEmitter.js` 

```
scene.add(castleMap.castle);
castleMap.load(callback);
```

#### Properties

`THREE.Object3D` **castle** -- Base object

`[String]` **modelPaths** -- Paths to each THREE.js model

#### Methods

`undefined` **load**`()` -- Loads all the models and fires events at start and finish

#### Events

**loaded** `{}` -- Models have finished loading; scene is available in .castle

**loading** `{}` -- REquests for models have been sent to server

