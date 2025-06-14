import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useNavigate } from 'react-router-dom';

// Helper functions for Gaussian Blur kernel generation
function get1dGaussianKernel(sigma: number, size: number): tf.Tensor1D {
  return tf.tidy(() => {
    const x = tf.range(Math.floor(-size / 2) + 1, Math.floor(size / 2) + 1);
    const xSquared = x.pow(2);
    const exponent = xSquared.div(-2.0 * (sigma * sigma));
    let kernel = tf.exp(exponent) as tf.Tensor1D;
    kernel = kernel.div(tf.sum(kernel));
    return kernel;
  });
}

function get2dGaussianKernel(size: number, sigma?: number): tf.Tensor2D {
  return tf.tidy(() => {
    // Default sigma calculation similar to OpenCV for ksize
    const actualSigma = sigma !== undefined ? sigma : (0.3 * ((size - 1) * 0.5 - 1) + 0.8);
    const kernel1d = get1dGaussianKernel(actualSigma, size);
    return tf.outerProduct(kernel1d, kernel1d) as tf.Tensor2D;
  });
}

function getGaussianKernel(size = 5, sigma?: number): tf.Tensor4D {
  return tf.tidy(() => {
    const kernel2d = get2dGaussianKernel(size, sigma);
    // For grayscale input (1 channel), kernel needs shape [size, size, 1, 1]
    const kernel3d = kernel2d.expandDims<tf.Tensor3D>(2); // [size, size, 1]
    return kernel3d.expandDims<tf.Tensor4D>(3); // [size, size, 1, 1]
  });
}

// Helper function to convert RGB to HSV using TensorFlow.js
const rgbToHsvTensor = (rgbTensor: tf.Tensor3D): tf.Tensor3D => {
  return tf.tidy(() => {
    const r = rgbTensor.slice([0, 0, 0], [-1, -1, 1]).div(255.0) as tf.Tensor3D; // [H, W, 1]
    const g = rgbTensor.slice([0, 0, 1], [-1, -1, 1]).div(255.0) as tf.Tensor3D; // [H, W, 1]
    const b = rgbTensor.slice([0, 0, 2], [-1, -1, 1]).div(255.0) as tf.Tensor3D; // [H, W, 1]

    const max = tf.max(tf.stack([r, g, b], -1), -1, true) as tf.Tensor3D; // Shape [H, W, 1]
    const min = tf.min(tf.stack([r, g, b], -1), -1, true) as tf.Tensor3D; // Shape [H, W, 1]
    const delta = max.sub(min) as tf.Tensor3D; // Shape [H, W, 1]

    // Ensure constant tensors have the same shape as delta for type consistency in tf.where
    const zerosLikeDelta = tf.zerosLike(delta);
    const sixLikeDelta = tf.fill(delta.shape, 6.0);
    const twoLikeDelta = tf.fill(delta.shape, 2.0);
    const fourLikeDelta = tf.fill(delta.shape, 4.0);

    // Hue calculation (scaled to 0-180 for OpenCV H range)
    const h = tf.where(tf.equal(delta, 0), zerosLikeDelta,
      tf.where(tf.equal(max, r), g.sub(b).div(delta).add(tf.where(g.less(b), sixLikeDelta, zerosLikeDelta)),
      tf.where(tf.equal(max, g), b.sub(r).div(delta).add(twoLikeDelta),
      r.sub(g).div(delta).add(fourLikeDelta)))
    ).mul(30) as tf.Tensor3D;

    // Saturation calculation (scaled to 0-255)
    const s = tf.where(tf.equal(max, 0), zerosLikeDelta, delta.div(max)).mul(255) as tf.Tensor3D;

    // Value calculation (scaled to 0-255)
    const v = max.mul(255) as tf.Tensor3D;

    return tf.concat([h, s, v], -1) as tf.Tensor3D; // Should be [H, W, 3] which is Tensor3D
  });
};

