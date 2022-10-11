from flask import Flask
from flask import request
from flask import render_template
from flask_cors import CORS
from tensorflow import keras
import numpy as np
from PIL import Image, ImageOps
import os
from urllib import request as urlreq
from io import BytesIO

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

app = Flask(__name__)
CORS(app)

@app.route('/')
def main_page(): 
    
    return render_template('input.html')


@app.route('/test', methods=["GET","POST"])
def test():
    value = request.form.get('input')
    
    msg = "input : %s " %value
    return msg

def img_load(url):

    res = urlreq.urlopen(url).read()
    
    img = Image.open(BytesIO(res)).convert('RGB')
    
    return img
    


def skin_dog_diagnosis(imgurl):

    print(imgurl)
    model = keras.models.load_model("./models/Dog_Skin_Model.h5") # 강아지 피부 모델 경로

    #예측시킬 이미지 데이터를 넣을 변수
    data = np.ndarray(shape=(1, 64, 64, 3), dtype=np.float32)  #모델 변경시 사이즈 조절

    #예측시킬 이미지 로딩
    image = img_load(imgurl)
    


    # 크롭 해 올 사이즈 정해서 (왼쪽,위,오른쪽,아래)
    image = image.crop((10,10,100,100)) 

    #똑같은 이미지 크기로 변경
    size = (64, 64)  #모델 변경시 사이즈 조절
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    #numpy 타입으로 변경
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

    # 불러운 numpy 타입의 이미지를 변수에 대입
    data[0] = normalized_image_array

    # 예측
    prediction = model.predict(data)
    return cut3(skin_dog_naming(prediction.astype(float).tolist()))

def eye_dog_diagnosis(imgurl):
    model = keras.models.load_model("./models/Dog_Eye_Model.h5") # 강아지 눈 모델 경로

    #예측시킬 이미지 데이터를 넣을 변수
    data = np.ndarray(shape=(1, 64, 64, 3), dtype=np.float32) 

    #예측시킬 이미지 로딩
    image = img_load(imgurl)
    #
    # 크롭 해 올 사이즈 정해서 (왼쪽,위,오른쪽,아래)
    image = image.crop((10,10,100,100)) 

    #똑같은 이미지 크기로 변경
    size = (64, 64)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    #numpy 타입으로 변경
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

    # 불러운 numpy 타입의 이미지를 변수에 대입
    data[0] = normalized_image_array

    # 예측
    prediction = model.predict(data)
    return cut3(eye_dog_naming(prediction.astype(float).tolist()))


def eye_cat_diagnosis(imgurl):
    model = keras.models.load_model("./models/Cat_Eye_Model.h5") # 고양이 안구 모델 경로

    #예측시킬 이미지 데이터를 넣을 변수
    data = np.ndarray(shape=(1, 32, 32, 3), dtype=np.float32) 

    #예측시킬 이미지 로딩
    image = img_load(imgurl)

    # 크롭 해 올 사이즈 정해서 (왼쪽,위,오른쪽,아래)
    image = image.crop((10,10,100,100)) 

    #똑같은 이미지 크기로 변경
    size = (32, 32)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    #numpy 타입으로 변경
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1

    # 불러운 numpy 타입의 이미지를 변수에 대입
    data[0] = normalized_image_array

    # 예측
    prediction = model.predict(data)
    return cut3(eye_cat_naming(prediction.astype(float).tolist()))


def skin_dog_naming(li):
    label = ['ds구진,플라크','ds비듬,각질,상피성잔고리','ds태선화,과다색소침착','ds농포,여드름','ds미란,궤양','ds결절,종괴']
    labeled = []
    for i in range(6):
        labeled.append([label[i],li[0][i]])
        
    return labeled
    
def eye_dog_naming(li):
    label = ['de결막염','de궤양성각막질환','de백내장','de비궤양성각막질환','de색소침착성각막염','de안검내반증','de안검염','de안검종양','de유루증','de핵경화']
    labeled = []
    for i in range(10):
        labeled.append([label[i],li[0][i]])
        
    return labeled

def eye_cat_naming(li):
    label = ['ce각막궤양','ce각막부골편','ce결막염','ce비궤양성각막염','ce안검염']
    labeled = []
    for i in range(5):
        labeled.append([label[i],li[0][i]])
        
    return labeled


@app.route('/ai/skin/dog', methods=["GET","POST"])
def ai_skin_dog():
    content = request.json
    imagepath = content['imagePath']
    return skin_dog_diagnosis(imagepath)

@app.route('/ai/eye/dog', methods=["GET","POST"])
def ai_eye_dog():
    content = request.json
    imagepath = content['imagePath']
    return eye_dog_diagnosis(imagepath)

@app.route('/ai/eye/cat', methods=["GET","POST"])
def ai_eye_cat():
    content = request.json
    imagepath = content['imagePath']
    return eye_cat_diagnosis(imagepath)

def cut3(lst):
    nlist = sorted(lst, key=lambda x:-x[1])
    print(nlist)
    return nlist[:3]


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5550)