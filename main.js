import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );












// variables for geometric objects

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const wrap = new THREE.MeshStandardMaterial( { color: 0xFF6258, wireframe: true } );

//These define the 3D vector and the values of the built in shader

const torus = new THREE.Mesh( geometry, wrap );
// variable containing mesh we want to add to scene
scene.add(torus)

const myPointLight = new THREE.PointLight(0xffffff)
myPointLight.position.set(5,5,5)
//setting up a basic pointlight to light the 3d objects
//pointlights are used to light specific points

const myAmbientLight = new THREE.AmbientLight(0xffffff);
//set up for ambient light, used to light whole scene

scene.add(myPointLight, myAmbientLight)

const controls = new OrbitControls(camera, renderer.domElement);
//instantiates OrbitControls class
//domElement listens to actions from mouse, and updates camera

const backTexture = new THREE.TextureLoader().load('space.webp');

scene.background = backTexture;
//Renders the Background

const colorTexture = new THREE.TextureLoader().load('color.png');
const sphereTexture = new THREE.TextureLoader().load('neptune.jpeg');
const triangleTexture = new THREE.TextureLoader().load('triangle.jpeg');

const myColor = new THREE.Mesh(
new THREE.BoxGeometry(3,3,3),
new THREE.MeshBasicMaterial( { map: colorTexture} )
);

myColor.position.y = 10;
myColor.position.x = 30;

scene.add(myColor);

const mySphere = new THREE.Mesh(
  new THREE.SphereGeometry(2,6,4),
  new THREE.MeshBasicMaterial( { map: sphereTexture} )
  );

mySphere.position.y = -10;
mySphere.position.x = -30;

scene.add(mySphere);












function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  mySphere.rotation.x += 0.06;
  mySphere.rotation.y += 0.0006;

  myColor.rotation.x += 0.06;
  myColor.rotation.y += 0.04;
 
  
  controls.update();

  


  renderer.render( scene, camera );
}
//Refactored function call that refreshes the website when a new object needs to be drawn
//Serves as a physics update loop


animate()


