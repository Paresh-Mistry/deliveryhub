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
- 🚀 [FastAPI](https://fastapi.tiangolo.com/) / Next.js API routes  
- 💾 [PostgreSQL](https://www.postgresql.org/) for relational data  
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
