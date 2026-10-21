# Control +

Aplicación móvil para el monitoreo y control de glucosa y presión arterial. Desarrollada con **Expo SDK 57**, **React Native 0.86**, **React 19**, **TypeScript** y **Expo Router**.

---

## 📱 Estado Actual del Proyecto

| Componente | Estado |
|------------|--------|
| **Autenticación** (Login/Registro) | ✅ Completo |
| **Pantalla Principal** (Home) | ✅ UI base completada |
| **Navegación por Tabs** (Home/Historial) | ✅ Configurado |
| **Historial de mediciones** | 🚧 Pendiente (pantalla vacía) |
| **Registro de Glucosa** | 🚧 UI presente, sin navegación/funcionalidad |
| **Registro de Presión Arterial** | 🚧 UI presente, sin navegación/funcionalidad |
| **Tema Claro/Oscuro** | ✅ Implementado |
| **Persistencia de sesión** | ✅ expo-secure-store |
| **Backend API** | 📋 Definido (servicios creados), backend externo |

---

## 🛠 Stack Tecnológico

### Frontend (Este repositorio)
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Expo** | ~57.0.28 | Framework principal |
| **React Native** | 0.86.3 | Renderizado nativo |
| **React** | 19.2.3 | UI Library |
| **TypeScript** | ~6.0.3 | Tipado estático |
| **Expo Router** | ^57.0.27 | Navegación file-based |
| **React Native Reanimated** | 4.5.1 | Animaciones |
| **Expo Secure Store** | ~57.0.4 | Almacenamiento seguro (tokens, usuario) |
| **Expo Vector Icons** | ^15.1.1 | Iconografía (Ionicons) |
| **Expo Image** | ~57.0.5 | Imágenes optimizadas |
| **Expo Symbols** | ~57.0.3 | Símbolos SF Symbols / Material |
| **Expo Glass Effect** | ~57.0.4 | Efectos de vidrio |
| **Bun** | - | Gestor de paquetes y runtime |

### Backend (Externo - No incluido en este repo)
- **Node.js + Express + TypeScript** (planificado)
- **Base de datos**: Pendiente de decisión

---

## 📁 Estructura del Proyecto

```
control-plus/
├── src/
│   ├── app/                    # Rutas (Expo Router)
│   │   ├── _layout.tsx         # Stack navigator principal
│   │   ├── index.tsx           # Login screen
│   │   ├── Signin.tsx          # Registro screen
│   │   ├── explore.tsx         # Demo screen (template Expo)
│   │   └── (tabs)/             # Tab navigator
│   │       ├── _layout.tsx     # Configuración tabs (Home, Historial)
│   │       ├── home.tsx        # Dashboard principal
│   │       └── historial.tsx   # Historial (vacío)
│   ├── components/             # Componentes reutilizables
│   │   ├── themed-text.tsx     # Texto con soporte tema
│   │   ├── themed-view.tsx     # View con soporte tema
│   │   ├── animated-icon.tsx   # Icono animado
│   │   ├── app-tabs.tsx        # Tabs nativos
│   │   ├── external-link.tsx   # Enlaces externos
│   │   ├── web-badge.tsx       # Badge para web
│   │   └── hint-row.tsx        # Fila de ayuda
│   ├── hooks/
│   │   ├── use-theme.ts        # Hook para colores del tema
│   │   ├── use-color-scheme.ts # Detección tema sistema
│   │   └── use-color-scheme.web.ts
│   ├── constants/
│   │   └── theme.ts            # Colores, fuentes, espaciado
│   ├── services/               # Capa de servicios API
│   │   ├── api.ts              # URL base (EXPO_PUBLIC_API)
│   │   ├── login.ts            # Servicio login
│   │   └── registro.ts         # Servicio registro
│   ├── assets/                 # Imágenes locales
│   └── global.css              # Estilos globales CSS
├── assets/images/              # Assets estáticos (iconos, splash)
├── android/                    # Config nativa Android (CNG)
├── app.json                    # Configuración Expo
├── package.json
├── tsconfig.json
└── bun.lock
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
# Bun (recomendado)
curl -fsSL https://bun.sh/install | bash

# O con Node.js + npm
# Node.js 20+ recomendado
```

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/AngelVilla16/Control-plus
cd control-plus

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env  # Crear archivo con EXPO_PUBLIC_API

