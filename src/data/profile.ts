export const profile = {
  name: 'Raquel Fontes',
  handle: 'raeccoon',
  location: 'São Paulo, SP',
  email: 'fontesraquel624@gmail.com',
  github: 'https://github.com/xssrae',
  linkedin: 'https://linkedin.com/in/xssrae',
  
  pt: {
    role: 'Jr Software Engineer · Backend Developer',
    bio: '4 anos de experiência em Engenharia de Software, sendo 2 anos no setor financeiro. Foco principal no ecossistema Java/Kotlin, microsserviços orientados a eventos com Apache Kafka e pipelines distribuídos na nuvem (AWS Glue, S3, Lambda).',
    education: ['Ciência da Computação - UNICID'],
    certifications: [],
  },
  
  en: {
    role: 'Jr Software Engineer · Backend Developer',
    bio: '4 years of experience in Software Engineering, with 2 years in the financial sector. Specialized in the Java/Kotlin ecosystem, event-driven microservices with Apache Kafka, and distributed pipelines in the cloud (AWS Glue, S3, Lambda).',
    education: ['Bachelor of Science in Computer Science - UNICID'],
    certifications: [],
  },

  skills: {
    languagesAndFrameworks: ['Java', 'Kotlin', 'Python', 'Spring Boot', 'Pandas'],
    cloudAndStorage: ['AWS', 'Apache Cassandra', 'PostgreSQL'],
    transformationAndOrchestration: ['Git', 'Docker', 'Terraform', 'AWS'],
    ai: ['Claude Code', 'Devin', 'Codex'],
    alsoUse: ['Apache Kafka', 'Event-Driven Architecture', 'Serverless', 'ETL/Pipelines'],
  },
}

export type SkillGroupKey = keyof typeof profile.skills
