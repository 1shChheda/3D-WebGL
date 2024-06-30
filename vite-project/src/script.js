import './style.css'
import * as THREE from 'three';

/* Scene */
const scene = new THREE.Scene();

/* Object (Red Cube) */
    // alongside use of Scene Graph

    // use of "Group"
const group = new THREE.Group();
scene.add(group);

group.position.y = 1;
group.scale.z = 2;
group.rotation.x = Math.PI / 4;

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 0.7),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube2.position.set(2, 0, 0);
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 0.7),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

cube3.position.set(-2, 0, 0);
group.add(cube3);


/* AxesHelper */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/* Sizes (related to Camera) */
    // temporary values
const sizes = {
    width: 800,
    height: 600
};

/* Camera */
    // using Perspective Camera 
        // most common - mimics the way the human eye sees
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

    // NOTHING VISIBLE! bcoz the camera is inside the cube...need to move it backward
camera.position.z = 3; // since the dim. of cube is 1,1,1 -> position value is bigger than that, to get out of cube

// camera.position.x = 2;
// camera.position.y = 1;
scene.add(camera);

// camera.lookAt(new THREE.Vector3(3,0,0));
// camera.lookAt(mesh.position); 

/* Renderer */

    // grab canvas from HTML DOM
const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

    // use "setSize()" method to update the size of the renderer
renderer.setSize(sizes.width, sizes.height);

    // NOW, RENDER!
renderer.render(scene, camera); // arg: scene, camera
