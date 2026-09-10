import type { Project } from './types'

export const projects_eng: Project[] = [
    {
    index: 0,
    slug: 'rayo-cozy',
    title: 'Rayo Cozy',
    description: 'Web application for technology project management',
    summary:
      'Web application for technology project management, developed in Typescript and React. Allows users to create, organize and track their projects, list tasks and much more through an intuitive, responsive and gamified interface, promoting productivity and well-being.',
    impact: 'Increase in productivity and improvement in user well-being through efficient management of technology projects, tasks and habits',
    challenges: [
      'Implementing an intuitive and responsive user interface for mobile devices',
      'Integrating the application with Firebase for authentication, data storage and push notifications',
      'Ensuring the security and privacy of user data',
      'Optimizing the application performance for a seamless user experience'
    ],
    features: [
      'Creation and organization of tasks and habits',
      'Push notifications for task and habit reminders',
      'Real-time data synchronization with Firebase',
      'Intuitive and responsive user interface for mobile devices'
    ],
    githubUrl: 'https://github.com/xssrae/rayo-cozy-space',
    technologies: ['Typescript', 'React', 'Vite']
  },
  {
    index: 1,
    slug: 'noctus-service',
    title: 'Noctus Service',
    description: 'Asynchronous service for fraud detection in financial transactions',
    summary:
      'Fraud detection service for financial transactions, developed in Java with the Spring Boot Framework. It functions as an event log for transactions in real-time via Apache Kafka, processing them asynchronously and storing the results in a topic for later analysis. The system is integrated with the Noctus Lambda ETL pipeline, which enriches transactions with customer analysis and stores the final data in the Data Lake at the curated layer (Curated) in a partitioned manner (Hive Partitioning). All infrastructure is provisioned via Terraform following strict FinOps principles, ensuring operation within the AWS Free Tier (Free Usage Limits) through automatic lifecycle rules on S3 and budget limits configured in AWS Budgets.',
    impact: 'Real-time fraud detection in financial transactions, ensuring the integrity and consistency of processed data',
    challenges: [
      'Implementing asynchronous processing of financial transaction events in real-time',
      'Integrating the service with the Noctus Lambda ETL pipeline for data enrichment',
      'Ensuring the integrity and consistency of processed data',
      'Provisioning infrastructure efficiently and cost-effectively using Terraform and FinOps principles'
    ],
    features: [
      'Real-time event logging for financial transactions via Apache Kafka',
      'Asynchronous processing of events for fraud detection',
      'Integration with the Noctus Lambda ETL pipeline for data enrichment',
      'Storage of final data in the Data Lake at the curated layer (Curated) in a partitioned manner (Hive Partitioning)',
      'Infrastructure provisioning via Terraform following FinOps principles'
    ],
    githubUrl: 'https://github.com/xssrae/noctus-service',
    technologies: ['Java', 'Spring Boot', 'Apache Kafka']
  },
  {
    index: 2,
    slug: 'noctus-lambda',
    title: 'Noctus Lambda ETL Pipeline',
    description: 'Real-time analysis of financial transactions with the Lambda that consumes messages/events of transactions from the Apache Kafka topic, enriches the data for fraud and financial anomaly analysis.',
    impact:
      'Real-time enrichment of financial transaction data, enabling advanced analysis and fraud detection',
    summary:
      'Evolution of a batch ETL (Extract, Transform, Load) pipeline to a Serverless architecture oriented to events on AWS. The system consumes messages/events of transactions via Apache Kafka in real-time, enriches the transactions by cross-referencing them with a customer registry hosted in the S3 Bucket (with in-memory cache optimization), and stores the final data in the Data Lake at the curated layer (Curated) in a partitioned manner (Hive Partitioning). The data is later used for fraud and financial anomaly analysis. All infrastructure is provisioned via Terraform following strict FinOps principles, ensuring operation within the AWS Free Tier (Free Usage Limits) through automatic lifecycle rules on S3 and budget limits configured in AWS Budgets.',
    githubUrl: 'https://github.com/xssrae/noctus-lambda',
    challenges: [
      'Implementing real-time processing of financial transaction events using AWS Lambda',
      'Integrating the Lambda with the customer registry hosted in the S3 Bucket for data enrichment',
      'Ensuring the integrity and consistency of processed data',
      'Provisioning infrastructure efficiently and cost-effectively using Terraform and FinOps principles'
    ],
    features: [
      'Consumption of messages/events of financial transactions via Apache Kafka in real-time',
      'Enrichment of transaction data by cross-referencing with the customer registry hosted in the S3 Bucket (with in-memory cache optimization)',
      'Storage of final data in the Data Lake at the curated layer (Curated) in a partitioned manner (Hive Partitioning)',
      'Infrastructure provisioning via Terraform following FinOps principles'
    ],
    technologies: ['Python', 'AWS Lambda', 'AWS EventBridge', 'S3 Bucket', 'Apache Kafka', 'Terraform']
  }
]
