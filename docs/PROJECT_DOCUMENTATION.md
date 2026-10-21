# Control+ - Documentación Técnica Completa

> Documentación interna para el equipo de desarrollo. Estado actual: **Octubre 2026**

---

## 1. Visión General

**Control+** es una aplicación móvil multiplataforma (iOS, Android, Web) para el monitoreo de glucosa y presión arterial. El frontend está construido con **Expo SDK 57 + React Native 0.86 + React 19**, usando **Expo Router** para navegación file-based y **TypeScript** en strict mode.

**Repositorio**: `https://github.com/AngelVilla16/Control-plus`  
**Package Manager**: Bun (lockfile `bun.lock` presente)  
**Backend**: Externo (Node/Express/TS) - No incluido en este repo

---

## 2. Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      EXPO APP (Este repo)                   │
├─────────────────────────────────────────────────────────────┤
│  src/app/                 src/components/   src/services/   │
│  ├── _layout.tsx          ├── themed-*      ├── api.ts      │
│  ├── index.tsx (Login)    ├── animated-*    ├── login.ts    │
│  ├── Signin.tsx (Reg)     ├── app-tabs.tsx  └── registro.ts │
│  ├── explore.tsx (Demo)   └── ...                              │
│  └── (tabs)/              src/hooks/         src/constants/  │
│      ├── _layout.tsx      ├── use-theme.ts   └── theme.ts    │
│      ├── home.tsx         └── use-color-scheme               │
│      └── historial.tsx    src/assets/                        │
└─────────────────────────────────────────────────────────────┘
                              │
                    HTTP/REST (fetch)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API (Externo)                    │
│  POST /auth/login     → { id_usuario, nombre }              │
│  POST /auth/registro  → { mensaje }                         │
│  (Futuro: /glucosa, /presion, /historial, /usuario)         │
└─────────────────────────────────────────────────────────────┘
```

### Decisiones Arquitectónicas Clave

| Decisión | Justificación |
|----------|---------------|
| **Expo Router (file-based)** | Convención sobre configuración, deep linking nativo, DX superior |
| **Bun + expo install** | Resolución de versiones compatible con SDK, velocidad |
| **expo-secure-store** | Almacenamiento encriptado para credenciales/tokens (Keychain/Keystore) |
| **React Native Reanimated 4** | Animaciones 60fps en UI thread, worklets |
| **CSS-in-JS (StyleSheet) + global.css** | Sin dependencias extra, rendimiento nativo, variables CSS para web |
| **Typed Routes (experiments.typedRoutes)** | Type-safety en navegación, autocompletado |

---

## 3. Estructura Detallada por Carpetas

### 3.1 `src/app/` - Rutas y Pantallas

```
src/app/
├── _layout.tsx              # Root Stack Navigator
│   ├── index (Login)
│   ├── Signin (Registro)
│   └── (tabs) (Tab Navigator)
├── index.tsx                # Login Screen
│   - Email + Password inputs
│   - SecureStore guardar id_usuario, nombre
│   - router.replace('/(tabs)/home') on success
├── Signin.tsx               # Registro Screen
│   - Nombre + Email + Password
│   - POST /auth/registro
│   - router.push('/') on success
├── explore.tsx              # Demo/Template (no productivo)
└── (tabs)/
    ├── _layout.tsx          # Bottom Tabs: Home | Historial
    │   - Ionicons, absolute positioned bar
    │   - Active: #0e3755, Inactive: #1E5F8E
    ├── home.tsx             # Dashboard Principal
    │   - Welcome user (from SecureStore)
    │   - Botones: "Registrar Glucosa", "Registrar Presión" (UI only)
    │   - Cards: Glucosa (drop.png), Presión (ecg.png)
    │   - Section: "Últimas Mediciones" (vacía)
    └── historial.tsx        # VACÍA - Solo export default
```

### 3.2 `src/services/` - Capa de API

```typescript
// api.ts
const API_URL = process.env.EXPO_PUBLIC_API; // Requerido en .env
export default API_URL;

