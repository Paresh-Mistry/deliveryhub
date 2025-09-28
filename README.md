# 🚚 DeliveryHub – Smart Order & Partner Management Platform

DeliveryHub is a modern **delivery management system** designed to connect businesses, partners, and customers in a **transparent and scalable way**.  
It offers **real-time order tracking, partner assignment, socket-based updates, and map integration** — built with cutting-edge technologies like **Next.js, FastAPI, and WebSockets**.

---

## ✨ Features

- 📦 **Order Management** – Create, assign, and track orders in real time  
- 👨‍🔧 **Partner Dashboard** – Partners can accept, reject, or complete orders  
- 🔔 **Live Updates** – Powered by **Socket.IO** for instant notifications  
- 🗺️ **Map Integration** – Visualize deliveries using **Leaflet/Mapbox**  
- 🔐 **Auth & Roles** – Secure login for Partners  
- 🛠️ **Scalable Architecture** – Built with modular design and reusable contexts  
- 🌐 **Responsive UI** – Tailored for desktop and mobile users  

---

## 🏗️ Tech Stack

### Frontend
- ⚛️ [Next.js](https://nextjs.org/) (App Router, Server Actions, Client Components)  
- 🎨 [Tailwind CSS](https://tailwindcss.com/) (Utility-first styling)  
- 📡 [SWR](https://swr.vercel.app/) for efficient data fetching & caching  
- 🗺️ [React Leaflet](https://react-leaflet.js.org/) / [Mapbox](https://www.mapbox.com/) for maps  
- 🔔 [Socket.IO Client](https://socket.io/) for real-time updates  

### Backend
- 🚀 [Express](https://fastapi.tiangolo.com/) / Next.js API routes  
- 🍃 [MongoDB](https://www.mongodb.com/) for flexible partner/order history  
- 🔌 [Socket.IO](https://socket.io/) for WebSockets  

### DevOps / Tools
- 🔑 JWT + HttpOnly Cookies for authentication  
- 🧹 ESLint + Prettier for clean code  

---
# 📂 Video Link 

[Assignment Video](https://drive.google.com/file/d/1kNoA8hMgYKf1udzdGSmAy4nGpShH1D5X/view?usp=drive_link)
---

# 📂 Project Structure

deliveryhub/ </br>
│── app/          </br> 
&nbsp;&nbsp;│── api/          </br> 
&nbsp;&nbsp;│── admin/          </br> 
&nbsp;&nbsp;│── auth/          </br> 
&nbsp;&nbsp;│── dashboard/          </br> 
&nbsp;&nbsp;│── middleware/          </br> 
│── components/   </br>
│── context/      </br>
│── lib/          </br>
│── public/       </br>
│── types/       </br>
│── fonts/       </br>
│── styles/       </br>
│── .env          </br>


---
# 📂 Project Structure

<img width="1917" height="867" alt="image" src="https://github.com/user-attachments/assets/23fe52f7-f1ae-429c-878e-6300ebcf97d9" />
<img width="1917" height="870" alt="image" src="https://github.com/user-attachments/assets/a5f12746-1f6d-4c0b-9db4-f9df69c2bd28" />
<img width="1917" height="865" alt="image" src="https://github.com/user-attachments/assets/54f5febe-e2cf-4cb2-8c4e-c991b10d77eb" />
<img width="1902" height="872" alt="image" src="https://github.com/user-attachments/assets/85072add-4f80-4d3e-8610-fb7ea69f9678" />
<img width="1898" height="867" alt="image" src="https://github.com/user-attachments/assets/3facd68e-d120-4689-910c-b58901006f11" />
<div align="center">
<img width="542" height="861" alt="image" src="https://github.com/user-attachments/assets/f1bba65a-8f19-423a-8f7a-55f958e4940d" />
<img width="570" height="863" alt="image" src="https://github.com/user-attachments/assets/c6e5ddb2-813c-4730-9b64-f81274670e64" />
</div>

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/deliveryhub.git
cd deliveryhub
```
# Run Project

### 1️⃣ Package / Libraries Install using Bun
```bash
bun add <package-name>

bun add <package-name> --dev
```

### 📦 Build & Production

```bash 
bun run build
```

### ⚡ Run development server

```bash 
bun dev
```

# 🔑 Environment Variables

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_MAPBOX_API_KEY=your_mapbox_key
```

# 📜 License

> MIT License © 2025 DeliveryHub
