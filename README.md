# 📚 ShelfSync

> A modern, elegant, and simple **personal library tracking system** designed for students and book lovers.

---

## ✨ Overview

**ShelfSync** is a web-based library management system that helps users track, organize, and manage books efficiently.  
It provides a clean and intuitive interface for monitoring borrowed books, managing members, and keeping a digital record of your personal or school library.

Built with a **modern UI aesthetic (soft pink theme)** and a focus on usability, ShelfSync makes library management feel simple and enjoyable.

---

## 🚀 Features

### 📖 Book Management
- Add, edit, and delete books
- Track availability status
- Organize books by categories

### 👤 Member Management
- Manage library members
- Track borrowing history per user

### 📦 Borrowing System
- Borrow and return books
- Real-time status updates
- Prevent double borrowing

### 📊 Dashboard Overview
- Total books, borrowed books, and users
- Quick insights into library activity

### 🎨 Modern UI
- Soft pink aesthetic design
- Responsive layout (mobile + desktop)
- Smooth and clean user experience

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend/Auth:** Supabase
- **Database:** PostgreSQL (via Supabase)

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/shelfsync.git
cd shelfsync
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🔐 Authentication

ShelfSync uses **Supabase Auth** for:
- Email login
- Session management
- Secure logout

---

## 📁 Project Structure

```
/app
  /dashboard
  /books
  /borrowed-books
  /members
  /login
  /signup

/components
  Sidebar.tsx
  Navbar.tsx

/utils
  supabase/
```

---

## 🌸 UI Philosophy

ShelfSync is designed with:

- Soft pastel pink tones 🎀
- Glassmorphism effects ✨
- Clean typography 📖
- Minimal cognitive load 🧠
- Student-friendly UX 🎓

---

## 📌 Future Improvements

- Dark mode (pink neon theme 🌙)
- Book barcode scanner 📷
- AI-based book recommendations 🤖
- Email reminders for due books 📧
- Export library reports (PDF/Excel)

---

## 🤝 Contributing

1. Fork the project  
2. Create feature branch  
3. Commit changes  
4. Push branch  
5. Open Pull Request  

---

## 📄 License

This project is for educational and portfolio use.

---

## 💗 Author

ShelfSync Developer  
Built with Next.js + Supabase  
Designed with a soft pink modern UI aesthetic
