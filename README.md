# rubendario-portfolio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Folder Structure

mi-portafolio/
├── src/
│ ├── domain/ # Capa de dominio (independiente de frameworks)
│ │ ├── entities/
│ │ │ ├── Experience.entity.ts
│ │ │ ├── Project.entity.ts
│ │ │ └── Skill.entity.ts
│ │ ├── value-objects/
│ │ │ ├── Technology.vo.ts
│ │ │ ├── Email.vo.ts
│ │ │ └── DateRange.vo.ts
│ │ └── interfaces/
│ │ ├── IExperienceRepository.interface.ts
│ │ └── IProjectRepository.interface.ts
│ │
│ ├── application/ # Casos de uso
│ │ ├── use-cases/
│ │ │ └── experience/
│ │ │ ├── GetExperiences.use-case.ts
│ │ │ ├── GetExperienceById.use-case.ts
│ │ │ ├── FilterExperiencesByTech.use-case.ts
│ │ │ └── GetCurrentJob.use-case.ts
│ │ └── dto/
│ │ └── experience/
│ │ ├── ExperienceResponse.dto.ts
│ │ └── CreateExperience.dto.ts
│ │
│ ├── infrastructure/ # Implementaciones técnicas
│ │ ├── repositories/
│ │ │ └── experience/
│ │ │ ├── ExperienceRepository.impl.ts
│ │ │ └── experience.data.ts # Datos de tu CV
│ │ ├── services/
│ │ │ ├── LocalStorage.service.ts
│ │ │ └── DateFormatter.service.ts
│ │ └── config/
│ │ └── app.config.ts
│ │
│ ├── presentation/ # Capa Vue
│ │ ├── components/
│ │ │ ├── experience/
│ │ │ │ ├── ExperienceList.component.vue
│ │ │ │ ├── ExperienceCard.component.vue
│ │ │ │ └── ExperienceTimeline.component.vue
│ │ │ └── shared/
│ │ │ ├── LoadingSpinner.vue
│ │ │ └── ErrorAlert.vue
│ │ ├── views/
│ │ │ ├── HomePage.vue
│ │ │ ├── ExperiencePage.vue
│ │ │ └── ProjectsPage.vue
│ │ ├── composables/
│ │ │ └── experience/
│ │ │ └── useExperiences.composable.ts
│ │ └── router/
│ │ └── index.ts
│ │
│ └── shared/ # Utilidades transversales
│ ├── utils/
│ │ ├── date.utils.ts
│ │ └── string.utils.ts
│ └── constants/
│ └── app.constants.ts

// ESTRUCTURA RECOMENDADA
src/
├── domain/ # REGLAS DE NEGOCIO
│ ├── entities/ # Experience, Project, Skill
│ ├── value-objects/ # Email, Phone, Technology
│ └── interfaces/ # IExperienceRepository, IProjectRepository
│
├── application/ # CASOS DE USO
│ ├── use-cases/ # GetExperiences, CreateProject, etc.
│ └── dto/ # Data Transfer Objects
│
├── infrastructure/ # IMPLEMENTACIONES TÉCNICAS
│ ├── repositories/ # ExperienceRepository (implementa interfaces)
│ ├── services/ # ApiService, StorageService
│ └── config/ # Configuración de APIs
│
├── presentation/ # VUE SPECIFIC
│ ├── components/ # Componentes Vue
│ ├── views/ # Páginas
│ ├── composables/ # useExperiences, useProjects
│ └── router/ # Vue Router config
│
└── shared/ # UTILIDADES TÉCNICAS
├── utils/ # date-helpers, string-helpers
└── constants/ # app-constants
