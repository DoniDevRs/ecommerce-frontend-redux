# 🛍️ Shop Clothing — React E-commerce (Redux + Firebase)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router_DOM-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![RTL](https://img.shields.io/badge/React_Testing_Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)

---

**Shop Clothing** is a fully functional E-commerce application built with React.  
It demonstrates real-world concepts such as component architecture, Redux Toolkit, Firebase Authentication, React Router navigation, automated testing, and clean code practices.

---

## 🚀 Technologies Used
- **React**
- **Redux Toolkit**
- **Firebase Authentication**
- **React Router DOM**
- **JavaScript (ES6+)**
- **CSS Modules**
- **Jest**
- **React Testing Library**

---

## 🧠 Key React Concepts Demonstrated

### 🔹 1. Advanced Component Architecture
- Reusable UI components  
- Clear separation of UI and business logic  
- Props-driven, maintainable design  
- Scalable folder structure  

---

### 🔹 2. Global State Management (Redux Toolkit)
Handles:
- Cart items  
- Total price calculations  
- Authenticated user state  

Store includes:
- cartSlice.js  
- userSlice.js  
- index.js  

---

### 🔹 3. Firebase Authentication
- Create account  
- Login  
- Logout  
- Persistent sessions  
- Auth-based redirects  

---

### 🔹 4. Navigation with React Router DOM
- Public routes  
- Private/protected routes  
- Dynamic pages:  
  - `/category/:id`  
  - `/product/:id`  

Hooks used: **useNavigate**, **useParams**

---

### 🔹 5. Extensive Use of React Hooks
- useState  
- useEffect  
- useSelector  
- useDispatch  
- useNavigate  
- useParams  

---

### 🔹 6. Clean Code & Best Practices
- Single-responsibility components  
- Pure reducer functions  
- Consistent naming  
- Organized modules  
- Minimal CSS  

---

## 🛒 E-commerce Features
- Browse categories  
- View products by category  
- Add items to cart  
- Increase/decrease item quantities  
- Remove items  
- Real-time total calculation  
- Sidebar cart drawer  
- Firebase login  
- Checkout flow  

---

## 🧪 Automated Testing (Jest + RTL)

### ✔️ Redux Store Tests
- cartSlice  
- userSlice  

### ✔️ Component Tests
- Rendering  
- User interactions  
- Routing behavior  
- Mocked Redux store  
- Mocked Firebase methods  

Testing stack:
- **Jest**  
- **React Testing Library**

---

## ▶️ How to Run the Project

### 1️⃣ Clone the repository
```
git clone <repository-url>
```

### 2️⃣ Install dependencies
```
npm install
```

### 3️⃣ Add Firebase credentials
Create a `.env` file in the project root:

```
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
```

### 4️⃣ Run the app
```
npm start
```

---

## ⭐ Final Notes
This project is part of my advanced React learning path and showcases production-ready patterns for building scalable, testable, and maintainable web applications.



## 📸 Project Preview (Images)  

**🏠 01 — Home Page (Products Overview)**  

<img src="https://i.imgur.com/ZRowHSZ.png" width="100%" />  

**🧭 02 — Explore Products Category**  

<img src="https://i.imgur.com/q902QGP.png" width="100%" />  

**🛒 03 — Add Product to Cart**  

<img src="https://i.imgur.com/vNigFTb.png" width="100%" />  

**💳 04 — Checkout**  

<img src="https://i.imgur.com/jKgrNXp.png" width="100%" />  

**🔐 05 — Login Page**  

<img src="https://i.imgur.com/kmdKIlv.png" width="100%" />  
