import type { Project } from './types'

export const projects_eng: Project[] = [
  {
    slug: 'noctus',
    title: 'Noctus - Asynchronous Fraud Detection Service for Financial Transactions',
    description: 'A fraud detection service for financial transactions, developed in Java with the Spring Boot Framework. It functions as a real-time event log of transactions via Apache Kafka, processing them asynchronously and storing the results in a topic for later analysis. The system is integrated with the Noctus Lambda ETL pipeline, which enriches transactions with customer analysis and stores the final data in the Data Lake at the curated layer (Curated) in a partitioned manner (Hive Partitioning). All infrastructure is provisioned via Terraform following strict FinOps principles, ensuring operation within the AWS Free Tier (Free Usage Limits) through automatic lifecycle rules on S3 and budget limits configured in AWS Budgets.',
    githubUrl: 'https://github.com/xssrae/noctus',
    languages: ['Java', 'Spring Boot', 'Apache Kafka']
  },
  {
    slug: 'noctus-lambda',
    title: 'Serverless ETL Pipeline',
    description: 'A evolution of a batch ETL (Extract, Transform, Load) pipeline into an event-driven Serverless architecture on AWS. The system consumes sales messages/events transmitted via Apache Kafka in real-time, enriches the transactions by cross-referencing them with a customer database hosted on Amazon S3 (with in-memory cache optimization), and stores the final data in the Data Lake at the curated layer (Curated) in a partitioned manner (Hive Partitioning). All infrastructure is provisioned via Terraform following strict FinOps principles, ensuring operation within the AWS Free Tier (Free Usage Limits) through automatic lifecycle rules on S3 and budget limits configured in AWS Budgets.',
    githubUrl: 'https://github.com/xssrae/noctus-lambda',
    languages: ['Python', 'AWS Lambda', 'AWS EventBridge', 'Amazon S3', 'Apache Kafka', 'Terraform']
  }
]
