// src/components/ExerciseTracker.js

import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const ExerciseTracker = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [feedback, setFeedback] = useState("Start moving...");

  // 🧮 Basic arm raise logic
  const detectArmRaise = (landmarks) => {
    const leftWristY = landmarks[15].y;
    const leftShoulderY = landmarks[11].y;

    if (leftWristY < leftShoulderY) {
      setFeedback("Great! Arm Raised ✋");
    } else {
      setFeedback("Raise your arm higher ⬆️");
    }
  };

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 0,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.poseLandmarks) {
        drawConnectors(canvasCtx, results.poseLandmarks, Pose.POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 3,
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });

        // Call pose evaluation function
        detectArmRaise(results.poseLandmarks);
      }
    });

    if (
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null
    ) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div className="text-center mt-4">
      <h2 className="text-xl font-bold mb-2">Live Exercise Tracker</h2>
      <p className="text-green-600 font-semibold">{feedback}</p>
      <div className="relative inline-block">
        <video ref={videoRef} style={{ display: "none" }}></video>
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="border-2 border-black"
        ></canvas>
      </div>
    </div>
  );
};

export default ExerciseTracker;
