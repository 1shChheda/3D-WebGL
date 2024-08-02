import * as tf from '@tensorflow/tfjs';
import * as THREE from 'three';

export function initObjectDetection(scene, camera, model, video, canvas, onDetection) {
  const ctx = canvas.getContext('2d');

  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    });

  async function detectObjects() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    tf.engine().startScope();
    const predictions = await model.detect(canvas);
    tf.engine().endScope();

    ctx.font = '16px sans-serif';
    ctx.textBaseline = 'top';

    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;

      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = '#00FFFF';
      ctx.fillRect(x, y, ctx.measureText(text).width + 10, 25);

      ctx.fillStyle = '#000000';
      ctx.fillText(text, x, y);

      if (prediction.class === 'cup' || prediction.class === 'bottle') {
        console.log(`Detected ${prediction.class} with confidence ${prediction.score}`);

        // Calculate position in AR space
        const positionX = ((x + width / 2) / canvas.width) * 2 - 1;
        const positionY = -((y + height / 2) / canvas.height) * 2 + 1;

        // Create a position vector in AR space
        const position = new THREE.Vector3(positionX, positionY, -1);

        // Get the camera's world position and direction
        const cameraPosition = new THREE.Vector3();
        const cameraDirection = new THREE.Vector3();
        camera.object3D.getWorldPosition(cameraPosition);
        camera.object3D.getWorldDirection(cameraDirection);

        // Project the position onto the camera's plane
        const distance = 2; // Distance from the camera
        const worldPosition = cameraPosition.clone()
          .add(cameraDirection.multiplyScalar(distance))
          .add(position.multiply(new THREE.Vector3(distance, distance, 0)));

        onDetection(prediction.class, `${worldPosition.x} ${worldPosition.y} ${worldPosition.z}`);
      }
    });

    requestAnimationFrame(detectObjects);
  }

  video.onloadedmetadata = () => {
    detectObjects();
  };
}