# Estructura Proyecto Vercel + Firebase

## 📁 Estructura de Carpetas

```
demostra-ferias/
├── api/                          # Vercel Functions (Backend)
│   ├── exhibitions/
│   │   ├── create.js
│   │   ├── list.js
│   │   └── get.js
│   ├── costs/
│   │   ├── create.js
│   │   ├── list.js
│   │   ├── update.js
│   │   └── delete.js
│   ├── clients/
│   │   ├── list.js
│   │   └── create.js
│   ├── middleware/
│   │   └── auth.js
│   └── firebase-config.js
├── public/                       # Frontend Static
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── .env.local                    # Variables Firebase (no subir a git)
├── vercel.json                   # Config Vercel
└── package.json
```

## 🔥 Configuración Firebase

1. Crear proyecto en Firebase Console
2. Habiliitar Firestore Database (modo producción)
3. Habilitar Authentication (Email/Password)
4. Copiar credenciales a `.env.local`

## 🚀 Deploy a Vercel

```bash
npm install -g vercel
vercel login
vercel
```

## 📊 Colecciones Firestore

- **exhibitions**: Ferias
- **clients**: Clientes
- **costs**: Costes/Ventas
- **cost_statuses**: Estados configurables
