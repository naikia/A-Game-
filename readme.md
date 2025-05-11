# Naikia's Game

A web-based game built using **Next.js** that runs on **port 3000** by default.

This game features **platform generation**, with more exciting features coming soon!

## Features

- 🌐 Built with Next.js for high performance and scalability  
- 🕹️ Procedurally generated platforms  
- 🚧 More content and mechanics coming soon!

## Getting Started

To run this project locally or on a server, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/naikia/A-Game-.git
cd A-Game-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Install PM2 (if not already installed)

```bash
npm install -g pm2
```

### 5. Start the Game with PM2

```bash
pm2 start npm --name "NaikiasGame" -- start
```

Visit the game in your browser at [http://localhost:3000](http://localhost:3000) or https://your-hostname.tld:3000

---
Use nginx to proxy your game

```bash 
nano sudo nano /etc/nginx/sites-available/yourdomain.com
```
```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
```
```bash
nginx -t
```
If successful then do
```bash
systemctl restart nginx
```

---

## License

This project is licensed under the **Apache 2.0 License**.  
See the [LICENSE](https://www.apache.org/licenses/LICENSE-2.0) file for more details.

---

Made with ❤️ by [Naikia](https://github.com/naikia)
