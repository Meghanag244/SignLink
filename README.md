# SignLink: AI-Powered Sign Language Interpreter 🤟🗣️

## Bridging Communication Through Deep Learning

<img width="1470" alt="1" src="https://github.com/user-attachments/assets/dbcfce49-1c0c-4caa-b256-da9c4303314d" />

SignLink is an innovative web application designed to facilitate seamless communication between the deaf and hard-of-hearing community and the hearing world. Leveraging cutting-edge deep learning and computer vision, SignLink provides real-time sign language interpretation and text-to-sign conversion, aiming to foster a more inclusive and connected society.

<img width="1470" alt="9" src="https://github.com/user-attachments/assets/c9debf56-50b3-45fb-bb2d-cd6bb563ab03" />
![10](https://github.com/user-attachments/assets/4f468062-719a-4413-9333-32902af370df)
<img width="1454" alt="8" src="https://github.com/user-attachments/assets/7820370a-c2b1-4a2e-a71b-cf830be04474" />
<img width="1470" alt="6" src="https://github.com/user-attachments/assets/6102c42e-4b6d-4502-ba8b-a8c8ed3e6e42" />
<img width="1466" alt="7" src="https://github.com/user-attachments/assets/0b1aab7d-5a21-4b3a-b2a3-731bdd9a8842" />

---

## ✨ Features

*   **Live Interpreting (Sign to Text):** Real-time recognition of American Sign Language (ASL) gestures from webcam feed and conversion to text.
*   **Text Composer (Text to Sign):** Translate typed text into visual sign language animations, enabling hearing individuals to communicate with sign language users.
*   **Phrasebook:** A curated collection of common sign language phrases for learning and quick reference.
*   **Chat History:** Keep track of past interpreted conversations.
*   **Customizable Settings:** Personalize the application experience (e.g., webcam source, model sensitivity).
*   **Modern & Responsive UI:** A user-friendly and aesthetically pleasing interface designed for various devices.

<img width="1466" alt="2" src="https://github.com/user-attachments/assets/0f8fab9c-2a17-4baa-b8ab-f287c092d31b" />
<img width="1467" alt="3" src="https://github.com/user-attachments/assets/13d823b3-b341-4075-91bc-0216ce800f5a" />
<img width="1468" alt="4" src="https://github.com/user-attachments/assets/bd9d35a6-398d-4319-a2f8-03d534ce42c7" />
<img width="1468" alt="5" src="https://github.com/user-attachments/assets/d95448fe-0a16-4681-8fe0-2fa8163c2620" />

---

## 🚀 Getting Started

Follow these steps to get your SignLink project up and running locally.

### Prerequisites

Ensure you have the following installed:

*   Node.js (LTS version recommended)
*   npm (Node Package Manager) or yarn
*   Python 3.x (for potential backend/model training components, if applicable)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/Sign-Language-Interpreter-using-Deep-Learning-master.git
    cd Sign-Language-Interpreter-using-Deep-Learning-master
    ```

2.  **Navigate to the frontend directory and install dependencies:**
    ```bash
    cd signlink/frontend
    npm install
    # or yarn install
    ```

### Running the Application

1.  **Start the frontend development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```
    The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use).

### Model Setup

The current model `cnn_model_keras2.json` and its weights `group1-shard1of1.bin` are located in `signlink/frontend/public/models`.

**Important Note on Model Performance:**
The AI model's accuracy heavily relies on the consistency of image preprocessing between its training phase and live inference. This project currently uses a simplified hand segmentation pipeline in the frontend compared to advanced OpenCV methods typically used in Python for training. For optimal prediction performance, it is highly recommended to:

*   **Retrain the deep learning model** using data preprocessed with a pipeline that *exactly* matches the one implemented in `signlink/frontend/src/pages/LiveSigning.tsx`. This ensures the model is trained on the same type of input it receives during live detection.

---

## 🎨 UI & UX Improvements

We've completely overhauled the user interface to make SignLink more intuitive, modern, and enjoyable to use.

*   **Captivating Landing Page:** A brand new, visually engaging introduction to the application.
*   **Streamlined Dashboard:** A clear hub for accessing all core functionalities with a clean card-based layout.
*   **Responsive Navigation Bar:** Easy and consistent navigation across all pages, adaptable to various screen sizes.
*   **Dedicated About Us Page:** Learn more about the project's mission, vision, and the passionate team behind it.

---

## 📂 Project Structure

```
.
├── Code/                           # Python scripts (e.g., gesture creation, historical model training)
│   ├── create_gestures.py
│   └── ...
├── signlink/
│   ├── frontend/                   # React.js frontend application
│   │   ├── public/                 # Static assets (including TensorFlow.js models)
│   │   │   ├── models/
│   │   │   │   ├── cnn_model_keras2.json
│   │   │   │   └── group1-shard1of1.bin
│   │   │   └── ...
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/         # Reusable UI components (e.g., Navbar.tsx)
│   │   │   │   └── Navbar.tsx
│   │   │   ├── hooks/
│   │   │   ├── pages/              # Main application pages
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   ├── Dashboard.tsx   # Renamed from Home.tsx
│   │   │   │   ├── AboutUs.tsx
│   │   │   │   ├── LiveSigning.tsx
│   │   │   │   ├── TextComposer.tsx
│   │   │   │   └── ...
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── App.tsx             # Main application component & routing
│   │   │   └── main.tsx
│   │   └── ...
│   └── models/                     # Placeholder for other model-related assets
└── ...
```

