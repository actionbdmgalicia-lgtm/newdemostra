# 🎪 Demostra - Gestor de Costes de Ferias - SETUP

## 🚀 Inicio Rápido

### Paso 1: Crear Firebase Project

1. Ve a https://console.firebase.google.com
2. Crea nuevo proyecto "demostra-ferias"
3. Habilita **Firestore Database** (Modo producción)
4. Ve a **Settings → Service Accounts → Generate New Private Key**
5. Copia el archivo JSON descargado

### Paso 2: Configurar variables de entorno

Crea archivo `.env.local` en la raíz:

```
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_PRIVATE_KEY=tu-clave-privada
FIREBASE_CLIENT_EMAIL=tu-email@iam.gserviceaccount.com
```

### Paso 3: Instalar y ejecutar localmente

```bash
npm install
npm run dev
```

Abre http://localhost:3000

### Paso 4: Deploy en Vercel

```bash
npm i -g vercel
vercel login
vercel
```

Añade las variables de entorno en Vercel Dashboard.

## 📊 Estructura Firestore

La aplicación creará automáticamente estas colecciones:
- `exhibitions` - Ferias
- `clients` - Clientes
- `costs` - Costes/Ventas

## ✨ Funcionalidades Implementadas

✅ Crear ferias con ID automático
✅ Gestión de clientes
✅ Registro de costes/ventas con 6 estados
✅ Tabla de detalle ordenada por fecha
✅ Panel de totales (Ingresos, Gastos, Margen)
✅ Interfaz profesional y responsiva

## 🎯 Próximos Pasos

- Autenticación de usuarios
- Importar datos desde CSV
- Gráficos y análisis
- Exportación de reportes
- Alertas de desviaciones
