import type { Job } from './types'

export const jobs_pt: Job[] = [
  {
    company: 'Itau Unibanco',
    role: 'Engenheira de Software Junior',
    startDate: 'Jan 2026',
    endDate: 'Atualmente',
    description:
      'Atuação no desenvolvimento de alta escala, focando na Stack Java/Kotlin e Spring Boot para a área de Recuperação de Crédito PF. Especialista em arquiteturas orientadas a eventos com Apache Kafka e AWS SQS, projetando microsserviços resilientes com particionamento otimizado, controle de backpressure e DLQs para sustentar cargas de milhões de eventos/dia com alto throughput e integridade transacional. Experiência no ciclo completo de dados por meio de pipelines ETL serverless (AWS Glue Jobs) e ingestão reativa via AWS Lambda, EventBridge e Amazon S3, alimentando bases NoSQL distribuídas em Apache Cassandra. Gestão de infraestrutura como código (Terraform), deploy em contêineres com Docker e AWS ECS e observabilidade ponta a ponta de SLIs/SLOs com Datadog, Grafana e Splunk, integrando agentes de IA (Claude Code e Devin) para maximizar a eficiência e a qualidade das entregas.',
    summary: 'Desenvolvimento de sistemas distribuídos de alta escala com arquitetura de microsserviços orientada a eventos',
    challenges: [
      'Projetar comunicação resiliente entre serviços',
      'Implementar transações distribuídas entre serviços',
      'Gerenciar consistência de dados em modelo de consistência eventual',
      'Orquestrar deployments em múltiplos microsserviços'
    ],
    skills: [
      'Event-driven Architecture',
      'Engenharia de Microsserviços de alta escala',
      'Engenharia de Dados',
      'Cloud Computing com os principais serviços da AWS (Lambda, S3, EventBridge, Glue, SQS)',
      'Infraestrutura como Código com Terraform',
      'CI/CD e DevSecOps',
      'Observabilidade ponta a ponta com Datadog, Grafana e Splunk',
      'Machine Learning com uso de agentes de IA (Claude Code e Devin)'
    ],
    technologies: [
      'Java', 'Kotlin', 'Spring Boot', 'Apache Kafka', 'AWS SQS', 'AWS Lambda', 'AWS Glue', 'Amazon S3', 'Apache Cassandra', 'Terraform', 'Docker', 'AWS ECS', 'Datadog', 'Grafana', 'Splunk', 'Claude Code', 'Devin'
    ],
  },
  {
    company: 'Itau Unibanco',
    role: 'Estagiária de Engenharia de TI',
    startDate: 'Jun 2024',
    endDate: 'Dec 2025',
    description:
      'Atuação na área de Atendimento com foco no desenvolvimento de software e na melhoria da experiência do cliente. Responsável pelo desenvolvimento de Chats Roterizados e Jornadas Conversacionais integradas a API Rest, atravez do desenvolvimento Low Code. Responsável ciclo de vida de soluções de mensageria, desde o refinamento até a implantação. Engenharia de IA e Desenvolvimento Low Code: Desenvolvimento e integração de jornadas para assistentes virtuais (Chats e Mensageria) com e sem IA Generativa, consumindo APIs REST aplicadas aos principais canais digitais de atendimento do banco (Web, Mobile, WhatsApp). Uso de ferramentas de IA para aceleração e qualidade de código, incluindo GitHub Copilot, Microsoft Copilot e Stackspot. DevOps, IaC e Observabilidade: Experiência com Terraform para Infraestrutura como Código (IaC), pipelines de CI/CD para implantação, e monitoramento de logs de APIs com Datadog. Impacto no Negócio: Entrega de jornadas de alto impacto (ex: automação de gestão de planos de saúde e tracking de cartões), resultando em redução do tempo de atendimento e maior autonomia para o usuário.',
    summary: 'Desenvolvimento de software para atendimento ao cliente com jornadas conversacionais baseadas em IA',
    challenges: [
      'Projetar jornadas conversacionais para múltiplos canais digitais',
      'Integrar IA generativa com APIs REST existentes',
      'Gerenciar ciclo de vida de mensagens do refinamento ao deployment',
      'Garantir experiência consistente do usuário entre plataformas'
    ],
    skills: [
      'Experiencia com Atendimento ao Cliente e Jornadas Conversacionais',
      'Uso de ferramentas de IA para aceleração e qualidade de código (GitHub Copilot, Microsoft Copilot, Stackspot)',
      'Experiência com Web, Mobile e WhatsApp',
      'Ferramentas de IA para aceleração de código (GitHub Copilot, Microsoft Copilot, Stackspot)',
      'Infraestrutura como Código com Terraform',
      'Pipelines de CI/CD para deployment',
      'Monitoramento de logs de APIs com Datadog'
    ],
    technologies: ['Python', 'Datadog', 'GitHub Copilot', 'Microsoft Copilot', 'Stackspot', 'Terraform', 'CI/CD'],
  },
]
