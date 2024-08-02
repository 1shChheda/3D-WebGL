import * as THREE from 'three';

export function initModelReplacement(scene) {
  // creating and adding model asset items in html code
  const assets = document.createElement('a-assets');
  
  const cupItem = document.createElement('a-asset-item');
  cupItem.setAttribute('id', 'cup-model');
  cupItem.setAttribute('src', './assets/models/coffee.gltf');
  
  const bottleItem = document.createElement('a-asset-item');
  bottleItem.setAttribute('id', 'bottle-model');
  bottleItem.setAttribute('src', './assets/models/bottle.gltf');
  
  assets.appendChild(cupItem);
  assets.appendChild(bottleItem);
  scene.appendChild(assets);

  assets.addEventListener('loaded', () => {
    console.log('Models loaded');
  });
}

export function replaceObject(objectType, position, scene) {
  const entityEl = document.querySelector('#object-placeholder');
  entityEl.setAttribute('position', position);
  
  if (objectType === 'cup') {
    entityEl.setAttribute('gltf-model', '#cup-model');
    console.log("Cup model shown");
  } else if (objectType === 'bottle') {
    entityEl.setAttribute('gltf-model', '#bottle-model');
    console.log("Bottle model shown");
  }
  
  entityEl.setAttribute('visible', true);

  // to hide the entity after some time
  // setTimeout(() => {
  //   entityEl.setAttribute('visible', false);
  // }, 5000);
}

