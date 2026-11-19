# Control +

Aplicación móvil para el monitoreo de glucosa y presión arterial.

Desarrollada con **Expo SDK 58**, **React Native 0.88**, **React 19**, **TypeScript** y **Expo Router**.

## Estado actual

| Área | Estado |
|------|--------|
| Autenticación (Login/Registro) | ✅ Implementada |
| Completar perfil | ✅ Pantalla implementada |
| Home (dashboard) | ✅ Implementado (acciones rápidas, resumen, últimas mediciones de glucosa) |
| Registro de glucosa | ✅ Pantalla/ruta implementada |
| Registro de presión | ✅ Pantalla/ruta implementada |
| Historial | 🚧 Ruta/pantalla creada, pendiente de completar funcionalidad |
| Perfil | 🚧 Ruta/pantalla creada, pendiente de completar funcionalidad |
| Servicios API | ✅ Integración base (auth, perfil, glucosa, presión) |
| Persistencia local segura | ✅ `expo-secure-store` |

> Nota: el backend es externo a este repositorio. La app consume endpoints mediante `EXPO_PUBLIC_API`.

## Stack tecnológico

| Tecnología | Versión (aprox.) | Uso |
|------------|------------------|-----|
| Expo | `58.0.19` | Framework y tooling |
| React Native | `0.88.0` | UI nativa multiplataforma |
| React / React DOM | `19.3.0` | Librería UI |
| Expo Router | `58.0.26` | Navegación basada en archivos |
| TypeScript | `~6.0.3` | Tipado estático |
| expo-secure-store | `58.0.2` | Almacenamiento seguro (token/usuario) |
| React Native Reanimated | `4.7.1` | Animaciones |
| React Native Gesture Handler | `~3.3.0` | Gestos |
| Expo Image / Vector Icons / Symbols | SDK 58 | UI, íconos y assets |

## Requisitos

- [Bun](https://bun.sh/) (recomendado, el proyecto incluye `bun.lock`) o Node.js compatible
- Entorno Expo (Expo Go para pruebas rápidas o Development Build para módulos nativos según sea necesario)
- Android Studio / Xcode solo si vas a compilar localmente en emulador/dispositivo

## Inicio rápido

```bash
# Clonar repositorio
git clone https://github.com/AngelVilla16/Control-plus
cd Control-plus

# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bunx expo start
```

> Si no usas Bun, puedes usar `npm install` y `npx expo start`, pero se recomienda mantener coherencia con el lockfile del proyecto.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_API=https://tu-api.com/api
```

- `EXPO_PUBLIC_API`: URL base del backend consumido por los servicios en `src/services/*`.

Después de cambiar variables de entorno, reinicia el servidor de Expo.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `bun run start` | Inicia Expo (`expo start`) |
| `bun run android` | Ejecuta en Android (`expo run:android`) |
| `bun run ios` | Ejecuta en iOS (`expo run:ios`) |
| `bun run web` | Ejecuta en web (`expo start --web`) |
| `bun run lint` | Ejecuta ESLint (`expo lint`) |
| `bun run reset-project` | Script de reseteo del proyecto |

Comandos útiles adicionales:

```bash
bunx tsc --noEmit      # Verificación de tipos
bunx expo-doctor       # Diagnóstico del proyecto/dependencias
```

## Estructura del proyecto

```text
.
├── src/
│   ├── app/                    # Rutas y pantallas (Expo Router)
│   │   ├── _layout.tsx         # Layout raíz (Stack)
│   │   ├── index.tsx           # Login
│   │   ├── Signin.tsx          # Registro
│   │   ├── CompletarPerfil.tsx # Completar perfil de usuario
│   │   ├── RegistrarGlucosa.tsx# Registro de glucosa
│   │   ├── RegistrarPresion.tsx# Registro de presión
│   │   ├── explore.tsx         # Pantalla demo/template
│   │   └── (tabs)/             # Navegación por tabs
│   │       ├── _layout.tsx     # Configuración de tabs
│   │       ├── home.tsx        # Dashboard principal
│   │       ├── historial.tsx   # Historial (en progreso)
│   │       └── perfil.tsx      # Perfil (en progreso)
│   ├── components/             # Componentes reutilizables
│   ├── hooks/                  # Hooks personalizados
│   ├── constants/              # Tema y constantes
│   ├── services/               # Capa de acceso a API
│   └── assets/                 # Imágenes/recursos locales usados por la app
├── assets/                     # Assets estáticos de Expo (iconos, splash, etc.)
├── docs/                       # Documentación adicional
├── app.json                    # Configuración de Expo
├── package.json
└── tsconfig.json
```

## Navegación (Expo Router)

Rutas principales detectadas en `src/app`:

- `/` (`index.tsx`) - Inicio de sesión
- `/Signin` - Registro
- `/CompletarPerfil` - Completar datos de perfil
- `/RegistrarGlucosa` - Registrar medición de glucosa
- `/RegistrarPresion` - Registrar medición de presión
- `/(tabs)/home` - Dashboard principal
- `/(tabs)/historial` - Historial de mediciones
- `/(tabs)/perfil` - Perfil de usuario

## Servicios API (`src/services`)

La app incluye servicios para comunicarse con el backend:

- `api.ts` - URL base (`EXPO_PUBLIC_API`)
- `login.ts` - Inicio de sesión
- `registro.ts` - Registro de usuario
- `getperfil.ts` / `updateperfil.ts` - Consulta y actualización de perfil
- `glucosa.ts` - Operaciones relacionadas con glucosa
- `presion.ts` - Operaciones relacionadas con presión

## Funcionalidad destacada en Home

La pantalla `src/app/(tabs)/home.tsx` incluye:

- Saludo personalizado con datos guardados en `SecureStore`
- Accesos rápidos para registrar glucosa y presión
- Resumen rápido (glucosa más reciente)
- Sección **"Últimas mediciones"** con diseño de tarjetas, filtro Glucosa/Presión y estado vacío

## Desarrollo

- Usa `bunx expo install <paquete>` para instalar dependencias compatibles con el SDK de Expo.
- Si `ios/` y `android/` no existen o están gestionados por CNG, evita editarlos manualmente; configura comportamiento nativo en `app.json` y config plugins.
- Antes de dar por finalizada una tarea, ejecuta al menos:

```bash
bun run lint
bunx tsc --noEmit
```

## Documentación adicional

- [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md) - Documentación técnica interna (puede requerir actualización para reflejar cambios recientes del proyecto)
- [AGENTS.md](AGENTS.md) - Guías para agentes/herramientas de automatización en este repositorio

## Contribución

1. Crea una rama descriptiva (`feat/...`, `fix/...`, `docs/...`).
2. Mantén los cambios enfocados y consistentes con el estilo del proyecto.
3. Ejecuta lint y typecheck antes de abrir un PR.
4. Describe claramente qué cambió y cómo probarlo.

## Licencia

Consulta el archivo [LICENSE](LICENSE) si está disponible en el repositorio.
