# NgDashboard

Dashboard empresarial moderno construido con Angular 21, diseñado para visualizar métricas clave de negocio, casos de uso y análisis de riesgos con una arquitectura limpia y lista para producción.

## 🚀 Características

### Stack Tecnológico

- **Angular**: `^21.0.0` - Framework con Signals reactivos
- **Angular Material**: `^21.0.0` - Componentes UI modernos
- **Chart.js**: `^4.5.1` + **ng2-charts**: `^8.0.0` - Visualización de datos
- **RxJS**: `~7.8.0` - Programación reactiva
- **TypeScript**: `~5.9.2` - Tipado estático
- **Vitest**: `^4.0.8` - Testing moderno

### Funcionalidades

- 📊 Visualización de KPIs con indicadores de cambio
- 📈 Gráficos interactivos (área apilada, dona) con filtros dinámicos
- 🔍 Filtrado por organización y rango de fechas
- ⚡ Optimización de rendimiento con OnPush y Signals
- 🎨 UI moderna con Angular Material y tema personalizable

## 🛠️ Instalación y Uso

```bash
# Instalación
npm install

# Desarrollo
npm start

# Build producción
npm run build

# Tests
npm test
```

## 🏗️ Arquitectura

```
src/app/dashboard/
├── components/     # Componentes reutilizables y modulares
├── constants/     # Configuración centralizada
├── models/        # Interfaces TypeScript
├── services/      # Lógica de datos
└── store/         # Estado global con Signals
```

## 🎯 Evolución y Mejoras Implementadas

Este proyecto evolucionó desde una implementación inicial hasta un código de producción siguiendo las mejores prácticas de Angular. A continuación se destacan las mejoras clave identificadas e implementadas:

### ✨ Mejoras Principales

#### 1. **Migración a Signals de Angular 21**
   - Refactorización completa de estado reactivo usando Signals
   - DashboardStore centralizado con computed signals para transformaciones optimizadas
   - Eliminación de suscripciones RxJS manuales en favor de reactividad automática

#### 2. **Optimización de Performance con OnPush**
   - Implementación de `ChangeDetectionStrategy.OnPush` en todos los componentes
   - Reducción significativa de ciclos de detección de cambios
   - Combinación de OnPush + Signals para máximo rendimiento

#### 3. **Arquitectura Modular y Separación de Concerns**
   - Extracción de componentes especializados (DashboardFilters, KpiSection, ChartsSection)
   - Reducción del DashboardComponent de 69 a 15 líneas en template
   - Separación clara: Store (estado) → Servicios (datos) → Componentes (presentación)

#### 4. **Centralización y Organización**
   - Creación de directorio `models/` para todas las interfaces TypeScript
   - Directorio `constants/` para configuración centralizada
   - Barrel exports (`index.ts`) para imports más limpios
   - Uso de `inject()` en lugar de constructor injection

#### 5. **Manejo Robusto de Estados**
   - Estados de carga granulares por sección (KPI, Charts, Donuts)
   - Manejo de errores independiente por sección
   - Componentes reutilizables: `LoadingSpinnerComponent` y `ErrorMessageComponent`
   - Funcionalidad de retry sin recargar la página

#### 6. **Type Safety y Mantenibilidad**
   - Tipado estricto en toda la aplicación
   - Interfaces TypeScript para todos los modelos
   - Eliminación de valores hardcodeados en favor de constantes
   - Código autodocumentado y fácil de mantener

### 📊 Resultados

- **Rendimiento**: Mejora significativa con OnPush y Signals
- **Mantenibilidad**: Código modular y fácil de extender
- **UX**: Estados de carga y error claros para el usuario
- **Escalabilidad**: Arquitectura preparada para crecimiento
- **Calidad**: Type safety completo y mejores prácticas aplicadas

## 📝 Scripts

- `npm start` - Servidor de desarrollo
- `npm run build` - Build producción
- `npm run watch` - Build en modo watch
- `npm test` - Tests unitarios

## 📦 Estructura de Datos

- **KPIs**: Total Usecases, Producción, Deployment Times, Riesgos Críticos
- **Gráficos**: Stacked Area (por región), Donut Charts (valor y riesgo)
- **Filtros**: Organización (All, A, B, C) y Rango de fechas (3, 6, 12 meses, año actual)

---

**Desarrollado con las mejores prácticas de Angular 21 y arquitectura moderna**
