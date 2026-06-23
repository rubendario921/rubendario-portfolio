<template>
  <div class="spinner-container">
    <div class="spinner"></div>
    <span class="spinner-text">Cargando...</span>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  margin: 2rem auto;
  max-width: 280px;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(0, 189, 126, 0.1);
  border-left-color: hsla(160, 100%, 37%, 1);
  border-radius: 50%;
  animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-text {
  margin-top: 1.2rem;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
