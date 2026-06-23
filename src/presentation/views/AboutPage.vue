<script setup lang="ts">
import { ref } from 'vue'
import { Email } from '@/domain/value-objects/Email.vo'
import { useSkills } from '../composables/skill/useSkills.composable'
import LoadingSpinner from '../components/shared/LoadingSpinner.vue'
import ErrorAlert from '../components/shared/ErrorAlert.vue'

// Load skills state
const { skillsByCategory, loading, error } = useSkills()

// Use the Email domain value object to represent the contact email safely
const contactEmailRaw = 'rubendario.developer@example.com'
let emailInstance: Email | null = null
let emailError: string | null = null

try {
  emailInstance = new Email(contactEmailRaw)
} catch (err) {
  emailError = err instanceof Error ? err.message : 'Invalid email format'
}

// Contact form state
const senderName = ref('')
const senderEmail = ref('')
const senderMessage = ref('')
const formStatus = ref<'idle' | 'success' | 'error'>('idle')
const formMessage = ref('')

/**
 * Handle form submission with domain validation.
 */
const submitContactForm = () => {
  formStatus.value = 'idle'
  formMessage.value = ''

  if (!senderName.value.trim()) {
    formStatus.value = 'error'
    formMessage.value = 'El nombre es obligatorio.'
    return
  }

  if (!senderMessage.value.trim()) {
    formStatus.value = 'error'
    formMessage.value = 'El mensaje no puede estar vacío.'
    return
  }

  try {
    // Validate sender email with Value Object domain rules
    new Email(senderEmail.value)

    // Simulating form submission success
    formStatus.value = 'success'
    formMessage.value = '¡Mensaje enviado con éxito! Nos contactaremos pronto.'
    senderName.value = ''
    senderEmail.value = ''
    senderMessage.value = ''
  } catch (err) {
    formStatus.value = 'error'
    formMessage.value = err instanceof Error ? `Email inválido: ${err.message}` : 'Email inválido.'
  }
}
</script>

<template>
  <div class="about-page-container">
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="page-title">Sobre Mí</h1>
      <p class="page-subtitle">Conoce más sobre mi trayectoria profesional, mis habilidades técnicas y cómo contactarme.</p>
    </div>

    <div class="about-split-layout">
      <!-- Left Column: Biography & Contact Form -->
      <div class="bio-column">
        <section class="bio-sectioncard">
          <h3 class="section-title">Biografía</h3>
          <p class="bio-paragraph">
            Soy un apasionado de las arquitecturas limpias, el desarrollo guiado por pruebas (TDD) y los sistemas tolerantes a fallos. Durante los últimos 15 años, he trabajado en proyectos desafiantes en sectores fintech, e-commerce y servicios en la nube, diseñando microservicios y liderando equipos de desarrollo para alcanzar entregas de software robustas.
          </p>
          <p class="bio-paragraph">
            Mi enfoque principal está centrado en el backend con tecnologías como <strong>.NET (C#)</strong> y bases de datos relacionales, sin embargo, poseo amplia experiencia en el ecosistema de frontend moderno utilizando <strong>Vue.js y TypeScript</strong>.
          </p>
          <div class="contact-info-badges" v-if="emailInstance">
            <span class="info-badge">
              <strong>📧 Email de contacto:</strong> {{ emailInstance.getValue() }}
            </span>
          </div>
          <div v-else class="email-error-alert">
            ⚠️ Error de dominio: El email configurado "{{ contactEmailRaw }}" es inválido: {{ emailError }}
          </div>
        </section>

        <!-- Contact Form -->
        <section class="contact-form-section">
          <h3 class="section-title">Contacto</h3>
          <form @submit.prevent="submitContactForm" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Nombre</label>
              <input
                id="name"
                v-model="senderName"
                type="text"
                placeholder="Tu nombre"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input
                id="email"
                v-model="senderEmail"
                type="email"
                placeholder="ejemplo@correo.com"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Mensaje</label>
              <textarea
                id="message"
                v-model="senderMessage"
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
                class="form-textarea"
              ></textarea>
            </div>

            <button type="submit" class="submit-btn">Enviar Mensaje</button>

            <!-- Status Alerts -->
            <div
              v-if="formMessage"
              class="form-status-alert"
              :class="formStatus"
            >
              {{ formMessage }}
            </div>
          </form>
        </section>
      </div>

      <!-- Right Column: Skills Directory -->
      <div class="skills-column">
        <section class="skills-section">
          <h3 class="section-title">Habilidades Técnicas</h3>

          <div v-if="loading" class="skills-loading">
            <LoadingSpinner />
          </div>

          <div v-else-if="error">
            <ErrorAlert :message="error" />
          </div>

          <div v-else class="skills-categories-list">
            <div
              v-for="(skillsList, categoryName) in skillsByCategory"
              :key="categoryName"
              class="category-block"
            >
              <h4 class="category-title">{{ categoryName }}</h4>
              <div class="skills-grid">
                <div v-for="skill in skillsList" :key="skill.id" class="skill-progress-card">
                  <div class="skill-meta">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-level">{{ skill.level }}%</span>
                  </div>
                  <div class="progress-bar-track">
                    <div class="progress-bar-fill" :style="{ width: skill.level + '%' }"></div>
                  </div>
                  <span class="skill-proficiency">{{ skill.proficiencyLabel }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  padding-bottom: 4rem;
}

.header-section {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.5rem;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-heading);
  margin: 0;
  letter-spacing: -0.01em;
}

.page-subtitle {
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.7;
  margin: 0;
  max-width: 600px;
}

.about-split-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .about-split-layout {
    grid-template-columns: 0.9fr 1.15fr;
  }
}

.bio-column,
.skills-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.bio-sectioncard,
.contact-form-section,
.skills-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-top: 0;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.03);
  padding-bottom: 0.5rem;
}

.bio-paragraph {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
  margin-bottom: 1rem;
}

.contact-info-badges {
  margin-top: 1.5rem;
}

.info-badge {
  display: inline-block;
  background: rgba(0, 189, 126, 0.06);
  border: 1px solid rgba(0, 189, 126, 0.2);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  color: var(--color-text);
  font-size: 0.95rem;
}

.email-error-alert {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #f87171;
  font-size: 0.9rem;
}

/* Contact Form styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
}

.form-input,
.form-textarea {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  font-size: 0.95rem;
  transition: all 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.03);
  border-color: hsla(160, 100%, 37%, 0.5);
  box-shadow: 0 0 0 3px rgba(0, 189, 126, 0.15);
}

.submit-btn {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 189, 126, 0.2);
}

.submit-btn:hover {
  background: hsla(160, 100%, 40%, 1);
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(0, 189, 126, 0.3);
}

.form-status-alert {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.form-status-alert.success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.form-status-alert.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
}

/* Skills Column styles */
.skills-categories-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 480px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.skill-progress-card {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s;
}

.skill-progress-card:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 600;
}

.skill-name {
  color: var(--color-heading);
}

.skill-level {
  opacity: 0.8;
}

.progress-bar-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
  width: 100%;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, hsla(160, 100%, 37%, 0.7) 0%, hsla(160, 100%, 37%, 1) 100%);
  border-radius: 3px;
}

.skill-proficiency {
  font-size: 0.75rem;
  opacity: 0.6;
  text-align: right;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.skills-loading {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}
</style>
