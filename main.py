import yolov5
import cv2

# load pretrained model
model = yolov5.load('face1.4.pt')

# Create a window to display the webcam feed
cv2.namedWindow("Webcam")

# Start the webcam
cap = cv2.VideoCapture(0)

# Continuously capture video frames until the "p" key is pressed
while True:
    # Capture a frame from the webcam
    ret, frame = cap.read()

    # Display the frame in the window
    cv2.imshow("Webcam", frame)

    # Check if the "p" key is pressed
    key = cv2.waitKey(1) & 0xFF
    if key == ord("p"):
        # Save the frame to a file
        cv2.imwrite("webcam_photo.jpg", frame)
        print("Photo saved.")
        break

# Release the webcam
cap.release()

# Close the window
cv2.destroyAllWindows()
# set image
img = 'webcam_photo.jpg'

# perform inference
results = model(img)

# inference with larger input size
results = model(img, size=1280)

# inference with test time augmentation
results = model(img, augment=True)

# parse results
predictions = results.pred[0]
boxes = predictions[:, :4]  # x1, y1, x2, y2
scores = predictions[:, 4]
categories = predictions[:, 5]

print(results.pandas().xyxy[0])

pred = results.pandas().xyxy[0]
names = []
for index, row in pred.iterrows():
    names.append(row['name'])

print(names)

# show detection bounding boxes on image
results.show()
# save results into "results/" folder
# results.save(save_dir='')