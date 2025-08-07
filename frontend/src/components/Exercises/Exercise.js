// frontend/src/components/Exercises/Exercise.js

import React, { useRef, useState, useEffect } from 'react';
import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import './Exercise.css';

const Exercise = () => {
    // Refs for the video and canvas elements
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // State variables
    const [poseLandmarker, setPoseLandmarker] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPoseDetected, setIsPoseDetected] = useState(false);
    const [sessionKeypoints, setSessionKeypoints] = useState([]);
    const [isSessionActive, setIsSessionActive] = useState(false);

    // Load the MediaPipe Pose model and set up webcam
    useEffect(() => {
        const initializeMediaPipe = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
                );
                const landmarker = await PoseLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy.task`
                    },
                    runningMode: "VIDEO",
                    numPoses: 1
                });
                setPoseLandmarker(landmarker);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load MediaPipe Pose Landmarker:", error);
                setIsLoading(false);
            }
        };

        const setupWebcam = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("Your browser does not support webcam access.");
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        initializeMediaPipe();
        setupWebcam();
    }, []);

    // Main animation loop for pose detection and visualization
    useEffect(() => {
        if (!poseLandmarker || !isSessionActive) return;

        let lastVideoTime = -1;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const detectPose = () => {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            canvas.width = videoWidth;
            canvas.height = videoHeight;

            // Only run detection if the video stream is ready
            if (video.readyState === 4 && lastVideoTime !== video.currentTime) {
                lastVideoTime = video.currentTime;
                
                // Perform pose detection
                const results = poseLandmarker.detectForVideo(video, performance.now());
                
                // Clear the canvas and draw video frame
                ctx.clearRect(0, 0, videoWidth, videoHeight);
                ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

                if (results.landmarks && results.landmarks.length > 0) {
                    const keypoints = results.landmarks[0];
                    setIsPoseDetected(true);
                    
                    // Store keypoints if session is active
                    setSessionKeypoints(prevKeypoints => [...prevKeypoints, keypoints]);
                    
                    // Draw the skeleton and landmarks
                    drawConnectors(ctx, keypoints, PoseLandmarker.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
                    drawLandmarks(ctx, keypoints, { color: '#FF0000', lineWidth: 2 });
                } else {
                    setIsPoseDetected(false);
                }
            }

            animationFrameId = requestAnimationFrame(detectPose);
        };

        video.addEventListener('loadeddata', detectPose);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            video.removeEventListener('loadeddata', detectPose);
        };

    }, [poseLandmarker, isSessionActive]);

    const startSession = () => {
        setIsSessionActive(true);
        setSessionKeypoints([]);
    };

    const endSession = async () => {
        setIsSessionActive(false);
        // Here you would send 'sessionKeypoints' to your Django backend
        console.log("Session Ended! Collected Keypoints:", sessionKeypoints);
        // Replace with actual API call
        // await sendSessionDataToBackend(childId, exerciseName, sessionKeypoints);
    };

    // Helper functions to draw landmarks and connections
    const drawConnectors = (ctx, landmarks, connections, style) => {
        ctx.strokeStyle = style.color;
        ctx.lineWidth = style.lineWidth;
        for (const connection of connections) {
            const start = landmarks[connection[0]];
            const end = landmarks[connection[1]];
            ctx.beginPath();
            ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
            ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
            ctx.stroke();
        }
    };

    const drawLandmarks = (ctx, landmarks, style) => {
        ctx.fillStyle = style.color;
        for (const landmark of landmarks) {
            ctx.beginPath();
            ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, style.lineWidth, 0, 2 * Math.PI);
            ctx.fill();
        }
    };

    return (
        <div className="exercise-container">
            {isLoading ? (
                <div className="loading-screen">Loading MediaPipe...</div>
            ) : (
                <>
                    <h1>Gamified Exercise</h1>
                    <div className="video-and-canvas-container">
                        <video ref={videoRef} className="input-video"></video>
                        <canvas ref={canvasRef} className="output-canvas"></canvas>
                        {!isPoseDetected && isSessionActive && (
                            <div className="no-pose-overlay">No pose detected! Please stand in view of the camera.</div>
                        )}
                    </div>
                    <div className="controls">
                        {!isSessionActive ? (
                            <button onClick={startSession} className="control-btn">Start Exercise</button>
                        ) : (
                            <button onClick={endSession} className="control-btn end-btn">End Session</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Exercise;