// login.ts
interface LoginData { correo: string; contrasena: string; }
interface LoginResponse { 
  mensaje?: string; 
  correo?: string; 
  contrasena?: string; 
  id_usuario?: number;  // <-- Esperado por index.tsx línea 28
  nombre?: string;       // <-- Esperado por index.tsx línea 29
}
export default async function login(userData: LoginData): Promise<LoginResponse>

// registro.ts
interface RegistroData { correo: string; nombre: string; contrasena: string; }
interface RegistroResponse { mensaje?: string; correo?: string; nombre?: string; contrasena?: string; }
export default async function Registro(userData: RegistroData): Promise<RegistroResponse>
```

> **⚠️ Nota**: `LoginResponse` en `login.ts` no incluye `id_usuario` ni `nombre` en la interface, pero `index.tsx` los espera. El backend **debe** devolverlos.

### 3.3 `src/constants/theme.ts` - Design System

```typescript
export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
};

export const Spacing = { half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 64 };
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
```

**Colores de marca usados en UI (hardcoded en pantallas auth):**
- Primary: `#1E5F8E` (botones, links)
- Primary Dark: `#0e3755` (active tab)
- Background auth: `background-log.png` (ImageBackground)

### 3.4 `src/hooks/` - Hooks Personalizados

| Hook | Propósito |
|------|-----------|
| `use-theme.ts` | `const theme = useTheme()` → retorna `Colors[scheme]` |
| `use-color-scheme.ts` | Wrapper nativo `useColorScheme()` con fallback web |
| `use-color-scheme.web.ts` | Implementación web usando `matchMedia` |

### 3.5 `src/components/` - Componentes Reutilizables

| Componente | Descripción |
|------------|-------------|
| `ThemedText` | Text con `type` (title, subtitle, small, code, link...) y `themeColor` |
| `ThemedView` | View con `type` (background, backgroundElement, text...) |
| `AnimatedIcon` | Icono con animación press (Reanimated) |
| `AppTabs` / `AppTabsWeb` | Tab bar personalizada (nativo/web) |
| `ExternalLink` | Abre URLs en navegador (expo-web-browser) |
| `WebBadge` | Badge "Open in browser" solo web |
| `Collapsible` | Acordeón animado (Reanimated) - en `components/ui/` |
| `HintRow` | Fila de ayuda con icono |

---

## 4. Flujo de Datos y Estado

### 4.1 Autenticación

```
Usuario abre app
       │
       ▼
┌──────────────────┐
│  Root Layout     │  (Stack: index → Signin → (tabs))
│  _layout.tsx     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  index.tsx       │  Login Screen
│  (Login)         │
│                  │
│  1. User input   │
│  2. login(correo,│
│     contrasena)  │
│  3. POST /auth/  │
│     login        │
│  4. OK → SecureSt│
│     ore.setItem  │
│     ('id_usuario',│
│     'nombre')    │
│  5. router.repla │
│     ce('/(tabs)/ │
│     home')       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  (tabs)/home.tsx │
│                  │
│  useEffect:      │
│  SecureStore.get │
│  Item('nombre')  │
│  → setNombre()   │
└──────────────────┘
```

### 4.2 Persistencia (SecureStore)

| Clave | Valor | Uso |
|-------|-------|-----|
| `id_usuario` | string (number) | Identificador para requests futuros |
| `nombre` | string | Display en Home "Bienvenido: {nombre}" |

> **Seguridad**: No almacenar tokens JWT en SecureStore plano. Futuro: implementar refresh token rotation + Access token en memoria.

---

## 5. Configuración de Build y Deploy

### 5.1 `app.json` - Configuración Expo

