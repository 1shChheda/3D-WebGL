import * as THREE from 'three';
import 'aframe';

AFRAME.registerComponent('ar-scene', {
  init: function () {
    this.el.addEventListener('loaded', () => {
      const sceneEl = this.el;
      const arjsSystem = sceneEl.systems['arjs'];
      const arToolkitContext = arjsSystem.arToolkitContext;

      // sEt up AR.js with Three.js
      arToolkitContext.init(() => {
        sceneEl.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
      });
    });
  },

  tick: function () {
    // Update AR.js on each frame
    const sceneEl = this.el;
    const arjsSystem = sceneEl.systems['arjs'];
    if (arjsSystem) {
      arjsSystem.update();
    }
  }
});