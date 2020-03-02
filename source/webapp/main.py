#!/usr/bin/env python
from flask import Flask, request
from flask_cors import CORS, cross_origin
import tensorflow as tf
import models_tf as models
import utils
import os
import json
import urllib
import cv2
import PIL
import uuid
import numpy as np
import imutils
from birads_prediction_tf import inference

def save_file (nparray,filename):
  image = PIL.Image.fromarray(nparray)
  filepath = "./static/img/test/{}".format(filename)
  image.save(filepath)
  return filename

def classify(names):

  parameters_ = {
    "model_path": "saved_models/model.ckpt",
    "device_type": "cpu",
    "gpu_number": 0,
    "image_path": "static/img/test/",
    "input_size": (2600, 2000),
  }

  prediction_birads = inference(parameters_, names)
  final_results = prediction_birads.tolist()
  return json.dumps(final_results, separators=(',', ':'), sort_keys=True, indent=4)

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/js/<path:path>')
def send_js(path):
  return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
  return send_from_directory('css', path)

def allowed_file(filename):
    allowed_extensions = set(['png', 'jpg', 'jpeg', 'bmp'])
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/api/v1/classify', methods=['POST'])
def classifyOnPost():
  names = []
  for input_file in request.files.getlist('file'):
    filestr = input_file.read()
    npimg = np.fromstring(filestr, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    names.append(save_file(rgb_img,input_file.filename))

  return classify(names)

if __name__ == "__main__":
  app.run(host='0.0.0.0')