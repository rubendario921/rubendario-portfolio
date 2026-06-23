<script setup lang="ts">
/**
 * Component props definition.
 */
defineProps<{
  /**
   * The error message string to display.
   */
  message: string
}>()
</script>

<template>
  <div class="error-container">
    <div class="error-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>
    <div class="error-body">
      <h4 class="error-title">Ha ocurrido un error</h4>
      <p class="error-message">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  max-width: 600px;
  margin: 1.5rem auto;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.08);
}

.error-icon {
  color: #ef4444;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.error-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #ef4444;
}

.error-message {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.9;
  line-height: 1.4;
}
</style>
