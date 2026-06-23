import { ref, computed, onMounted } from 'vue'
import type { ProjectResponse } from '@/application/dto/project/ProjectResponse.dto'
import { GetProjectsUseCase } from '@/application/use-cases/project/GetProjects.usecase'
import type { IProjectRepository } from '@/domain/interfaces/IProjectRepository.interface'
import { ProjectRepository } from '@/infrastructure/repositories/project/ProjectRepository.impl'
import { loggerService } from '@/infrastructure/services/Logger.service'

/**
 * Composable function to manage projects state.
 * Supports dependency injection of the repository.
 * @param repository - Implementation of IProjectRepository.
 */
export function useProjects(repository: IProjectRepository = new ProjectRepository()) {
  const projects = ref<ProjectResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedTechnology = ref<string | null>(null)

  const getProjectsUseCase = new GetProjectsUseCase(repository)

  /**
   * Computed property returning only featured projects.
   */
  const featuredProjects = computed(() => {
    return projects.value.filter((p) => p.featured)
  })

  /**
   * Computed property to extract unique technologies in projects.
   */
  const uniqueTechnologies = computed(() => {
    const techSet = new Set<string>()
    projects.value.forEach((p) => {
      p.technologies.forEach((t) => techSet.add(t.name))
    })
    return Array.from(techSet).sort()
  })

  /**
   * Computed property to filter projects reactively if selectedTechnology is set.
   */
  const filteredProjects = computed(() => {
    if (!selectedTechnology.value) return projects.value
    return projects.value.filter((p) =>
      p.technologies.some((t) => t.name.toLowerCase() === selectedTechnology.value!.toLowerCase()),
    )
  })

  /**
   * Loads all projects.
   */
  const loadProjects = async () => {
    loading.value = true
    error.value = null
    try {
      projects.value = await getProjectsUseCase.execute()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error loading projects'
      error.value = msg
      loggerService.error('useProjects - Failed to load projects', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Sets technology filter.
   * @param technology - Name of the technology.
   */
  const filterByTechnology = (technology: string) => {
    selectedTechnology.value = technology
  }

  /**
   * Clears technology filter.
   */
  const clearFilter = () => {
    selectedTechnology.value = null
  }

  onMounted(() => {
    loadProjects()
  })

  return {
    // State
    projects: filteredProjects,
    loading,
    error,
    selectedTechnology,
    // Computed
    featuredProjects,
    uniqueTechnologies,
    // Methods
    loadProjects,
    filterByTechnology,
    clearFilter,
  }
}
export default useProjects
