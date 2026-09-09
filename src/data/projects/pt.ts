import type { Project } from './types'

export const projects_pt: Project[] = [
  {
    index: 0,
    slug: 'rayo-cozy',
    title: 'Rayo Cozy',
    description: 'Aplicação Web de gerenciamento de projetos de tecnologia',
    summary:
      'Aplicação Web de gerenciamento de projetos de tecnologia, desenvolvido em Typescript e React. Permite aos usuários criar, organizar e acompanhar seus projetos, listar tasks e muito mais por meio de uma interface intuitiva, responsiva e gamificada, promovendo a produtividade e o bem-estar.',
    impact: 'Aumento da produtividade e melhoria do bem-estar dos usuários através do gerenciamento eficiente de projetos de tecnnomologia, tarefas e hábitos',
    challenges: [
      'Implementar uma interface de usuário intuitiva e responsiva para dispositivos móveis',
      'Integrar o aplicativo com o Firebase para autenticação, armazenamento de dados e notificações push',
      'Garantir a segurança e privacidade dos dados dos usuários',
      'Otimizar o desempenho do aplicativo para uma experiência de usuário fluida'
    ],
    features: [
      'Criação e organização de tarefas e hábitos',
      'Notificações push para lembretes de tarefas e hábitos',
      'Sincronização de dados em tempo real com o Firebase',
      'Interface de usuário intuitiva e responsiva para dispositivos móveis'
    ],
    githubUrl: 'https://github.com/xssrae/rayo-cozy-space',
    technologies: ['Typescript', 'React', 'Vite']
  },
  {
    index: 1,
    slug: 'noctus-service',
    title: 'Noctus Service',
    description:'Serviço assincrono de detecção de fraudes em transações financeiras',
    summary:
    'Serviço de detecção de fraudes em transações financeiras, desenvolvido em Java e Spring Boot. Rregistra eventos em tempo real via Apache Kafka para análise posterior.',
    impact: 'Detecção de fraudes em transações financeiras em tempo real, garantindo a integridade e consistência dos dados processados',
    challenges: [
      'Implementar processamento assíncrono de eventos de transações financeiras em tempo real',
      'Integrar o serviço com a pipeline ETL Noctus Lambda para enriquecimento de dados',
      'Garantir a integridade e consistência dos dados processados',
      'Provisionar a infraestrutura de forma eficiente e econômica utilizando Terraform e princípios de FinOps'
    ],
    features: [
      'Registro de eventos de transações financeiras em tempo real via Apache Kafka',
      'Processamento assíncrono de eventos para detecção de fraudes',
      'Integração com a pipeline ETL Noctus Lambda para enriquecimento de dados', 
      'Armazenamento dos dados finais no Data Lake na camada consolidada (Curated) de forma particionada (Hive Partitioning)',
      'Provisionamento da infraestrutura via Terraform seguindo princípios de FinOps'
    ],
    githubUrl: 'https://github.com/xssrae/noctus-service',
    technologies: ['Java', 'Spring Boot', 'Apache Kafka']
  },
  {
    index: 2,
    slug: 'noctus-lambda',
    title: 'Pipeline ETL Noctus Lambda',
    description:'Analise de transações financeiras em tempo real com o Lambda que consome mensagens/eventos de transações do tópico Apache Kafka, enriquece os dados para análise de fraudes e anomalias financeiras.',
    impact: 
      'Enriquecimento de dados de transações financeiras em tempo real, permitindo a análise avançada e detecção de fraudes',
    summary:
      'Evolução de um pipeline de ETL (Extract, Transform, Load) em lote para uma arquitetura Serverless orientada a eventos na AWS. O sistema consome mensagens/eventos de transações via Apache Kafka em tempo real, enriquece as transações cruzando-as com uma base cadastral de clientes hospedada no Bucket S3 (com otimização de cache em memória) e armazena os dados finais no Data Lake na camada consolidada (Curated) de forma particionada (Hive Partitioning). Os dados servem posterioremente para análise de fraudes e anomalias financeiras. Toda a infraestrutura é provisionada via Terraform seguindo rígidos conceitos de FinOps, garantindo a operação dentro do AWS Free Tier (Limite Gratuito) através de regras de ciclo de vida automáticas no S3 e limites de orçamento configurados no AWS Budgets.',
    githubUrl: 'https://github.com/xssrae/noctus-lambda',
    challenges: [
      'Implementar processamento de eventos de transações financeiras em tempo real utilizando AWS Lambda',
      'Integrar o Lambda com a base cadastral de clientes hospedada no Bucket S3 para enriquecimento de dados',
      'Garantir a integridade e consistência dos dados processados',
      'Provisionar a infraestrutura de forma eficiente e econômica utilizando Terraform e princípios de FinOps'
    ],
    features: [
      'Consumo de mensagens/eventos de transações financeiras via Apache Kafka em tempo real',
      'Enriquecimento de dados de transações cruzando-os com a base cadastral de clientes hospedada no Bucket S3 (com otimização de cache em memória)',
      'Armazenamento dos dados finais no Data Lake na camada consolidada (Curated) de forma particionada (Hive Partitioning)',
      'Provisionamento da infraestrutura via Terraform seguindo princípios de FinOps'
    ],
    technologies: ['Python', 'AWS Lambda', 'AWS EventBridge', 'Bucket S3', 'Apache Kafka', 'Terraform']
  }
]