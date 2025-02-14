interface Translation {
  title: string
  description: string
  level: string
  duration: string
  modules: string
  completed: string
  reviewCourse: string
  continueLearning: string
  learningHub: string
  beginner: string
  intermediate: string
  advanced: string
  searchPlaceholder: string
  allLevels: string
  noCoursesFound: string
  tryAdjustingFilters: string
  courses: string
}

interface CourseTranslation {
  title: string
  description: string
  modules: {
    title: string
  }[]
}

export const translations: { [key: string]: Translation } = {
  en: {
    title: 'Title',
    description: 'Description',
    level: 'Level',
    duration: 'Duration',
    modules: 'modules',
    completed: 'Completed',
    reviewCourse: 'Review Course',
    continueLearning: 'Continue Learning',
    learningHub: 'Learning Hub',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    searchPlaceholder: 'Search courses...',
    allLevels: 'All Levels',
    noCoursesFound: 'No courses found',
    tryAdjustingFilters: 'Try adjusting your search or filters',
    courses: 'courses'
  },
  es: {
    title: 'Título',
    description: 'Descripción',
    level: 'Nivel',
    duration: 'Duración',
    modules: 'módulos',
    completed: 'Completado',
    reviewCourse: 'Revisar Curso',
    continueLearning: 'Continuar Aprendizaje',
    learningHub: 'Centro de Aprendizaje',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    searchPlaceholder: 'Buscar cursos...',
    allLevels: 'Todos los Niveles',
    noCoursesFound: 'No se encontraron cursos',
    tryAdjustingFilters: 'Intenta ajustar tu búsqueda o filtros',
    courses: 'cursos'
  }
}

export const courseTranslations: { [key: string]: { [key: string]: CourseTranslation } } = {
  en: {
    '1': {
      title: 'Introduction to Frax Protocol',
      description: 'Learn the basics of Frax Protocol and its core components',
      modules: [
        { title: 'What is Frax?' },
        { title: 'Understanding FRAX Stablecoin' },
        { title: 'FXS Tokenomics' }
      ]
    },
    '2': {
      title: 'Governance Participation Guide',
      description: 'Master the art of participating in Frax governance',
      modules: [
        { title: 'Governance Overview' },
        { title: 'Creating Proposals' },
        { title: 'Advanced Voting Strategies' }
      ]
    }
  },
  es: {
    '1': {
      title: 'Introducción al Protocolo Frax',
      description: 'Aprende los conceptos básicos del Protocolo Frax y sus componentes principales',
      modules: [
        { title: '¿Qué es Frax?' },
        { title: 'Entendiendo la Stablecoin FRAX' },
        { title: 'Tokenomics de FXS' }
      ]
    },
    '2': {
      title: 'Guía de Participación en Gobernanza',
      description: 'Domina el arte de participar en la gobernanza de Frax',
      modules: [
        { title: 'Descripción General de la Gobernanza' },
        { title: 'Creación de Propuestas' },
        { title: 'Estrategias Avanzadas de Votación' }
      ]
    }
  }
}