---

## 🤝 Contributing

We welcome contributions to SignLink! If you have ideas for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (Note: You may need to create a LICENSE file if one doesn't exist).

---

## 🙏 Acknowledgements

*   Thanks to the open-source community for amazing libraries like React, TensorFlow.js, and Tailwind CSS.

---

![Stars](https://img.shields.io/github/stars/harshbg/Sign-Language-Interpreter-using-Deep-Learning.svg?style=social)
![Forks](https://img.shields.io/github/forks/harshbg/Sign-Language-Interpreter-using-Deep-Learning.svg?style=social)
![GitHub contributors](https://img.shields.io/github/contributors/harshbg/Sign-Language-Interpreter-using-Deep-Learning.svg)
![Language](https://img.shields.io/github/languages/top/harshbg/Sign-Language-Interpreter-using-Deep-Learning.svg)
[![GitHub](https://img.shields.io/github/license/harshbg/Sign-Language-Interpreter-using-Deep-Learning.svg)](https://choosealicense.com/licenses/mit)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fharshbg%2FSign-Language-Interpreter-using-Deep-Learning&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Demo](#demo)
* [Technologies and Tools](#technologies-and-tools)
* [Setup](#setup)
* [Process](#process)
* [Code Examples](#code-examples)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)

## General info

We wanted to make it easy for 70 million deaf people across the world to be independent of translators for there daily communication needs, so we designed the app to work as a personal translator 24*7 for the deaf people.

## Setup

* Use comand promt to setup environment by using install_packages.txt and install_packages_gpu.txt files. 
 
`pyton -m pip r install_packages.txt`

This will help you in installing all the libraries required for the project.

## Process

* Run `set_hand_histogram.py` to set the hand histogram for creating gestures. 
* Once you get a good histogram, save it in the code folder, or you can use the histogram created by us that can be found [here](https://github.com/harshbg/Sign-Language-Interpreter-using-Deep-Learning/blob/master/Code/hist).
* Add different variations to the captured gestures by flipping all the images by using `Rotate_images.py`.
* Run `load_images.py` to split all the captured gestures into training, validation and test set. 
* To view all the gestures, run `display_gestures.py` .
* Train the model using Keras by running `cnn_model_train.py`.
* Run `final.py`. This will open up the gesture recognition window which will use your webcam to interpret the trained American Sign Language gestures.  

## Code Examples

````
# Model Traiining using CNN

import numpy as np
import pickle
import cv2, os
from glob import glob
from keras import optimizers
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout
from keras.layers import Flatten
from keras.layers.convolutional import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.utils import np_utils
from keras.callbacks import ModelCheckpoint
from keras import backend as K
K.set_image_dim_ordering('tf')

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

def get_image_size():
	img = cv2.imread('gestures/1/100.jpg', 0)
	return img.shape

def get_num_of_classes():
	return len(glob('gestures/*'))

image_x, image_y = get_image_size()

def cnn_model():
	num_of_classes = get_num_of_classes()
	model = Sequential()
	model.add(Conv2D(16, (2,2), input_shape=(image_x, image_y, 1), activation='relu'))
	model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2), padding='same'))
	model.add(Conv2D(32, (3,3), activation='relu'))
	model.add(MaxPooling2D(pool_size=(3, 3), strides=(3, 3), padding='same'))
	model.add(Conv2D(64, (5,5), activation='relu'))
	model.add(MaxPooling2D(pool_size=(5, 5), strides=(5, 5), padding='same'))
	model.add(Flatten())
	model.add(Dense(128, activation='relu'))
	model.add(Dropout(0.2))
	model.add(Dense(num_of_classes, activation='softmax'))
	sgd = optimizers.SGD(lr=1e-2)
	model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
	filepath="cnn_model_keras2.h5"
	checkpoint1 = ModelCheckpoint(filepath, monitor='val_acc', verbose=1, save_best_only=True, mode='max')
	callbacks_list = [checkpoint1]
	#from keras.utils import plot_model
	#plot_model(model, to_file='model.png', show_shapes=True)
	return model, callbacks_list

def train():
	with open("train_images", "rb") as f:
		train_images = np.array(pickle.load(f))
	with open("train_labels", "rb") as f:
		train_labels = np.array(pickle.load(f), dtype=np.int32)

	with open("val_images", "rb") as f:
		val_images = np.array(pickle.load(f))
	with open("val_labels", "rb") as f:
		val_labels = np.array(pickle.load(f), dtype=np.int32)

	train_images = np.reshape(train_images, (train_images.shape[0], image_x, image_y, 1))
	val_images = np.reshape(val_images, (val_images.shape[0], image_x, image_y, 1))
	train_labels = np_utils.to_categorical(train_labels)
	val_labels = np_utils.to_categorical(val_labels)

	print(val_labels.shape)

	model, callbacks_list = cnn_model()
	model.summary()
	model.fit(train_images, train_labels, validation_data=(val_images, val_labels), epochs=15, batch_size=500, callbacks=callbacks_list)
	scores = model.evaluate(val_images, val_labels, verbose=0)
	print("CNN Error: %.2f%%" % (100-scores[1]*100))
	#model.save('cnn_model_keras2.h5')

train()
K.clear_session();

````

## Features
Our model was able to predict the 44 characters in the ASL with a prediction accuracy >95%.

Features that can be added:
* Deploy the project on cloud and create an API for using it.
* Increase the vocabulary of our model
* Incorporate feedback mechanism to make the model more robust
* Add more sign languages

