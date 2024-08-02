import * as THREE from 'three';
import 'aframe';
import './ar-scene';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { initObjectDetection } from './object-detection';
import { initModelReplacement, replaceObject } from './model-replacement';

let model;

async function init() {
    const sceneEl = document.querySelector('a-scene');
    const camera = document.querySelector('a-camera');
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('output');

    // Load COCO-SSD model
    model = await cocoSsd.load();
    console.log('COCO-SSD model loaded');

    initModelReplacement(sceneEl);
    initObjectDetection(sceneEl, camera, model, video, canvas, (objectType, position) => {
        replaceObject(objectType, position, sceneEl);
    });
}

init();