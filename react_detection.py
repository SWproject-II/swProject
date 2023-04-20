import io
from PIL import Image
from flask import Flask, request
from flask_cors import CORS
import yolov5

app = Flask(__name__)
CORS(app)

# load pretrained model
model = yolov5.load('games2.2.pt')


@app.route('/predict', methods=['POST'])
def predict():
    # convert the request data to an image
    file = request.files['image']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # perform inference
    results = model(img)

    # parse results
    pred = results.pandas().xyxy[0]
    names = []
    for index, row in pred.iterrows():
        names.append(row['name'])

    # log the predicted names
    print(names)

    results.show()

    # return the predicted bounding boxes as JSON
    return {'names': names}


if __name__ == '__main__':
    app.run(debug=True, port=5002)