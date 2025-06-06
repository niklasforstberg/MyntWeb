src/
├── api/               # Axios instance & API methods
│   └── axios.ts
├── auth/              # Auth context, token helpers
│   ├── AuthContext.tsx
│   ├── useAuth.ts     # Custom hook to access auth context
│   └── authUtils.ts   # decode, set, clear JWT
├── components/        # Reusable components
│   └── Navbar.tsx
├── pages/             # Route components/pages
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── routes/            # App routes & protected route wrapper
│   └── AppRoutes.tsx
├── styles/            # Optional styling
│   └── main.css
├── App.tsx
├── main.tsx
└── types/             # Shared TypeScript types
    └── index.d.ts
 