<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { appConfig } from '@/infrastructure/config/app.config'
</script>

<template>
  <div class="app-layout">
    <!-- Premium Navigation Bar -->
    <header class="navbar-header">
      <div class="nav-container">
        <RouterLink to="/" class="nav-logo">
          <span class="logo-accent">&lt;</span>
          {{ appConfig.title.split(' ')[0] }}
          <span class="logo-accent">/&gt;</span>
        </RouterLink>

        <nav class="nav-links">
          <RouterLink to="/" class="nav-item" active-class="active">Inicio</RouterLink>
          <RouterLink to="/projects" class="nav-item" active-class="active">Proyectos</RouterLink>
          <RouterLink to="/experience" class="nav-item" active-class="active">Experiencia</RouterLink>
          <RouterLink to="/about" class="nav-item" active-class="active">Sobre Mí</RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main Views Content -->
    <main class="app-main-content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-container">
        <p class="copyright">&copy; {{ new Date().getFullYear() }} {{ appConfig.title.split(' - ')[0] }}. Todos los derechos reservados.</p>
        <p class="tech-stack-info">Creado con Vue 3 + TypeScript + Arquitectura Hexagonal</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  color: var(--color-text);
}

.navbar-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(24, 24, 24, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

@media (prefers-color-scheme: light) {
  .navbar-header {
    background: rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-heading);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.nav-logo:hover {
  background: transparent;
}

.logo-accent {
  color: hsla(160, 100%, 37%, 1);
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover {
  opacity: 1;
  background: rgba(0, 189, 126, 0.08);
  color: hsla(160, 100%, 37%, 1);
}

.nav-item.active {
  color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
  background: rgba(0, 189, 126, 0.05);
}

.app-main-content {
  flex-grow: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  box-sizing: border-box;
}

.app-footer {
  background: rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding: 2rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.copyright {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.tech-stack-info {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.5;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
