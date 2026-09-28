import type { Project } from './types'

export const projects_pt: Project[] = [
  {
    index: 0,
    slug: 'rayo-cozy',
    title: 'Rayo Cozy',
    description: 'Workspace de produtividade para organizar projetos, tarefas e tempo de foco.',
    summary:
      'Aplicação full stack construída com TypeScript, React e TanStack Start. Reúne projetos, tarefas, quadros Kanban e sessões de foco em uma experiência responsiva, com autenticação e persistência em PostgreSQL.',
    impact: 'Centraliza planejamento e execução em um fluxo simples, reduzindo a troca de contexto entre ferramentas de tarefas, projetos e controle de tempo.',
    challenges: [
      'Projetar uma interface consistente e responsiva para desktop e dispositivos móveis',
      'Modelar projetos, tarefas e conteúdo estruturado com persistência em PostgreSQL',
      'Manter o estado do cronômetro confiável entre navegações e retomadas de sessão',
      'Oferecer autenticação e isolamento seguro dos dados de cada usuário'
    ],
    features: [
      'Organização de projetos e tarefas em listas e quadro Kanban',
      'Editores dedicados com salvamento automático e recuperação de falhas',
      'Cronômetro de foco que pode ser retomado pelo servidor',
      'Relatórios e exportação de dados para acompanhamento do trabalho'
    ],
    githubUrl: 'https://github.com/xssrae/rayo-cozy-space',
    technologies: ['TypeScript', 'React', 'TanStack Start', 'PostgreSQL', 'Better Auth']
  },
  {
    index: 1,
    slug: 'noctus-service',
    title: 'Noctus Service',
    description: 'Serviço assíncrono para registrar e avaliar transações financeiras.',
    summary:
      'API em Java e Spring Boot que recebe transações, aplica regras de avaliação de fraude e publica eventos no Apache Kafka. O fluxo desacopla a resposta da API do enriquecimento posterior realizado pelo Noctus Lambda.',
    impact: 'Cria uma entrada confiável e desacoplada para o pipeline antifraude, preservando a consistência dos eventos antes do processamento analítico.',
    challenges: [
      'Processar transações de forma assíncrona sem perder eventos confirmados',
      'Definir um contrato estável entre a API, o tópico Kafka e o pipeline de enriquecimento',
      'Garantir consistência entre persistência, publicação e confirmação de offsets',
      'Reproduzir a arquitetura localmente com serviços conteinerizados'
    ],
    features: [
      'API REST para registro e avaliação inicial de transações',
      'Publicação assíncrona de eventos no Apache Kafka',
      'Integração contratual com o pipeline Noctus Lambda',
      'Ambiente local reproduzível para testes de integração'
    ],
    githubUrl: 'https://github.com/xssrae/noctus-service',
    technologies: ['Java', 'Spring Boot', 'Apache Kafka']
  },
  {
    index: 2,
    slug: 'noctus-lambda',
    title: 'Noctus Lambda',
    description: 'Pipeline serverless que enriquece transações e prepara dados para análise de fraudes.',
    impact: 
      'Transforma eventos operacionais em dados analíticos organizados, prontos para investigação de fraudes e anomalias.',
    summary:
      'Função AWS Lambda orientada a eventos que consome transações do Kafka, cruza cada registro com uma base de clientes no Amazon S3 e grava o resultado enriquecido na camada Curated do Data Lake.',
    githubUrl: 'https://github.com/xssrae/noctus-lambda',
    challenges: [
      'Adaptar eventos Kafka ao modelo de execução do AWS Lambda',
      'Enriquecer transações com a base cadastral armazenada no Amazon S3',
      'Confirmar offsets somente depois da persistência bem-sucedida',
      'Provisionar a infraestrutura com Terraform e limites de custo previsíveis'
    ],
    features: [
      'Consumo de eventos de transação publicados no Apache Kafka',
      'Enriquecimento com cadastro de clientes e cache em memória',
      'Persistência na camada Curated com particionamento no padrão Hive',
      'Infraestrutura AWS reproduzível com Terraform e LocalStack'
    ],
    technologies: ['Python', 'AWS Lambda', 'AWS EventBridge', 'Bucket S3', 'Apache Kafka', 'Terraform']
  }
]
