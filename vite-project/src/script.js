import './style.css'
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* Scene */
const scene = new THREE.Scene();

/* Object (Red Cube) */
const geometry = new THREE.BoxGeometry(1, 1, 1); // arg: height, width, depth
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* AxesHelper */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/* Sizes (related to Camera) */
    // temporary values
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

/* Mouse Coordinates */

    // to store coordinates
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5; 
    cursor.y = - (event.clientY / sizes.height - 0.5);
    console.log(cursor);
});

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

/* Additional Controls */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth controls

/* To estimate Frame rate */
let clock = new THREE.Clock();

/* Create tween using "gsap" */
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 3, x: 0 });

/* Creating timeline for Gsap animations */
// gsap.timeline()
//     .to(mesh.position, { duration: 2, delay: 2, y: 2 })
//     .to(mesh.position, { duration: 3, delay: 3, z: 0.5, ease: 'bounce' })

// extra: to resize the window so that we don't have to reload again and again for new render when we resize the screen
window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update the camera too
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);

    
});

function animate() {
    // elapsedTime: total time that has passed since the clock was started
        // continues to increase as long as the clock is running.
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);

    mesh.rotation.z = Math.cos(elapsedTime);
    
    /* for normal camera position controls */
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 3;
    // camera.lookAt(mesh.position);

    controls.update(); // Update controls


    // NOW, RENDER!
    renderer.render(scene, camera); // arg: scene, camera
    window.requestAnimationFrame(animate);

}

animate();