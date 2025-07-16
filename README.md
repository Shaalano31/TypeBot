# Setup Instructions

## 1. Docker:

1. Update .env file with needed creditentials

- Visit https://docs.typebot.io/self-hosting/configuration and follow the steps in the Google Auth section

2. Open up cmd in the directory and execute the following command to build and run Typebot.

```bash
docker-compose up -d --build
```

- After everything is done, it should be accessed through http://localhost:8080
- You will be asked to login with your Gmail Account
- Create any TypeBot

NOTE: To shut down the docker execute the following

```bash
docker-compose down
```

## 2. React:

- In the react directory execute the following

```bash
npm install #Ensures all dependencies are installed
npm start
```

The website should be accessed through http://localhost:3000

## 3. Flask

- In the flask directory execute the following

```bash
#Create a virtual environment
python -m venv venv
source venv/bin/activate      # On macOS/Linux
venv\Scripts\activate         # On Windows

#install all needed libraries
pip install -r requirements.txt

flask run
```

The server should be accessed through http://localhost:5000

## Login

- Hard-coded login is accessed through the following
  Email: test@example.com
  Password: 123456
