import type { Job } from './types'

export const jobs_pt: Job[] = [
  {
    company: 'Itaú Unibanco',
    role: 'Engenheira de Software Júnior',
    startDate: 'Jan 2026',
    endDate: 'Atualmente',
    description:
      'Desenvolvimento de sistemas distribuídos para Recuperação de Crédito PF com Java, Kotlin e Spring Boot. Construção de microsserviços orientados a eventos com Apache Kafka e AWS SQS, considerando particionamento, backpressure, DLQs e consistência transacional. Atuação também em pipelines serverless de dados, infraestrutura como código, execução em contêineres e observabilidade de serviços.',
    summary: 'Sistemas distribuídos para recuperação de crédito, com microsserviços orientados a eventos e infraestrutura AWS.',
    challenges: [
      'Projetar comunicação resiliente e assíncrona entre serviços',
      'Preservar integridade transacional em fluxos distribuídos',
      'Gerenciar consistência eventual e tratamento seguro de falhas',
      'Evoluir e observar múltiplos microsserviços em produção'
    ],
    skills: [
      'Arquitetura orientada a eventos',
      'Engenharia de microsserviços em alta escala',
      'Engenharia de Dados',
      'Cloud computing com AWS Lambda, S3, EventBridge, Glue e SQS',
      'Infraestrutura como Código com Terraform',
      'CI/CD e DevSecOps',
      'Observabilidade com Datadog, Grafana e Splunk',
      'Engenharia de software assistida por agentes de IA'
    ],
    technologies: [
      'Java', 'Kotlin', 'Spring Boot', 'Apache Kafka', 'AWS SQS', 'AWS Lambda', 'AWS Glue', 'Amazon S3', 'Apache Cassandra', 'Terraform', 'Docker', 'AWS ECS', 'Datadog', 'Grafana', 'Splunk', 'Claude Code', 'Devin'
    ],
  },
  {
    company: 'Itaú Unibanco',
    role: 'Estagiária de Engenharia de TI',
    startDate: 'Jun 2024',
    endDate: 'Dec 2025',
    description:
      'Desenvolvimento de jornadas conversacionais e soluções de mensageria para os canais Web, Mobile e WhatsApp. Integração de assistentes virtuais, com e sem IA generativa, a APIs REST por meio de plataformas low-code. Participação no ciclo completo das soluções, do refinamento à implantação, com Terraform, pipelines de CI/CD e observabilidade no Datadog.',
    summary: 'Jornadas conversacionais integradas a APIs, com foco em automação e experiência do cliente.',
    challenges: [
      'Projetar jornadas consistentes para diferentes canais digitais',
      'Integrar assistentes virtuais e IA generativa a APIs existentes',
      'Conduzir soluções de mensageria do refinamento à implantação',
      'Equilibrar automação, clareza e autonomia para o cliente'
    ],
    skills: [
      'Experiência do cliente e jornadas conversacionais',
      'Integração com canais Web, Mobile e WhatsApp',
      'Desenvolvimento low-code e integração com APIs REST',
      'Engenharia de software assistida por GitHub Copilot, Microsoft Copilot e StackSpot',
      'Infraestrutura como Código com Terraform',
      'Pipelines de CI/CD para implantação',
      'Observabilidade de APIs com Datadog'
    ],
    technologies: ['Python', 'Datadog', 'GitHub Copilot', 'Microsoft Copilot', 'Stackspot', 'Terraform', 'CI/CD'],
  },
]
