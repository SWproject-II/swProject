import cv2
import os

# The directory where the images are located
directory = 'images'

# The directory where the images will be saved
path = '/home/jyri/Documents/Projects/ohjelmistoprojekti2/opencv/results'

i = 0
#Loops the directory
for filename in os.listdir(directory):
    f = os.path.join(directory, filename)
    # checking if it is a file
    if os.path.isfile(f):
        print(f)
        # Read the input image
        img = cv2.imread(f)
        # Convert into grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # Load the Cascade
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        # face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt2.xml')
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        # Draw rectangle around the faces and crop the faces
        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
            faces = img[y:y + h, x:x + w]
            # Crops the face only and gives it a name "face{i}"
            cv2.imwrite(os.path.join(path, f'face{i}.jpg'), faces)

        # Draws the circle to the face of the original picture and gives it a name "Detected{i}"
        cv2.imwrite(os.path.join(path,  f'detected{i}.jpg'), img)
        i += 1