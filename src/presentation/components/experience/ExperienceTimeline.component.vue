<script setup lang="ts">
import type { ExperienceResponse } from '@/application/dto/experience/ExperienceResponse.dto'
import ExperienceCard from './ExperienceCard.component.vue'

/**
 * Component props definition.
 */
defineProps<{
  /**
   * The list of experiences to layout in the timeline.
   */
  experiences: ExperienceResponse[]
}>()
</script>

<template>
  <div class="timeline-wrapper">
    <div class="timeline-line"></div>
    <div class="timeline-list">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="timeline-node"
        :class="{ 'current-node': experience.idCurrentJob }"
      >
        <!-- Connector Dot -->
        <div class="timeline-dot">
          <div class="dot-inner"></div>
        </div>

        <!-- Experience Card Content -->
        <div class="timeline-content">
          <ExperienceCard :experience="experience" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-wrapper {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0;
}

.timeline-line {
  position: absolute;
  left: 19px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.08) 15%,
    rgba(255, 255, 255, 0.08) 85%,
    rgba(255, 255, 255, 0.02) 100%
  );
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .timeline-line {
    background: linear-gradient(
      to bottom,
      rgba(0, 189, 126, 0) 0%,
      rgba(0, 189, 126, 0.2) 15%,
      rgba(0, 189, 126, 0.2) 85%,
      rgba(0, 189, 126, 0) 100%
    );
  }
}

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-node {
  position: relative;
  display: flex;
  gap: 2rem;
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-background);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s;
}

.dot-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}

.timeline-node:hover .timeline-dot {
  border-color: hsla(160, 100%, 37%, 0.8);
  box-shadow: 0 0 10px rgba(0, 189, 126, 0.4);
}

.timeline-node:hover .dot-inner {
  background: hsla(160, 100%, 37%, 1);
  transform: scale(1.2);
}

.current-node .timeline-dot {
  border-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 0 12px rgba(0, 189, 126, 0.6);
}

.current-node .dot-inner {
  background: hsla(160, 100%, 37%, 1);
  animation: pulse 2s infinite;
}

.timeline-content {
  margin-left: 2.5rem;
  flex-grow: 1;
  width: calc(100% - 2.5rem);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