```json
{
  "expo": {
    "name": "control-plus",
    "slug": "control-plus",
    "version": "1.0.0",
    "scheme": "controlplus",           // Deep linking: controlplus://
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "automatic",
    "ios": { "icon": "./assets/expo.icon" },
    "android": {
      "package": "com.angelastrosoft.controlplus",
      "adaptiveIcon": { ... },
      "predictiveBackGestureEnabled": false
    },
    "web": { "output": "static", "favicon": "./assets/images/favicon.png" },
    "plugins": [
      "expo-router",
      ["expo-splash-screen", { "backgroundColor": "#208AEF", "image": "./assets/images/splash-icon.png", "imageWidth": 76 }],
      "expo-secure-store"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
```

### 5.2 `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/assets/*": ["./assets/*"]
    }
  }
}
```

### 5.3 Variables de Entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `EXPO_PUBLIC_API` | ✅ | Base URL del backend (ej: `https://api.controlplus.com/api`) |

**Crear `.env`:**
```env
EXPO_PUBLIC_API=https://tu-backend.com/api
```

> **Importante**: En Expo, variables públicas deben prefijarse con `EXPO_PUBLIC_`. No usar `process.env` directamente en código cliente para secretos.

### 5.4 EAS Build (Producción)

```bash
# Instalar EAS CLI
bunx eas-cli@latest login

# Configurar proyecto (primera vez)
bunx eas-cli@latest build:configure

# Build development (para testing en device)
bunx eas-cli@latest build --profile development --platform android

# Build production
bunx eas-cli@latest build --profile production --platform all

# Submit a stores
bunx eas-cli@latest submit --platform android
bunx eas-cli@latest submit --platform ios
```

**Perfiles sugeridos `eas.json`:**
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

## 6. Guía de Desarrollo

### 6.1 Añadir Nueva Pantalla

```bash
# 1. Crear archivo en src/app/
touch src/app/nueva-pantalla.tsx

# 2. Export default component
# 3. Navegar: router.push('/nueva-pantalla')
```

**Con params tipados (typedRoutes):**
```typescript
// src/app/glucosa/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function GlucosaDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // id es string | undefined, type-safe
}
```

### 6.2 Añadir Componente Temático

```typescript
// components/mi-componente.tsx
import { ThemedView, ThemedText } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

export function MiComponente() {
  const theme = useTheme();
  
  return (
    <ThemedView type="backgroundElement" style={{ padding: Spacing.four }}>
      <ThemedText type="title" themeColor="text">Título</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">Subtítulo</ThemedText>
    </ThemedView>
  );
}
```

### 6.3 Llamar a la API

