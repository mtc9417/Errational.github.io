import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {TrackballControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/TrackballControls.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js';
// const aws = require(['./node_modules/aws-sdk/clients/s3']);
// const config = require(['./config.json']);

// (async function(){

//   try{
//     aws.config.setPromisesDependency();
//     aws.config.update({

//       accessKeyId:config.aws.accessKeyId,
//       secretAccessKey:config.aws.secretAccessKey,
//       region: 'us-east-2'
//     }).promise();

//     const s3 = new aws.S3();
//     const response = await s3.listObjectsV2({
//       Bucket:"errationalshapes"
//     });
//     console.log(response);

//   }catch(e){
//     console.log("our error", e);
//   }

// })();


function main() {
  const canvas = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true});

  const sceneElements = [];
  function addScene(elem, fn) {
    sceneElements.push({elem, fn});
  }

  function makeScene(elem) {
    const scene = new THREE.Scene();

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    const controls = new TrackballControls(camera, elem);
    // controls.noZoom = true;
    controls.noPan = true;
    controls.rotateSpeed = 1.75;

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      const light2 = new THREE.DirectionalLight(color, intensity-.3);
      light.position.set(-1, 2, 10);
      light2.position.set(2, -2, -10);
      scene.add(light, light2);
    }

    return {scene, camera, controls};
  }

  let speed = 0.2;
  const sceneInitFunctionsByName = {
    'oneOne': (elem) => {
      const {scene, camera, controls} = makeScene(elem);

      const objLoader = new OBJLoader2();
      objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/oneOne.obj', (root) => {
      scene.add(root);
      });
      // scene.add(mesh);
      return (time, rect) => {
       
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        controls.handleResize();
        controls.update();
        renderer.render(scene, camera);
      };
    },
    'oneTwo': (elem) => {
      const {scene, camera, controls} = makeScene(elem);
      const objLoader = new OBJLoader2();
      objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/oneTwo.obj', (root) => {
      scene.add(root);
      });
      return (time, rect) => {
        
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        controls.handleResize();
        controls.update();
        renderer.render(scene, camera);
      };
    },
    'twoOne': (elem) => {
        const {scene, camera, controls} = makeScene(elem);
        const objLoader = new OBJLoader2();
        objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/twoOne.obj', (root) => {
        scene.add(root);
        });
        return (time, rect) => {
          
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          controls.handleResize();
          controls.update();
          renderer.render(scene, camera);
        };
      },
      'TwoTwo': (elem) => {
        const {scene, camera, controls} = makeScene(elem);
        const objLoader = new OBJLoader2();
        objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/twoTwo.obj', (root) => {
        scene.add(root);
        });
        return (time, rect) => {
          
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          controls.handleResize();
          controls.update();
          renderer.render(scene, camera);
        };
      },
      'threeOne': (elem) => {
        const {scene, camera, controls} = makeScene(elem);
        const objLoader = new OBJLoader2();
        objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/threeOne.obj', (root) => {
        scene.add(root);
        });
        return (time, rect) => {
          
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          controls.handleResize();
          controls.update();
          renderer.render(scene, camera);
        };
      },
      'threeTwo': (elem) => {
        const {scene, camera, controls} = makeScene(elem);
        const objLoader = new OBJLoader2();
        objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/threeTwo.obj', (root) => {
        scene.add(root);
        });
        return (time, rect) => {
          
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          controls.handleResize();
          controls.update();
          renderer.render(scene, camera);
        };
      },
      'fourOne': (elem) => {
        const {scene, camera, controls} = makeScene(elem);
        const objLoader = new OBJLoader2();
        objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/fourOne.obj', (root) => {
        scene.add(root);
        });
        return (time, rect) => {
          
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          controls.handleResize();
          controls.update();
          renderer.render(scene, camera);
        };
      },
      'fourTwo': (elem) => {
        const {scene, camera, controls} = makeScene(elem);
        const objLoader = new OBJLoader2();
        objLoader.load('https://errationalshapes.s3.us-east-2.amazonaws.com/fourTwo.obj', (root) => {
        scene.add(root);
        });
        return (time, rect) => {
          
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          controls.handleResize();
          controls.update();
          renderer.render(scene, camera);
        };
      },
  };

  document.querySelectorAll('[data-diagram]').forEach((elem) => {
    const sceneName = elem.dataset.diagram;
    const sceneInitFunction = sceneInitFunctionsByName[sceneName];
    const sceneRenderFunction = sceneInitFunction(elem);
    addScene(elem, sceneRenderFunction);
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const clearColor = new THREE.Color('#000');
  function render(time) {
    time *= 0.001;

    resizeRendererToDisplaySize(renderer);

    renderer.setScissorTest(false);
    renderer.setClearColor(clearColor, 0);
    renderer.clear(true, true);
    renderer.setScissorTest(true);

    const transform = `translateY(${window.scrollY}px)`;
    renderer.domElement.style.transform = transform;

    for (const {elem, fn} of sceneElements) {
      // get the viewport relative position of this element
      const rect = elem.getBoundingClientRect();
      const {left, right, top, bottom, width, height} = rect;

      const isOffscreen =
          bottom < 0 ||
          top > renderer.domElement.clientHeight ||
          right < 0 ||
          left > renderer.domElement.clientWidth;

      if (!isOffscreen) {
        const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);

        fn(time, rect);
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
