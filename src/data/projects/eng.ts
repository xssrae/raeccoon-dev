import type { Project } from './types'

export const projects_eng: Project[] = [
    {
    index: 0,
    slug: 'rayo-cozy',
    title: 'Rayo Cozy',
    description: 'A productivity workspace for organizing projects, tasks, and focus time.',
    summary:
      'A full-stack application built with TypeScript, React, and TanStack Start. It brings projects, tasks, Kanban boards, and focus sessions into a responsive experience with authentication and PostgreSQL persistence.',
    impact: 'Brings planning and execution into one clear workflow, reducing context switching between project, task, and time-tracking tools.',
    challenges: [
      'Designing a consistent responsive interface for desktop and mobile devices',
      'Modeling projects, tasks, and structured content with PostgreSQL persistence',
      'Keeping the focus timer reliable across navigation and resumed sessions',
      'Providing authentication and secure isolation of each user’s data'
    ],
    features: [
      'Project and task organization through lists and a Kanban board',
      'Dedicated editors with autosave and failure recovery',
      'Server-resumable focus timer',
      'Reports and data export for tracking completed work'
    ],
    githubUrl: 'https://github.com/xssrae/rayo-cozy-space',
    technologies: ['TypeScript', 'React', 'TanStack Start', 'PostgreSQL', 'Better Auth']
  },
  {
    index: 1,
    slug: 'noctus-service',
    title: 'Noctus Service',
    description: 'An asynchronous service for recording and assessing financial transactions.',
    summary:
      'A Java and Spring Boot API that receives transactions, applies fraud assessment rules, and publishes events to Apache Kafka. The flow decouples the API response from the enrichment later performed by Noctus Lambda.',
    impact: 'Provides a reliable, decoupled entry point for the fraud pipeline while preserving event consistency before analytical processing.',
    challenges: [
      'Processing transactions asynchronously without losing confirmed events',
      'Defining a stable contract between the API, Kafka topic, and enrichment pipeline',
      'Maintaining consistency across persistence, publication, and offset commits',
      'Reproducing the architecture locally with containerized services'
    ],
    features: [
      'REST API for transaction recording and initial assessment',
      'Asynchronous event publishing through Apache Kafka',
      'Contract-based integration with the Noctus Lambda pipeline',
      'Reproducible local environment for integration testing'
    ],
    githubUrl: 'https://github.com/xssrae/noctus-service',
    technologies: ['Java', 'Spring Boot', 'Apache Kafka']
  },
  {
    index: 2,
    slug: 'noctus-lambda',
    title: 'Noctus Lambda',
    description: 'A serverless pipeline that enriches transactions for fraud analysis.',
    impact:
      'Turns operational events into organized analytical data for fraud and anomaly investigation.',
    summary:
      'An event-driven AWS Lambda function that consumes Kafka transactions, matches each record with customer data in Amazon S3, and writes the enriched result to the Data Lake Curated layer.',
    githubUrl: 'https://github.com/xssrae/noctus-lambda',
    challenges: [
      'Adapting Kafka events to the AWS Lambda execution model',
      'Enriching transactions with the customer registry stored in Amazon S3',
      'Committing offsets only after persistence succeeds',
      'Provisioning infrastructure with Terraform and predictable cost limits'
    ],
    features: [
      'Consumption of transaction events published to Apache Kafka',
      'Customer data enrichment with an in-memory cache',
      'Curated-layer persistence using Hive-style partitioning',
      'Reproducible AWS infrastructure with Terraform and LocalStack'
    ],
    technologies: ['Python', 'AWS Lambda', 'AWS EventBridge', 'S3 Bucket', 'Apache Kafka', 'Terraform']
  }
]