```typescript
// services/nuevo-servicio.ts
import API_URL from './api';

export interface MiData { campo: string; }
export interface MiResponse { success: boolean; data: MiData; }

export default async function miServicio(payload: MiData): Promise<MiResponse> {
  const res = await fetch(`${API_URL}/endpoint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje || 'Error');
  return data;
}
```

### 6.4 Estilos y Tema

**Variables CSS globales** (`src/global.css`):
```css
:root {
  --font-display: 'Inter', system-ui, sans-serif;
  --font-serif: Georgia, serif;
  --font-rounded: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

**No usar** valores hardcoded para colores/spacing. Usar:
```typescript
// ✅ Correcto
const theme = useTheme();
<ThemedView type="backgroundElement" style={{ marginTop: Spacing.three }} />

// ❌ Incorrecto
<View style={{ backgroundColor: '#fff', marginTop: 16 }} />
```

---

## 7. API Contract (Backend)

### 7.1 Endpoints Actuales

| Método | Endpoint | Request | Response (200) | Response (4xx) |
|--------|----------|---------|----------------|----------------|
| POST | `/auth/login` | `{ correo, contrasena }` | `{ id_usuario, nombre, mensaje? }` | `{ mensaje }` |
| POST | `/auth/registro` | `{ nombre, correo, contrasena }` | `{ mensaje }` | `{ mensaje }` |

### 7.2 Endpoints Futuros (Propuestos)

```typescript
// Glucosa
POST   /glucosa              // Registrar: { valor, momento, notas?, id_usuario }
GET    /glucosa/:idUsuario   // Listar: ?desde=&hasta=&limit=
GET    /glucosa/:idUsuario/stats // Resumen: { promedio, min, max, tendencia }

// Presión Arterial
POST   /presion              // { sistolica, diastolica, pulso?, momento, notas?, id_usuario }
GET    /presion/:idUsuario   // Listar con filtros
GET    /presion/:idUsuario/stats

// Usuario
GET    /usuario/:id          // Perfil
PATCH  /usuario/:id          // Actualizar perfil
POST   /auth/refresh         // Refresh token
POST   /auth/logout          // Invalidar refresh token
```

### 7.3 Formato de Errores Estándar

```typescript
// Backend debe responder siempre:
interface ApiError {
  mensaje: string;
  codigo?: string;      // ej: "INVALID_CREDENTIALS", "VALIDATION_ERROR"
  detalles?: Record<string, string[]>;
}

// Frontend manejo:
try {
  const data = await login({ correo, contrasena });
} catch (error: any) {
  // error.message = data.mensaje del backend
  Alert.alert('Error', error.message);
}
```

---

## 8. Testing y Calidad

### 8.1 Comandos de Verificación

```bash
# Lint
bun run lint

# Typecheck
bunx tsc --noEmit

# Doctor (diagnóstico dependencias)
bunx expo-doctor

# Fix versiones incompatibles
bunx expo install --fix
```

### 8.2 Testing (Por Implementar)

| Tipo | Herramienta | Estado |
|------|-------------|--------|
| Unit | Jest + React Native Testing Library | 🚧 Pendiente |
| Component | React Native Testing Library | 🚧 Pendiente |
| E2E | Detox | 🚧 Pendiente |
| Snapshot | Jest | 🚧 Pendiente |

**Configuración Jest sugerida:**
```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@expo|expo)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/assets/(.*)$': '<rootDir>/assets/$1',
  },
};
```

---

## 9. Troubleshooting Común

| Problema | Solución |
|----------|----------|
| `EXPO_PUBLIC_API` undefined | Verificar `.env` existe y reiniciar `expo start` |
| Metro cache issues | `bun expo start -c` (clear cache) |
| Build nativo falla | `bunx expo install --fix` + `bunx expo prebuild --clean` |
| TypeError en navegación | Verificar `typedRoutes: true` en app.json y regenerar types |
| SecureStore no persiste en web | Usar `localStorage` fallback o `expo-secure-store` solo nativo |
| Fontes no cargan | Verificar `expo-font` + `useFonts` en _layout.tsx |

---

## 10. Referencias Rápidas

### Dependencias Principales (package.json)

```json
{
  "expo": "~57.0.28",
  "react": "19.2.3",
  "react-native": "0.86.3",
  "expo-router": "^57.0.27",
  "expo-secure-store": "~57.0.4",
  "react-native-reanimated": "4.5.1",
  "react-native-gesture-handler": "~2.32.0",
  "react-native-safe-area-context": "~5.7.0",
  "react-native-screens": "~4.26.0",
  "@expo/vector-icons": "^15.1.1",
  "expo-image": "~57.0.5",
  "expo-symbols": "~57.0.3",
  "@expo/ui": "~57.0.23",
  "expo-font": "~57.0.4",
  "expo-glass-effect": "~57.0.4"
}
```

### Enlaces Útiles

- [Expo SDK 57 Docs](https://docs.expo.dev/versions/v57.0.0/)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native 0.86 Changelog](https://reactnative.dev/blog/2025/07/02/react-native-0.86)
- [React 19 Migration](https://react.dev/blog/2024/12/05/react-19)
- [EAS Build Docs](https://docs.expo.dev/eas/index.md)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)

---

## 11. Contacto y Ownership

| Rol | Responsable |
|-----|-------------|
| **Tech Lead / Mobile** | Ángel Villa (@AngelVilla16) |
| **Backend API** | [Pendiente asignación] |
| **Design/UX** | [Pendiente asignación] |
| **QA/Testing** | [Pendiente asignación] |

---

*Documento generado automáticamente basado en el estado del código a Octubre 2026. Actualizar tras cambios significativos en arquitectura, dependencias o flujos principales.*