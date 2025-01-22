# 🤖 Chatbot Setup Guide

This guide will help you set up and run the chatbot in a virtual environment.

## ⚡ Prerequisites
- ✅ Ensure you have Python installed (preferably Python 3.7 or later).
- ✅ Install `pip`, if not already installed.

## 🛠 Setting Up the Virtual Environment

1. **Navigate to the chatbot directory:**
   ```sh
   cd path/to/chatbot
   ```

2. **Install virtualenv:**
   ```sh
   pip install virtualenv
   ```

3. **Create a virtual environment:**
   ```sh
   virtualenv chatBotEnv
   ```

4. **Activate the virtual environment:**
   
   - **🖥 Windows (Command Prompt):**
     ```sh
     cd chatBotEnv\Scripts
     activate
     ```
   
   - **💻 Windows (PowerShell):**
     ```sh
     cd chatBotEnv\Scripts
     .\Activate.ps1
     ```
   
   - **🐧 Mac/Linux:**
     ```sh
     source chatBotEnv/bin/activate
     ```

   - terminal will change like this
   ```bash
    C:\Users\.....\Univate\chatBot\chatBotEnv\Scripts>activate

    '(chatBotEnv)' C:\Users\.....\Univate\chatBot\chatBotEnv\Scripts>
    ```

5. **Navigate back to the chatbot directory:**
   ```sh
   cd ../..
   ```

6. **Install dependencies from `requirements.txt`:**
   ```sh
   pip install -r requirements.txt
   ```

## 🔑 Setting Up Environment Variables

1. **Create a `.env` file** in the chatbot directory.
2. **Add the following line** to the `.env` file:
   ```sh
   MONGO_URI=your_mongo_connection_string
   GOOGLE_API_KEY=your_api_key
   ```
3. **Paste any required API keys** in the `.env` file as needed.

## 🚀 Running the Chatbot Server

Once the virtual environment is activated and dependencies are installed, run the chatbot server using:
```sh
python app.py
```

🎉 Your chatbot should now be up and running!

## 🛑 Stopping the Server
To stop the chatbot server, press:
```sh
Ctrl + C
```

## 🔄 Deactivating the Virtual Environment
To exit the virtual environment, run:
```sh
deactivate
```
## 🚀 Quick Start (For Returning Users)

1. **Activate the virtual environment:**
   
   - **🖥 Windows (Command Prompt):**
     ```sh
     cd chatBotEnv\Scripts
     activate
     ```
   
   - **💻 Windows (PowerShell):**
     ```sh
     cd chatBotEnv\Scripts
     .\Activate.ps1
     ```
   
   - **🐧 Mac/Linux:**
     ```sh
     source chatBotEnv/bin/activate
     ```

2. **Navigate back to the chatbot directory:**
   ```sh
   cd ../..
   ```

3. **Run the chatbot server:**
   ```sh
   python app.py
   ```


