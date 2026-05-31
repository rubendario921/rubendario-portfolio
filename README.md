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

src/modules/
│
├── experience/ # Módulo de Experiencia Laboral
│ ├── core/ # Lógica de negocio específica
│ │ ├── entities/
│ │ │ └── Experience.ts
│ │ ├── repositories/
│ │ │ └── IExperienceRepository.ts
│ │ └── use-cases/
│ │ ├── GetExperiencesUseCase.ts
│ │ └── FilterByCompanyUseCase.ts
│ │
│ ├── infrastructure/ # Implementaciones concretas
│ │ └── repositories/
│ │ └── ExperienceRepository.ts
│ │
│ └── presentation/ # Vistas y componentes de este módulo
│ ├── components/
│ │ ├── ExperienceList.vue
│ │ ├── ExperienceCard.vue
│ │ └── ExperienceTimeline.vue
│ ├── views/
│ │ └── ExperiencePage.vue
│ └── composables/
│ └── useExperiences.ts
│
├── projects/ # Módulo de Proyectos
│ ├── core/
│ │ ├── entities/
│ │ │ └── Project.ts
│ │ ├── repositories/
│ │ │ └── IProjectRepository.ts
│ │ └── use-cases/
│ │ └── GetProjectsUseCase.ts
│ ├── infrastructure/
│ │ └── repositories/
│ │ └── ProjectRepository.ts
│ └── presentation/
│ ├── components/
│ │ ├── ProjectCard.vue
│ │ └── ProjectGrid.vue
│ └── views/
│ └── ProjectsPage.vue
│
├── about/ # Módulo "Sobre Mí"
│ ├── core/
│ │ ├── entities/
│ │ │ └── PersonalInfo.ts
│ │ ├── repositories/
│ │ │ └── IPersonalInfoRepository.ts
│ │ └── use-cases/
│ │ └── GetPersonalInfoUseCase.ts
│ ├── infrastructure/
│ │ └── repositories/
│ │ └── PersonalInfoRepository.ts
│ └── presentation/
│ ├── components/
│ │ ├── SkillsChart.vue
│ │ └── Biography.vue
│ └── views/
│ └── AboutPage.vue
│
├── contact/ # Módulo de Contacto
│ ├── core/
│ │ ├── entities/
│ │ │ └── Contact.ts
│ │ ├── repositories/
│ │ │ └── IContactRepository.ts
│ │ └── use-cases/
│ │ └── SendMessageUseCase.ts
│ ├── infrastructure/
│ │ └── repositories/
│ │ └── ContactRepository.ts
│ └── presentation/
│ ├── components/
│ │ ├── ContactForm.vue
│ │ └── SocialLinks.vue
│ └── views/
│ └── ContactPage.vue
│
└── shared/ # COMPARTIDO entre todos los módulos
├── core/
│ ├── entities/
│ │ └── Technology.ts # Tecnología reusable
│ └── interfaces/
│ ├── IRepository.ts # Interfaz base
│ └── IUseCase.ts # Interfaz base para casos de uso
├── infrastructure/
│ ├── http/
│ │ └── HttpClient.ts # Cliente HTTP compartido
│ └── storage/
│ └── LocalStorage.ts # Storage compartido
└── presentation/
├── components/
│ ├── atoms/
│ │ ├── Button.vue
│ │ ├── Icon.vue
│ │ └── LoadingSpinner.vue
│ ├── molecules/
│ │ ├── Card.vue
│ │ ├── Modal.vue
│ │ └── Navbar.vue
│ └── organisms/
│ ├── Header.vue
│ └── Footer.vue
├── composables/
│ ├── useLoading.ts
│ └── useNotification.ts
└── styles/
└── global.css