# Iniciar servidor de desarrollo
bun expo start
```

### Variables de Entorno

Crea un archivo `.env` en la raíz:

```env
EXPO_PUBLIC_API=https://tu-api.com/api
```

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `bun expo start` | Inicia el servidor de desarrollo |
| `bun android` | Compila y ejecuta en Android (requiere build nativo) |
| `bun ios` | Compila y ejecuta en iOS (requiere build nativo + macOS) |
| `bun web` | Ejecuta en navegador |
| `bun run lint` | Ejecuta ESLint |
| `bunx tsc --noEmit` | Typecheck sin compilar |
| `bun run reset-project` | Resetea el proyecto al estado inicial |

---

## 🔐 Flujo de Autenticación

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐
│   Login     │────▶│  Backend    │────▶│  SecureStore     │
│  (index)    │     │  /auth/login│     │  id_usuario      │
└─────────────┘     └─────────────┘     │  nombre          │
                                        └────────┬─────────┘
                                                 │
                                                 ▼
                                        ┌──────────────────┐
                                        │  Tabs Navigator  │
                                        │  /(tabs)/home    │
                                        └──────────────────┘
```

**Servicios:**
- `src/services/login.ts` → `POST /auth/login`
- `src/services/registro.ts` → `POST /auth/registro`

**Respuesta esperada del backend:**
```typescript
// Login exitoso
{
  id_usuario: number,
  nombre: string,
  mensaje?: string
}

// Registro exitoso
{
  mensaje: string
}
```

---

## 🎨 Sistema de Temas

El proyecto incluye soporte completo para **Light/Dark Mode**:

```typescript
// Uso en componentes
import { useTheme } from '@/hooks/use-theme';
import { ThemedText, ThemedView } from '@/components/themed-view';

function MiComponente() {
  const theme = useTheme(); // { text, background, backgroundElement, ... }
  
  return (
    <ThemedView type="background">
      <ThemedText type="title" themeColor="text">Título</ThemedText>
    </ThemedView>
  );
}
```

**Colores definidos** (`src/constants/theme.ts`):
- `text` / `background` - Principal
- `backgroundElement` - Cards, inputs
- `backgroundSelected` - Estados pressed/selected
- `textSecondary` - Texto secundario

---

## 📱 Navegación

**Expo Router** con estructura:

```
app/
├── _layout.tsx          # Stack: index → Signin → (tabs)
├── index.tsx            # Login
├── Signin.tsx           # Registro
├── explore.tsx          # Demo
└── (tabs)/
    ├── _layout.tsx      # Tabs: home, historial
    ├── home.tsx         # Dashboard
    └── historial.tsx    # Historial (TODO)
```

**Navegación programática:**
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/Signin');           // Navegar a registro
router.replace('/(tabs)/home');   // Reemplazar (login → home)
router.back();                    // Atrás
```

---

## 🧩 Próximos Pasos / Roadmap

### Prioridad Alta
- [ ] **Pantalla Historial** - Listado de mediciones con fecha, tipo, valor
- [ ] **Formulario Glucosa** - Pantalla modal/push para registrar glucosa (mg/dL, momento, notas)
- [ ] **Formulario Presión** - Pantalla para registrar sistólica/diastólica, pulso, momento
- [ ] **Integración API real** - Conectar con backend y manejar errores/loading states

### Prioridad Media
- [ ] **Gráficas/Charts** - Visualización de tendencias (react-native-chart-kit o victory-native)
- [ ] **Notificaciones locales** - Recordatorios de medición (expo-notifications)
- [ ] **Exportar datos** - CSV/PDF del historial
- [ ] **Perfil de usuario** - Editar datos, cambio de contraseña

### Prioridad Baja
- [ ] **Onboarding** - Tutorial primer uso
- [ ] **Configuración** - Unidades (mg/dL vs mmol/L), tema forzado
- [ ] **Tests** - Unit (Jest) + E2E (Detox)
- [ ] **CI/CD** - GitHub Actions + EAS Build

---

## 🤝 Contribución

### Ramas
```bash
# Feature
git checkout -b feature/nombre-funcionalidad

# Fix
git checkout -b fix/descripcion-breve

# Docs
git checkout -b docs/actualizacion-readme
```

### Convención de Commits (Conventional Commits)

| Tipo | Descripción |
|------|-------------|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `docs:` | Documentación |
| `style:` | Formato, CSS, sin cambios funcionales |
| `refactor:` | Refactor sin cambio de comportamiento |
| `test:` | Añadir/modificar tests |
| `chore:` | Mantenimiento (deps, configs) |

Ejemplo: `feat: agregar formulario de registro de glucosa`

### Checklist antes de PR
- [ ] `bun run lint` pasa sin errores
- [ ] `bunx tsc --noEmit` pasa sin errores
- [ ] Build nativo compila (`bun android` / `bun ios`)
- [ ] Cambios probados en dispositivo físico y/o emulador

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE)

---

## 📚 Documentación Completa

Ver [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md) para documentación técnica detallada para el equipo de desarrollo.