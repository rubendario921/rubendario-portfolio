import { ref, computed, onMounted } from 'vue'
import type { ExperienceResponse } from '@/application/dto/experience/ExperienceResponse.dto'
import { FilterExperiencesByTechUseCase } from '@/application/use-cases/experience/FilterExperiencesByTech.usecase'
import { GetCurrentJobUseCase } from '@/application/use-cases/experience/GetCurrentJob.usecase'
import { GetExperiencesUseCase } from '@/application/use-cases/experience/GetExperiences.usecase'
import type { IExperienceRepository } from '@/domain/interfaces/IExperienceRepository.interface'
import { ExperienceRepository } from '@/infrastructure/repositories/experience/ExperienceRepository.impl'
import { loggerService } from '@/infrastructure/services/Logger.service'

/**
 * Composable function to manage professional experience state.
 * Supports dependency injection of the repository.
 * @param repository - Implementation of IExperienceRepository.
 */
export function useExperiences(repository: IExperienceRepository = new ExperienceRepository()) {
  const experiences = ref<ExperienceResponse[]>([])
  const filteredExperiences = ref<ExperienceResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedTechnology = ref<string | null>(null)

  // Initialize use cases using the injected repository (DIP)
  const getExperiencesUseCase = new GetExperiencesUseCase(repository)
  const filterByTechnologyUseCase = new FilterExperiencesByTechUseCase(repository)
  const getCurrentJobUseCase = new GetCurrentJobUseCase(repository)

  /**
   * Computed property to extract the current active job.
   */
  const currentJob = computed(() => {
    return experiences.value.find((exp) => exp.idCurrentJob) || null
  })

  /**
   * Computed property to extract unique technologies sorted alphabetically.
   */
  const uniqueTechnologies = computed(() => {
    const techSet = new Set<string>()
    experiences.value.forEach((exp) => {
      exp.technologies.forEach((tech) => techSet.add(tech.name))
    })
    return Array.from(techSet).sort()
  })

  /**
   * Computed property grouping experiences by year of start date.
   */
  const experiencesByYear = computed(() => {
    const grouped: Record<number, ExperienceResponse[]> = {}
    experiences.value.forEach((exp) => {
      const date = new Date(exp.startDate)
      if (isNaN(date.getTime())) return
      const year = date.getFullYear()
      if (!grouped[year]) grouped[year] = []
      grouped[year].push(exp)
    })
    return grouped
  })

  /**
   * Loads all professional experiences.
   */
  const loadExperiences = async () => {
    loading.value = true
    error.value = null
    try {
      experiences.value = await getExperiencesUseCase.execute()
      filteredExperiences.value = experiences.value
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error loading experiences'
      error.value = msg
      loggerService.error('useExperiences - Failed to load experiences', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Filters experiences by technology.
   * @param technology - Technology name.
   */
  const filterByTechnology = async (technology: string) => {
    loading.value = true
    error.value = null
    selectedTechnology.value = technology
    try {
      filteredExperiences.value = await filterByTechnologyUseCase.execute(technology)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error filtering experiences'
      error.value = msg
      loggerService.error(`useExperiences - Failed to filter by technology "${technology}"`, err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetches the current active job.
   * @returns Current job response.
   */
  const getCurrentJob = async (): Promise<ExperienceResponse | null> => {
    try {
      return await getCurrentJobUseCase.execute()
    } catch (err) {
      loggerService.error('useExperiences - Failed to get current job', err)
      return null
    }
  }

  /**
   * Clears the current technology filter and resets list.
   */
  const clearFilter = () => {
    selectedTechnology.value = null
    filteredExperiences.value = experiences.value
  }

  onMounted(() => {
    loadExperiences()
  })

  return {
    // State
    experiences: filteredExperiences,
    loading,
    error,
    selectedTechnology,
    // Computed
    currentJob,
    uniqueTechnologies,
    experiencesByYear,
    // Methods
    loadExperiences,
    filterByTechnology,
    getCurrentJob,
    clearFilter,
  }
}
export default useExperiences
