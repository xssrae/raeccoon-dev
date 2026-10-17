import type { Job } from './types'

export const jobs_eng: Job[] = [
  {
    company: 'Itaú Unibanco',
    role: 'Junior Software Engineer',
    startDate: 'Jan 2026',
    endDate: 'Currently',
    description:
      'Development of distributed systems for personal credit recovery using Java, Kotlin, and Spring Boot. Building event-driven microservices with Apache Kafka and AWS SQS while addressing partitioning, backpressure, DLQs, and transactional consistency. Additional work includes serverless data pipelines, infrastructure as code, containerized workloads, and service observability.',
    summary: 'Distributed credit recovery systems built with event-driven microservices and AWS infrastructure.',
    challenges: [
      'Designing resilient asynchronous communication between services',
      'Preserving transactional integrity across distributed workflows',
      'Managing eventual consistency and reliable failure handling',
      'Evolving and observing multiple microservices in production'
    ],
    skills: [
      'Event-driven architecture',
      'High-scale microservices engineering',
      'Data Engineering',
      'Cloud computing with AWS Lambda, S3, EventBridge, Glue, and SQS',
      'Infrastructure as Code with Terraform',
      'CI/CD and DevSecOps',
      'Observability with Datadog, Grafana, and Splunk',
      'AI-assisted software engineering'
    ],
    technologies: [
      'Java','Kotlin', 'Spring Boot','Apache Kafka', 'AWS SQS', 'AWS Lambda', 'AWS Glue', 'Amazon S3', 'Apache Cassandra', 'Terraform', 'Docker', 'AWS ECS', 'Datadog', 'Grafana', 'Splunk', 'Claude Code', 'Devin'
    ],
  },
  {
    company: 'Itaú Unibanco',
    role: 'IT Engineering Intern',
    startDate: 'Jun 2024',
    endDate: 'Dec 2025',
    description:
      'Development of conversational journeys and messaging solutions for Web, Mobile, and WhatsApp channels. Integration of virtual assistants, with and without generative AI, with REST APIs through low-code platforms. Participation across the solution lifecycle, from refinement to deployment, using Terraform, CI/CD pipelines, and Datadog observability.',
    summary: 'API-integrated conversational journeys focused on automation and customer experience.',
    challenges: [
      'Designing consistent journeys across digital channels',
      'Integrating virtual assistants and generative AI with existing APIs',
      'Taking messaging solutions from refinement through deployment',
      'Balancing automation, clarity, and customer autonomy'
    ],
    skills: [
      'Customer experience and conversational journeys',
      'Integration with Web, Mobile, and WhatsApp channels',
      'Low-code development and REST API integration',
      'AI-assisted engineering with GitHub Copilot, Microsoft Copilot, and StackSpot',
      'Infrastructure as Code with Terraform',
      'CI/CD pipelines for deployment',
      'API observability with Datadog'
    ],
    technologies: [
      'Python', 'Datadog', 'GitHub Copilot', 'Microsoft Copilot', 'Stackspot', 'Terraform', 'CI/CD'
    ],
  },
]
