# Campjam 💡: Learning Management System

Campjam is a comprehensive learning management system (LMS) built with Next.js, designed to provide a seamless educational experience for students, instructors, and administrators. The platform supports course discovery, enrollment, and content delivery, all managed through a secure, role-based access framework.

---

## ✨ Features

Campjam provides distinct functionalities for each user role to ensure a tailored and secure experience.

### Student 🧑‍🎓

- **Course Exploration:** Students can **search and filter courses** by category to find subjects that interest them.
- **Enrollment & Progress:** They can **enroll in courses**, view all their **enrolled courses**, and **navigate through course content**.
- **Assignments & Performance:** Students can **take assignments**, **check their progress** and performance, and **view scores and feedback** from their instructors.

### Instructor 🧑‍🏫

- **Course Management:** Instructors have full control over their own courses. They can **create, edit, and remove courses**, as well as manage **course content** and **add new submissions**.
- **Student Performance:** They can **check the performance of their enrolled students** and **provide scores and feedback**.

### Admin 👨‍💼

- **System-Wide Management:** Administrators have a top-level view of the platform. They can **manage all courses**, **bind them to instructors**, and **add or remove course content**.
- **User Management:** Admins can **view all user accounts**, **edit user roles**, and **remove users** from the system.

---

## 💻 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white) ![ts](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

- **Frontend:** **Next.js** for a powerful, server-rendered React application.
- **Authentication:** **NextAuth.js** to handle secure and flexible authentication.
- **Other Technologies:** **Tailwind, Typescript**

---

## ⚙️ Installation and Usage

To get Campjam up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [your_repository_url]
    cd campjam
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    NEXTAUTH_SECRET=""
    NEXT_PUBLIC_API_URL=""
    ```

    - Set **`NEXTAUTH_SECRET`** to a long, random string to secure NextAuth.js.
    - Set **`NEXT_PUBLIC_API_URL`** to the URL of your backend API.

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:3000`.

---

## 🚀 Deployment

- **Frontend:** https://final-project-fe-rizaldi-r.vercel.app/
- **Backend:** https://final-project-be-rizaldi-r-production.up.railway.app/

---

## 🔑 Test Credentials

You can use the following credentials to test the different user roles on the deployed site.

- **Instructor:**

  - **Email:** `charlie.brown@example.com`
  - **Password:** `pass123123`

- **Student:**

  - **Email:** `scott@example.com`
  - **Password:** `pass123123`

---

## 📸 Screenshoots

![alt text](https://github-production-user-asset-6210df.s3.amazonaws.com/64939575/481010651-a048e4f5-9949-4446-b8b4-781a5648036d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250822T143237Z&X-Amz-Expires=300&X-Amz-Signature=a89db1f7f05e03b269abe0344a54b10f99db445c34a6bcf4ad45a132cadd4583&X-Amz-SignedHeaders=host)

![alt text](https://github-production-user-asset-6210df.s3.amazonaws.com/64939575/481012088-88ed1289-0246-49fd-873f-1732b440523b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250822%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250822T143333Z&X-Amz-Expires=300&X-Amz-Signature=491804652f3db98b801df782017558fb75cdd4e3d7e08c96500114306a029e8f&X-Amz-SignedHeaders=host)

![alt text](https://github.com/user-attachments/assets/3e387c19-a111-488d-94da-f5a2e5771a50)

<img width="1896" height="959" alt="Image" src="https://github.com/user-attachments/assets/50559cd5-22ee-4841-8213-f07f479665b5" />

<img width="1901" height="965" alt="Image" src="https://github.com/user-attachments/assets/6fedc5be-e829-4b75-864d-416c4db5909c" />

<img width="1899" height="957" alt="Image" src="https://github.com/user-attachments/assets/2d9484a7-5a03-4d60-b588-e4b7e5f7bb8e" />

<img width="1838" height="962" alt="Image" src="https://github.com/user-attachments/assets/3d3609c0-57a4-4232-b389-a0bcb4783132" />

<img width="1853" height="969" alt="Image" src="https://github.com/user-attachments/assets/7c904de3-ff53-4d0b-84e7-c18cfedb3b2e" />

<img width="1845" height="970" alt="Image" src="https://github.com/user-attachments/assets/07766374-7b5a-4d63-8bb0-76bfb87c13f7" />

<img width="1891" height="961" alt="Image" src="https://github.com/user-attachments/assets/a5c00bf3-d1a2-413d-8f2f-827416a175fe" />

## 🤝 Contributor

[@rizaldi-r](https://github.com/rizaldi-r)