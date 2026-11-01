export const links = {
  // Bản CV công khai đã bỏ số điện thoại. Có file trong public/ thì đổi thành "/NguyenQuangVinh_CV.pdf" để hiện nút.
  cv: null as string | null,
  github: "https://github.com/Nqvinh7603",
  linkedin: "https://linkedin.com/in/nqvinh76",
  email: "mailto:contact@vinhnq.com",
};

export const projects = [
  {
    name: "S-Space",
    domain: "Pilates & fitness studio SaaS",
    role: "Backend Engineer · live at s-space.co.kr",
    points: [
      "Set up and documented the production AWS environment: private subnets, ECS Fargate, Multi-AZ RDS, ALB, CloudFront.",
      "Handled production releases through GitLab CI → ECR → ECS Fargate.",
      "Built a reconciliation job that recovers payments with lost success callbacks.",
    ],
    tags: ["ECS Fargate", "RDS", "CloudFront"],
  },
  {
    name: "ACH Gateway",
    domain: "NAPAS interbank payment gateway",
    role: "Backend Software Engineer · team of 12",
    points: [
      "Implemented inward-deposit processing on ISO 20022 pacs.008 with validation, status tracking, and process logging.",
      "Developed reconciliation against NAPAS and Core Banking records to detect mismatches.",
      "Optimized SQL for transaction logs and latest-status lookup.",
    ],
    tags: ["Spring Boot", "SQL Server", "ISO 20022"],
  },
  {
    name: "BitBuild",
    domain: "Multi-tenant construction procurement SaaS",
    role: "Main Backend Engineer · team of 4",
    points: [
      "Restructured the codebase into a multi-module hexagonal architecture, with ArchUnit tests enforcing boundaries.",
      "Used idempotency keys against duplicate purchase orders and advisory locks for run-once scheduled jobs.",
      "Set up GitLab CI and Docker Compose deployments with health checks.",
    ],
    tags: ["Java 21", "PostgreSQL", "GitLab CI"],
  },
];

export const experience = [
  {
    company: "Wala-ICT",
    title: "Backend Software Engineer",
    date: "04/2026 – Present",
    note: "Software products for Korean clients; responsible for production releases of live platforms.",
  },
  {
    company: "Unit Technology Corporation",
    title: "Backend Software Engineer",
    date: "11/2024 – 03/2026",
    note: "Digital signature and banking solutions. Highest Potential Employee 2025.",
  },
  {
    company: "Laptrinhjavaweb",
    title: "Backend Developer",
    date: "09/2023 – 10/2024",
    note: "Java backend development.",
  },
];

export const skills = [
  ["Cloud & DevOps", "AWS (ECS Fargate, RDS, S3, CloudFront), Docker, GitLab CI, GitHub Actions, Linux (LPI certified)"],
  ["Backend", "Java 17 & 21, Spring Boot, Spring Security, Spring Cloud, MyBatis, JPA/Hibernate, Flyway"],
  ["Architecture", "REST API design, microservices, hexagonal, event-driven (Kafka), multi-tenancy, RBAC"],
  ["Data & messaging", "PostgreSQL, MySQL, Oracle, SQL Server, Redis, Apache Kafka"],
];

export const writing = [
  {
    name: "Blog",
    description: "Lessons from payments, signing, and production releases.",
    host: "blog.vinhnq.com",
  },
  {
    name: "Interview notes",
    description: "Public notes on Java, system design, and DevOps.",
    host: "interview.vinhnq.com",
  },
];
