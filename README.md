# BIRADS CLASSIFIER

## Introduction
Breast cancer is the most commonly occurring cancer in women and the second most common cancer overall. Early diagnosis and treatment are particularly important in reducing the mortality rate. 
This project is focused on preventive medicine.

Currently, the only method for early detection of breast cancer that uses images is screening mammography. For it, a set of cranial-caudal (CC) and mediolateral-oblique (MLO) views for each breast of a patient are obtained and analysed.

This project aims to provide a high-sensitive and rapid early-stage breast cancer detection model. 
For it, the  [BI-RADS](https://breast-cancer.ca/bi-rads/) (Breast Imaging Reporting and Data System) is used.
**This project provides a webapp that integrates the model from the paper** ["High-resolution breast cancer screening with multi-view deep convolutional neural networks"](https://arxiv.org/abs/1703.07047). The implementation allows users to get the BI-RADS prediction by applying the pretrained CNN model on standard screening mammogram exam with four views.

## Virtual Enviroment

To create the virtual environment used in this project, you need to have installed anaconda. If you don't have it, you can download it in this [link](https://www.anaconda.com/download/).


Once this is done, the virtual environment can be created by using the *environment.yml* file, which contains all pip and conda dependencies' packages. To do:

 
`conda env create --file environment.yml`

 
Once the environment is created, to activate it do the following: 

 
`activate bcancer`

 
To deactivate it: 

 
`deactivate bcancer`

 
To update the environment with new dependencies:

 
`conda env update --file environment.yml`

 
Keep in mind that to update the environment it must be activated.

## Data

To use the pretrained model, the input is required to consist of four images, one for each view (L-CC, L-MLO, R-CC, R-MLO). Each image has to have the size of 2600x2000 pixels. The images in the provided sample exam were already cropped to the correct size.

## How to run the code

To run in your local computer run the file `main.py`. Then open your browser in `localhost:5000`. 
We also provide a Docker that can be used to deploy the model.


## Additional options

Additional flags can be provided to specify the settings to run the models without the web app:

* `--model-path`: path to a TensorFlow checkpoint or PyTorch pickle of a saved model. By default, this points to the saved model in this repository.
* `--device-type`: whether to use a CPU or GPU. By default, the CPU is used.
* `--gpu-number`: which GPU is used. By default, GPU 0 is used. (Not used if running with CPU)
* `--image-path`: path to saved images. By default, this points to the saved images in this repository. 

For example, to run this script using TensorFlow on GPU 2, run:

```bash
python birads_prediction_tf.py --device-type gpu --gpu-number 2
```

## Converting TensorFlow Models

This repository contains pretrained models in both TensorFlow and PyTorch. The model was originally trained in TensorFlow and translated to PyTorch using the following script:

```bash
python convert_model.py saved_models/model.ckpt saved_models/model.p
```

## Tests

Tests can be configured to your environment.

```bash
# Using TensorFlow, without GPU support
python test_inference.py --using tf

# Using PyTorch, without GPU support
python test_inference.py --using torch

# Using TensorFlow, with GPU support
python test_inference.py --using tf --with-gpu

# Using PyTorch, with GPU support
python test_inference.py --using torch --with-gpu
```
