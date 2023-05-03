# 📜 About
Project for Software project 2 course at Haaga-Helia University of Applied Sciences | Spring 2023.

## ℹ️ Project cliffnotes
- Theme: computer vision implementation for facial recognition and board games
- Platform: React SPA frontend - Flask backend
- Use purpose: Board game reservations and returns using computer vision to authenticate person and board game
- Goals:
  - Develop teamwork skills
  - Expand knowledge and skills in:
    - Group projects (scrum)
    - Python/Flask
    - JavaScript/React
    - AI/ML
    - Various frameworks, libraries, and tools
    
 ### How it all started

When the first lecture of this course started, the team didn't have a particular project idea in mind. The team bounced around a few ideas, all of which were not appealing enough for the whole team. That was until a certain individual from the team suggested that we should make something that uses computer vision for facial recognition. With no particular end goal or product in mind, we agreed to proceed with the idea.

### Project description
This project is a proof of concept based idea of utilizing facial recognition and computer vision to handle board game reservations and returns in a small club, that being a student group in this instance. The end product serves as a use case model for similar implementations. While we do recognize the fact that this isn't something truly groundbreaking, we feel that we achieved our aforementioned goals.

## 📝 Documentation


### Built with
- React
- Flask

### Other significant technologies and tools used in the project
- Roboflow | Generating datasets for computer vision model
- YOLOv5 | Training the computer vision model

### Getting started
If you want to try this implementation out, proceed as follows:
- Clone this repository: `git clone https://github.com/SWproject-II/swProject.git`
- Create virtual environment in the root directory: `pip3 install virtualenv` and then `virtualenv env`
- Activate virtual environment:
  - Windows: `env\Scripts\activate.bat`
  - Mac/Linux: `source env/bin/activate`
- Install frontend related packages: `cd frontend` and then `npm install`
- Delete our database and create your own:
  - `cd.. ` - `cd instance` - `del database.db` - `cd..` - `python3 app.py`
 
 ℹ️ Note that using the virtual environment is optional; it allows the installation of required Python packages locally instead of globally.
 
 ### Required Python packages:
 - flask
 - flask-sqlalchemy
 - flask-cors
 - yolov5
 - pytz
 - Pillow
 
 Install with PIP: `pip3 install flask flask-sqlalchemy flask-cors yolov5 pytz Pillow`
 
 ### Final steps
 You need to train your own model to handle the computer vision implementation since using our models would not yield desirable results. You can do so by heading over to [Roboflow](https://www.roboflow.com). Quick overview of the process: you need to create a project, upload images for annotation, and label what is inside each annotation. For further information read Roboflow's [docs](https://docs.roboflow.com/).
 
Lastly, you need to train the model with YOLOv5 (if you are using the same technologies as we were). Our team used [this notebook](https://colab.research.google.com/github/roboflow-ai/yolov5-custom-training-tutorial/blob/main/yolov5-custom-training.ipynb#scrollTo=FwJcaoPGF4VI) for the training part. This generates a .pt file that functions as the model that is used for recognition. For further information and troubleshooting, check out the [YOLOv5 docs](https://docs.ultralytics.com/yolov5/).
 


## ⛏ Development team
- Ahokas Alisa | @Viktorialissa
- Haapaniemi Sauli | @zachvengenz
- Hemmi Pauli | @Tomeitous
- Hietamäki Aki | @AkiAleksi
- Lampio Jyri | @JyriLampio
