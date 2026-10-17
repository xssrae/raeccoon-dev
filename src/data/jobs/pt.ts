import type { Job } from './types'

export const jobs_pt: Job[] = [
  {
    company: 'Itaú Unibanco',
    role: 'Engenheira de Software Júnior',
    startDate: 'Jan 2026',
    endDate: 'Atualmente',
    description:
      'Atuo com Desenvolvimento de sistemas distribuídos para a comunidade de Recuperação PF utilizando como Stack principal Java, Kotlin e Spring Boot. Realizo a contrução de microsserviços orientados a eventos com Apache Kafka e AWS SQS, considerando particionamento, backpressure, DLQs e consistência transacional. Parte da minha atuação também consiste no desenvolvimento de pipelines serverless de dados, infraestrutura como código, execução em contêineres e observabilidade de serviços.',
    summary: 'Sistemas distribuídos para recuperação de crédito, com microsserviços orientados a eventos e infraestrutura AWS.',
    challenges: [
      'Desenvolver comunicação assíncrona entre serviços',
      'Preservar integridade transacional em fluxos de dados distribuídos',
      'Gerenciar testes IaaC, TaaC e Observabilidade de microsserviços',
      'Utilizar ferramentas de Inteligência Artificial em todas as etapas do desenvolvimento de software'
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
      'Trabalhei durante 1 ano e 6 meses com o Desenvolvimento de Jornadas Conversacionais na comunidade Atendimento para os principais canais de atendimento do banco em ambientes Web, Mobile e WhatsApp. Realizei a integração de chatbots, com e sem IA generativa, a APIs REST por meio de plataformas Low-Code. Participei do ciclo completo das soluções, do refinamento à implantação, com Terraform, pipelines de CI/CD e observabilidade no Datadog.', 
      
    summary: 'Jornadas conversacionais integradas a APIs, com foco em automação e experiência do cliente.',
    challenges: [
      'Projetar jornadas conversacionais para diferentes canais digitais',
      'Integrar assistentes virtuais e IA generativa a APIs existentes',
      'Conduzir soluções de mensageria do refinamento à implantação',
      'Equilibrar automação, clareza e autonomia para o cliente'
    ],
    skills: [
      'Experiência do cliente',
      'Integração com canais Web, Mobile e WhatsApp',
      'Desenvolvimento Low-Code e integração com APIs REST',
      'Vibe Coding com Copilot e StackSpot',
      'Observabilidade de APIs com Datadog'
    ],
    technologies: ['Python', 'Datadog','Microsoft Copilot', 'Stackspot', 'Terraform', 'CI/CD'],
  },
]