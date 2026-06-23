import { ref, computed, onMounted } from 'vue'
import type { SkillResponse } from '@/application/dto/skill/SkillResponse.dto'
import { GetSkillsUseCase } from '@/application/use-cases/skill/GetSkills.usecase'
import type { ISkillRepository } from '@/domain/interfaces/ISkillRepository.interface'
import { SkillRepository } from '@/infrastructure/repositories/skill/SkillRepository.impl'
import { loggerService } from '@/infrastructure/services/Logger.service'

/**
 * Composable function to manage developer skills state.
 * Supports dependency injection of the repository.
 * @param repository - Implementation of ISkillRepository.
 */
export function useSkills(repository: ISkillRepository = new SkillRepository()) {
  const skills = ref<SkillResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getSkillsUseCase = new GetSkillsUseCase(repository)

  /**
   * Computed property grouping skills by category.
   */
  const skillsByCategory = computed(() => {
    const grouped: Record<string, SkillResponse[]> = {}
    skills.value.forEach((skill) => {
      const cat = skill.category
      if (!grouped[cat]) {
        grouped[cat] = []
      }
      grouped[cat].push(skill)
    })
    return grouped
  })

  /**
   * Loads all skills.
   */
  const loadSkills = async () => {
    loading.value = true
    error.value = null
    try {
      skills.value = await getSkillsUseCase.execute()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error loading skills'
      error.value = msg
      loggerService.error('useSkills - Failed to load skills', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadSkills()
  })

  return {
    // State
    skills,
    loading,
    error,
    // Computed
    skillsByCategory,
    // Methods
    loadSkills,
  }
}
export default useSkills