export const LiveSigning = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [prediction, setPrediction] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [histData, setHistData] = useState<number[] | null>(null);
  const navigate = useNavigate();

  // Define ROI constants, mirroring create_gestures.py
  const ROI_X = 300;
  const ROI_Y = 100;
  const ROI_WIDTH = 300;
  const ROI_HEIGHT = 300;

  useEffect(() => {
    const loadModelAndHist = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/models/cnn_model_keras2.json');
        setModel(loadedModel);

        const response = await fetch('/hist_data.json');
        const histJson = await response.json();
        setHistData(histJson);

        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading model or hist data:', error);
      }
    };

    loadModelAndHist();
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const detectSign = async () => {
      if (!model || !videoRef.current || !canvasRef.current || !histData) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Ensure video dimensions are valid before proceeding
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        requestAnimationFrame(detectSign); // Re-schedule if dimensions are not ready
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Moved the entire processing logic inside tf.tidy and made it return the processed tensor
      const processedTensor: tf.Tensor4D = tf.tidy(() => {
        const imageData = ctx.getImageData(ROI_X, ROI_Y, ROI_WIDTH, ROI_HEIGHT);
        const inputTensor = tf.browser.fromPixels(imageData).asType('float32');

        const hsvTensor = rgbToHsvTensor(inputTensor);

        const lower_skin_h = tf.scalar(0);
        const upper_skin_h = tf.scalar(25);
        const lower_skin_s = tf.scalar(20);
        const upper_skin_s = tf.scalar(150);
        const lower_skin_v = tf.scalar(80);
        const upper_skin_v = tf.scalar(255);

        const h_channel = hsvTensor.slice([0, 0, 0], [-1, -1, 1]) as tf.Tensor3D;
        const s_channel = hsvTensor.slice([0, 0, 1], [-1, -1, 1]) as tf.Tensor3D;
        const v_channel = hsvTensor.slice([0, 0, 2], [-1, -1, 1]) as tf.Tensor3D;

        const hue_mask = h_channel.greaterEqual(lower_skin_h).logicalAnd(h_channel.lessEqual(upper_skin_h));
        const sat_mask = s_channel.greaterEqual(lower_skin_s).logicalAnd(s_channel.lessEqual(upper_skin_s));
        const val_mask = v_channel.greaterEqual(lower_skin_v).logicalAnd(v_channel.lessEqual(upper_skin_v));

        const skin_mask = hue_mask.logicalAnd(sat_mask).logicalAnd(val_mask).asType('float32') as tf.Tensor3D;

        const grayscaleInput = inputTensor.mean(2, true) as tf.Tensor3D;
        const maskedTensor = grayscaleInput.mul(skin_mask) as tf.Tensor3D;

        // Apply Gaussian Blur similar to OpenCV for smoothing the mask
        const kernelSize = 11; // Corresponds to (11,11) in OpenCV GaussianBlur
        const sigma = 2.0; // Calculated for 11x11 kernel
        const gaussianKernel = getGaussianKernel(kernelSize, sigma);

        // tf.conv2d expects [batch, H, W, in_channels] for input and [filter_H, filter_W, in_channels, out_channels] for kernel
        // maskedTensor is [H, W, 1], so expandDims(0) to make it [1, H, W, 1]
        const blurredMaskedTensor = tf.conv2d(maskedTensor.expandDims(0), gaussianKernel, 1, 'same').squeeze<tf.Tensor3D>() as tf.Tensor3D;

        // Get non-zero indices for bounding box calculation. tf.where with one argument returns indices.
        const booleanMask2D = blurredMaskedTensor.greater(0).squeeze<tf.Tensor2D>();
        const nonZeroIndices = tf.where(booleanMask2D);

        // Define a dummy tensor for cases where no hand is detected or cropped area is invalid
        const dummyTensor = tf.zeros([1, 50, 50, 1]) as tf.Tensor4D; // Explicitly cast to Tensor4D

        if (nonZeroIndices.shape[0] === 0) {
          return dummyTensor; // Return a dummy tensor if no skin pixels detected
        }

        const yCoords = nonZeroIndices.slice([0, 0], [-1, 1]);
        const xCoords = nonZeroIndices.slice([0, 1], [-1, 1]);

        const minY = tf.min(yCoords).arraySync() as number;
        const maxY = tf.max(yCoords).arraySync() as number;
        const minX = tf.min(xCoords).arraySync() as number;
        const maxX = tf.max(xCoords).arraySync() as number;

        const padding = 10;
        const finalMinY = Math.max(0, minY - padding);
        const finalMaxY = Math.min(ROI_HEIGHT, maxY + padding);
        const finalMinX = Math.max(0, minX - padding);
        const finalMaxX = Math.min(ROI_WIDTH, maxX + padding);

        const croppedHeight = finalMaxY - finalMinY;
        const croppedWidth = finalMaxX - finalMinX;

        if (croppedWidth <= 0 || croppedHeight <= 0) {
          return dummyTensor; // Return a dummy tensor if cropped area is invalid
        }

        let croppedTensor = blurredMaskedTensor.slice([finalMinY, finalMinX, 0], [croppedHeight, croppedWidth, 1]) as tf.Tensor3D;

        // Make the cropped tensor square by padding, similar to cv2.copyMakeBorder
        let squarePaddedTensor: tf.Tensor3D;
        if (croppedWidth > croppedHeight) {
          const pad = Math.floor((croppedWidth - croppedHeight) / 2);
          // Pad top and bottom
          squarePaddedTensor = tf.pad(croppedTensor, [[pad, croppedWidth - croppedHeight - pad], [0, 0], [0, 0]], 0) as tf.Tensor3D;
        } else if (croppedHeight > croppedWidth) {
          const pad = Math.floor((croppedHeight - croppedWidth) / 2);
          // Pad left and right
          squarePaddedTensor = tf.pad(croppedTensor, [[0, 0], [pad, croppedHeight - croppedWidth - pad], [0, 0]], 0) as tf.Tensor3D;
        } else {
          squarePaddedTensor = croppedTensor; // Already square
        }

        const finalTensor = squarePaddedTensor.resizeBilinear([50, 50])
                                         .expandDims(0) // Add batch dimension
                                         .expandDims(-1) // Add channel dimension (for grayscale)
                                         .div(255.0) as tf.Tensor4D; // Explicitly cast to Tensor4D
        return finalTensor;
      }) as tf.Tensor4D; // Explicitly cast the return of tf.tidy to Tensor4D

      // Check if the returned tensor is the dummy tensor (indicating no hand)
      const isDummyTensor = processedTensor.sum().arraySync() === 0; // Check if all elements are zero

      if (isDummyTensor) {
        processedTensor.dispose(); // Dispose the dummy tensor itself as it's not used for prediction
        animationFrameId = requestAnimationFrame(detectSign);
        return;
      }

      const prediction = model.predict(processedTensor) as tf.Tensor;
      const scores = Array.from(prediction.dataSync()); // Convert TypedArray to number[]
      const maxScore = Math.max(...scores as number[]);
      const predictedClass = scores.indexOf(maxScore);

      setPrediction(getSignFromClass(predictedClass));
      setConfidence(maxScore * 100);

      prediction.dispose();
      processedTensor.dispose(); // Dispose processedTensor after prediction

      // Continue detection loop
      animationFrameId = requestAnimationFrame(detectSign);
    };

    if (!isModelLoading && histData) {
      detectSign();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [model, isModelLoading, histData]);

  const getSignFromClass = (classIndex: number): string => {
    // Map class indices to sign language gestures
    const signs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    return signs[classIndex] || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Live Sign Detection
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>

        {isModelLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600 dark:text-gray-300">
              Loading sign detection model...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg shadow-lg"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ display: 'none' }}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Detected Sign
                  </h2>
                  <div className="text-5xl font-bold text-blue-600">{prediction}</div>
                </div>

                <div className="mt-6">
                  <p className="text-lg font-semibold text-gray-700">Confidence</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                         style={{ width: `${confidence / 100}%` }}></div>
                  </div>
                  <p className="text-lg font-medium text-gray-800 mt-2">{confidence}%</p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate('/text-composer')}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send as Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 