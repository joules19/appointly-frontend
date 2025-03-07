## ⚠️ Notice  
This application is best run offline (Only the React app, the backend API has been deployed and works without problems). Please follow the installation steps below to set it up locally. If accessing online, reset the URL address before proceeding or remove 'login' from the URL. Due to hosting provider limitations, some unexpected behaviors may occur.  

---

# Appointly Frontend Setup Instructions  

### 1. **Clone the Repository**  

Run the following command to clone the repository:  

```bash
git clone https://github.com/joules19/appointly-frontend.git
cd appointly-frontend
```

### 2. **Install Dependencies**

Make sure you have Node.js installed, then run:

```bash
npm install
```

### 3. **Start the Development Server**

```bash
npm run dev
```

If you encounter permission issues, try running:

```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

Then, try running npm run dev again.

```bash
npm run dev
```


