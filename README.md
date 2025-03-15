# ZenNote 🧘‍♂️ – The Mindful Productivity & Note-Taking Web App  

ZenNote is a **web-based** note-taking and productivity tool designed to help users **stay focused, creative, and organized**. With built-in **To-Do Lists**, **Timers**, and **Lofi Music**, it creates a **distraction-free environment** to enhance deep work and mindfulness.  

 

### 🌍 Live Demo  
🚀 **Try ZenNote here:** [zen-note-sooty.vercel.app](https://zen-note-sooty.vercel.app)  
 <br/>
  <br/>

## 🌟 Inspiration Behind ZenNote  

I’ve always loved using **Notion** for note-taking, but I often found myself needing **more tools to stay fully focused**.  
During work or study sessions, a few essential things help me stay in the zone:  

- **A Timer** ⏳ – To be mindful of time and stay on track  
- **A To-Do List** ✅ – Inspired by **Microsoft To-Do**, which I use daily to plan my tasks  
- **Music for Focus** 🎵 – I always listen to **Spotify** while working  

Instead of switching between multiple apps, I thought, **why not combine everything into one place?**  
So I built **ZenNote** – a **unified productivity space** where you can:  
- See the **current time** to stay mindful  
- Use a **timer** to focus on tasks  
- Plan your **daily tasks with a to-do list**  
- Listen to **Lofi music with Spotify**  
- **Focus on one task at a time** with a distraction-free mode  

In the future, I plan to **optimize performance** and explore **better server choices**. But for now, I’m excited to share this with you all! 🚀  
 <br/>
 
 
## 📸 Screenshots
![Screenshot 2025-03-15 at 12 49 09 PM](https://github.com/user-attachments/assets/c2b54bb1-c925-47f8-927c-74aa3d015dad)
![Screenshot 2025-03-15 at 12 51 08 PM](https://github.com/user-attachments/assets/09edfb5a-a6fd-4e9f-951b-79f91f8c7b8e)

<p align="center">
  <img src="https://github.com/user-attachments/assets/3e477d63-4697-48b8-8892-f1c260854d3f" alt="Screenshot 2025-03-15 at 1 00 03 PM" width="59%" height="50%">
  <img src="https://github.com/user-attachments/assets/65312d76-c367-4d1f-8421-1b6040d8b49e" alt="Screenshot 2025-03-15 at 1 03 23 PM" width="29%"  height="40%">
</p>

 <br/>
  <br/>
 

## 👩🏻‍💻 Features  
 

### 📖 Note-Taking (Notion-like)  
✔️ **Rich Text Editor** – Block-based writing experience  
✔️ **Real-time Sync** – Access and edit notes anywhere  
✔️ **Hierarchical Notes** – Create **nested documents (child documents)** for structured note-taking  
✔️ **Publishing & Sharing** – Generate **public links** for notes so others can view, but **not edit or delete**  
✔️ **Markdown Support** – Write in markdown & auto-convert  
✔️ **Custom Emojis for Notes** – Just like in Notion, add **emojis** to personalize documents  
✔️ **Cover Images** – Set a **custom cover image** to visually organize notes  

### ✅ Productivity Tools  
✔️ **To-Do List** – Organize tasks efficiently  
✔️ **Focus Mode** – Minimal UI for deep work  
✔️ **Lofi Music Player** – Integrated with **Spotify API**  
✔️ **Playlist Selection & Shuffle** – Choose music for focus  
✔️ **Timer Feature** – Stay on track with **time awareness**  

### 🎨 UI & Theming  
✔️ **Dark Mode & Light Mode** – Seamless theme switching based on user preference  
✔️ **Minimal & Distraction-Free Design** – Clean UI to enhance focus  

### 🔐 Authentication & User Access  
✔️ **Login with GitHub** – Secure authentication with **Clerk**  
✔️ **User-Based Notes** – Each user’s documents & notes are private  
✔️ **Public Access Control** – Published notes are **read-only** for others  

 <br/>
 <br/>

## 🛠 Tech Stack  

### **Frontend**  
- **Framework**: Next.js (App Router) + TypeScript  
- **Styling**: Tailwind CSS  
- **State Management**: Zustand  
- **Editor**: BlockNote + ShadCN UI  
- **Icons & UI Components**: Radix UI, Lucide React, Sonner (Toasts)  

### **Backend & Services**  
- **Authentication**: Clerk  
- **Database**: Convex (real-time storage)  
- **File Storage**: Edgestore (or any service like **AWS S3**)  
- **Music Integration**: Spotify API  
- **Hosting & Deployment**: Vercel  
- **CI/CD**: GitHub Actions  
 

<br/>
<br/>


## 🔧 Setup & Installation  

### 1️⃣ Prerequisites  
Before running ZenNote, ensure you have:  
✔️ **Node.js (v18+)** installed  
✔️ **PNPM or Yarn** (Yarn Berry recommended)  
 <br/>
### 2️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/zennote.git
cd zennote
```
 <br/>
 
### 3️⃣ Install Dependencies 
```sh
pnpm install
```

 <br/>

### 4️⃣ Setup Environment Variables
Create a .env.local file in the root directory and add:
```sh
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=dev:brazen-wildebeest-194  

NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Storage (Edgestore or any other service like AWS S3)
EDGE_STORE_ACCESS_KEY=your_edgestore_access_key
EDGE_STORE_SECRET_KEY=your_edgestore_secret_key

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

```

🔹 Note: If you prefer, you can use AWS S3, Firebase Storage, or any other cloud storage instead of Edgestore. Just replace the integration in the project accordingly.
 
 <br/>

 
### 5️⃣ Run the Web App Locally
Create a .env.local file in the root directory and add:
```sh
pnpm dev
```
 <br/>
 
The local development server will start at http://localhost:3000
Log in using Clerk authentication
Start writing, managing your tasks, and listening to lofi music 🎵

 <br/>
 
🌍 Deploying ZenNote
ZenNote is optimized for Vercel. You can deploy with one command:

```sh
pnpm build && pnpm start
```

Alternatively, connect your GitHub repo to Vercel for automatic deployments.
For Convex, deploy using:
```sh
npx convex dev
```

  <br/>


## 📖 Deployment & Service Setup  

📌 **Using Convex with Vercel**  
Learn how to host your Convex app on Vercel and automatically redeploy when pushing code:  
🔗 [Convex + Vercel Setup Guide](https://docs.convex.dev/production/hosting/vercel)  

📌 **Clerk Authentication with Next.js**  
🔗 [Clerk Authentication Starter for Next.js](https://vercel.com/templates/next.js/clerk-authentication-starter)  

📌 **Edgestore & Next.js Setup**  
🔗 [Edgestore Quick Start Guide](https://edgestore.dev/docs/quick-start)  

 
 
 <br/> 
 <br/>



## 🔗 Links  
- **Live Demo**: [🔗 ZenNote on Vercel](https://zen-note-sooty.vercel.app)  
- **GitHub Repo**: [🔗 GitHub](https://github.com/Kumushai9919/ZenNote)  


 












