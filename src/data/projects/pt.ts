import type { Project } from './types'

export const projects_pt: Project[] = [
  {
    slug: 'noctus-service',
    title: 'Noctus - Serviço assincrono de detecção de fraudes em transações financeiras',
    description: 'Serviço de detecção de fraudes em transações financeiras, desenvolvido em Java com o Framework Spring Boot, funciona como um registro de eventos das transações em tempo real via Apache Kafka, processando-os de forma assíncrona e armazenando os resultados em um tópico para análise posterior. O sistema é integrado com a pipeline ETL Noctus Lambda, que enriquece as transações com analise dos clientes e armazena os dados finais no Data Lake na camada consolidada (Curated) de forma particionada (Hive Partitioning). Toda a infraestrutura é provisionada via Terraform seguindo rígidos conceitos de FinOps, garantindo a operação dentro do AWS Free Tier (Limite Gratuito) através de regras de ciclo de vida automáticas no S3 e limites de orçamento configurados no AWS Budgets.',
    githubUrl: 'https://github.com/xssrae/noctus-service',
    languages: []
  },
  {
    slug: 'noctus-lambda',
    title: 'Pipeline ETL Noctus Lambda - Analise de transações financeiras em tempo real',
    description: 'Evolução de um pipeline de ETL (Extract, Transform, Load) em lote para uma arquitetura Serverless orientada a eventos na AWS. O sistema consome mensagens/eventos de transações via Apache Kafka em tempo real, enriquece as transações cruzando-as com uma base cadastral de clientes hospedada no Amazon S3 (com otimização de cache em memória) e armazena os dados finais no Data Lake na camada consolidada (Curated) de forma particionada (Hive Partitioning). Os dados servem posterioremente para análise de fraudes e anomalias financeiras. Toda a infraestrutura é provisionada via Terraform seguindo rígidos conceitos de FinOps, garantindo a operação dentro do AWS Free Tier (Limite Gratuito) através de regras de ciclo de vida automáticas no S3 e limites de orçamento configurados no AWS Budgets.',
    githubUrl: 'https://github.com/xssrae/noctus-lambda',
    languages: ['Python', 'AWS Lambda', 'AWS EventBridge', 'Bucket S3', 'Apache Kafka', 'Terraform']
  }
]