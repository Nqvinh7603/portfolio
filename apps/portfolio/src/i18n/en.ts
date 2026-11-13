import type { Content } from "./types";

export const en: Content = {
  name: { first: "Nguyen Quang", last: "Vinh", full: "Nguyen Quang Vinh" },
  meta: {
    title: "Nguyen Quang Vinh · Backend Engineer",
    description: "Java Backend Engineer. Interbank payments, digital signature, and multi-tenant SaaS, taken all the way to production.",
  },
  nav: { projects: "Projects", experience: "Experience", resume: "Résumé", contact: "Contact", menu: "Open menu", theme: "Toggle theme", language: "Xem bằng tiếng Việt", skip: "Skip to content", source: "Site source" },
  actions: { downloadCv: "Download CV", viewProjects: "View projects", caseStudy: "Read case study", visitSite: "Visit site", allProjects: "All 10 projects", fullExperience: "Full experience & education", print: "Print", backToProjects: "All projects", home: "Back home", viewArchitecture: "View architecture", seeSimulation: "Watch this flow run" },
  cvFile: "/NguyenQuangVinh_CV_EN.pdf",
  hero: {
    eyebrow: "Backend Engineer",
    statement: "Java Backend Engineer with 3 years across interbank payments, digital signature, and multi-tenant SaaS. I build the service and take it through production releases.",
    location: "Based in Vietnam",
  },
  labels: { about: "Profile", simulation: "Live demo", work: "Case studies", experience: "Career", contact: "Say hello" },
  facts: [["3 years", "backend engineering"], ["10 projects", "banking, fintech, SaaS"], ["2 platforms", "released to production"], ["2025 award", "Highest Potential Employee"]],
  about: {
    title: "About *me*",
    body: "My background is banking and fintech, where duplicates and lost callbacks have a real cost. I also handle production releases and debug the live environment.",
    focus: [
      ["Build", "Java 17 & 21, Spring Boot, Spring Security, Spring Cloud, MyBatis, JPA"],
      ["Connect", "REST, Kafka, Toss Payments, Kakao AlimTalk, ISO 20022, HSM (PKCS#11)"],
      ["Store", "PostgreSQL, MySQL, Oracle, SQL Server, Redis"],
      ["Operate", "AWS ECS Fargate, EKS, RDS, S3, CloudFront, Docker, Kubernetes, Helm, GitLab CI, GitHub Actions, Prometheus, Grafana, Linux"],
    ],
  },
  work: { title: "Selected *work*" },
  experience: {
    title: "Work *experience*",
    pageTitle: "Experience",
    pageIntro: "Three years of Java backend work, from banking platforms to SaaS products for Korean clients.",
    openSourceTitle: "Open source",
    openSource: [
      { project: "OpenSearch", language: "Java", date: "11/2026", note: "Stopped Kafka passwords and other sensitive settings from being written to the ingestion consumer log, using Kafka's own config redaction.", label: "#23584", url: "https://github.com/opensearch-project/OpenSearch/pull/23584" },
      { project: "ureq", language: "Rust", date: "11/2026", note: "Made the HTTP client try the next resolved address when a connection fails with NetworkDown, instead of giving up on the request.", label: "#1230", url: "https://github.com/algesten/ureq/pull/1230" },
      { project: "OpenAPI Generator", language: "Java", date: "11/2026", note: "Added the missing @Nullable annotations for additionalProperties, equals and toIndentedString in the Java templates when useJspecify is on.", label: "#25586", url: "https://github.com/OpenAPITools/openapi-generator/pull/25586" },
      { project: "ArcadeDB", language: "Java", date: "11/2026", note: "Made the MongoDB-compatible server advertise wire version 9, so current PyMongo 4.x drivers can connect instead of being refused.", label: "#11374", url: "https://github.com/ArcadeData/arcadedb/pull/11374" },
    ],
    awardsTitle: "Recognition",
    awards: ["Highest Potential Employee 2025, Unit Technology Corporation", "Member of the Most Productive Team 2025, Unit Technology Corporation"],
    educationTitle: "Education & certification",
    education: [
      { school: "Can Tho University", detail: "Software Engineering", date: "09/2021 – 05/2025" },
      { school: "Linux Professional Institute (LPI)", detail: "Linux certification", date: "12/2024" },
    ],
  },
  contact: { title: "Get in *touch*" },
  simulation: {
    title: "See it *run*",
    intro: "Three real flows from S-Space: a normal request, a payment callback that gets lost, and a production release.",
    label: "Scenario",
    caption: "Simplified simulation of the S-Space flows. Not live data.",
    scenarios: {
      request: { label: "Request", logs: ["Request reaches CloudFront", "Forwarded to the ALB", "Routed to a service on ECS Fargate", "Query on Multi-AZ RDS", "Response returned to the service"] },
      lost: { label: "Lost callback", logs: ["Service confirms the payment with Toss", "Success callback never arrives", "Order stays pending", "Reconciliation job checks the payment", "Payment reported as successful", "Order recovered in the database"] },
      release: { label: "Release", logs: ["GitLab CI pushes the image to ECR", "ECS Fargate deploys the new image", "Release finished"] },
    },
  },
  projectsPage: { title: "Projects", intro: "Ten projects across banking, digital signature, SaaS, and IoT. Client details stay at the level of public engineering practice." },
  caseStudy: { problem: "The problem", architecture: "Architecture", delivered: "What I delivered", decisions: "Key decisions", stack: "Stack", simplified: "Simplified view, no client internals." },
  resume: {
    title: "Résumé",
    profileTitle: "Profile",
    profile: "Java Backend Engineer with 3 years of experience, mainly in banking and fintech: digital signature platforms with HSM/PKI and VNeID integration, document automation for Standard Chartered Bank, and the NAPAS ACH interbank payment gateway. Currently the main backend engineer of a multi-tenant SaaS and responsible for production releases of two live platforms.",
    skillsTitle: "Skills",
    skills: [
      ["Domain", "Banking & fintech (digital signature/PKI, interbank payment, payment gateway, document workflow), multi-tenant SaaS"],
      ["Backend", "Java (17, 21), Spring Boot, Spring Security (JWT, OAuth2), Spring Cloud, MyBatis, JPA/Hibernate, QueryDSL, Flyway"],
      ["Architecture", "RESTful API design, microservices, hexagonal architecture, event-driven (Kafka), multi-tenancy, RBAC"],
      ["Data & messaging", "PostgreSQL, MySQL, Oracle, SQL Server, Redis, Apache Kafka"],
      ["Integrations", "Toss Payments, Kakao AlimTalk, OAuth2 social login, PDF signing (PAdES, PKCS#7) with HSM (PKCS#11), Activiti BPMN"],
      ["DevOps & tools", "Docker, Kubernetes, Helm, GitLab CI, GitHub Actions, AWS (ECS Fargate, EKS, RDS, S3, CloudFront), Prometheus, Grafana, Linux (LPI certified), JUnit 5, Mockito, Git"],
    ],
    experienceTitle: "Experience",
    educationTitle: "Education & certification",
    note: "Contact: contact@vinhnq.com · portfolio.vinhnq.com · github.com/Nqvinh7603 · linkedin.com/in/nqvinh76",
  },
  notFound: { title: "This route doesn't resolve.", body: "The page you are looking for does not exist or has moved." },
  jobs: [
    { company: "Wala-ICT", title: "Backend Software Engineer", date: "04/2026 – Present", note: "Software products for Korean clients. Main backend engineer of a multi-tenant SaaS, responsible for production releases of live platforms.", projects: "BitBuild · S-Space · Miribom · Thinkware" },
    { company: "Unit Technology Corporation", title: "Backend Software Engineer, R&D", date: "11/2024 – 03/2026", note: "Digital signature and banking solutions. Highest Potential Employee 2025, Most Productive Team 2025.", projects: "Signature Hub · Paperless · Easy Doc · ACH Gateway · JCanary Core" },
    { company: "Laptrinhjavaweb", title: "Backend Developer", date: "09/2023 – 10/2024", note: "Java backend development.", projects: "Java · Spring Boot" },
    { company: "Straffico", title: "Freelance Backend Engineer", date: "08/2025 – Present", note: "Project and cost control platform for construction companies. Backend features and the blue-green production release pipeline.", projects: "Straffico" },
  ],
  projects: [
    {
      slug: "signature-hub", name: "Signature Hub", company: "Unit Technology Corporation", domain: "Centralized digital signing platform", role: "Backend Software Engineer", meta: "Team of 4 · banks and enterprises",
      problem: "Client systems needed one route to several signing providers without storing document content centrally.",
      points: [
        "Built backend services for signing through HSM, remote-signing providers, and VNeID.",
        "Worked on the event-driven signing flow across Spring Boot microservices on Kafka.",
        "Implemented PDF signing and validation (PAdES, PKCS#7) with HSM integration via PKCS#11.",
      ],
      decisions: [
        { title: "Process signing asynchronously", body: "Requests are published as events, processed asynchronously, and tracked by transaction code." },
        { title: "Keep sensitive content out of the hub", body: "Request bodies between agent and hub are encrypted, and the data and audit services store metadata only." },
      ],
      stack: ["Spring Cloud", "Kafka", "PostgreSQL", "PKCS#11"],
    },
    {
      slug: "ach-gateway", name: "ACH Gateway", company: "Unit Technology Corporation", domain: "NAPAS interbank payment gateway", role: "Backend Software Engineer", meta: "Team of 12 · banking",
      problem: "Interbank messages had to be validated, tracked, and reconciled across NAPAS and Core Banking.",
      points: [
        "Implemented inward-deposit processing on ISO 20022 pacs.008 with validation, business rules, status tracking, and process logging.",
        "Developed reconciliation against NAPAS and Core Banking records to detect mismatches.",
        "Optimized SQL for transaction logs and latest-status lookup.",
        "Implemented the camt.033 copy-transaction flow.",
      ],
      decisions: [
        { title: "Compare against both sides", body: "Reconciliation checks internal transactions against NAPAS and Core Banking records, so a mismatch is visible whichever side it starts on." },
        { title: "Log the process, not only the result", body: "Inward-deposit processing keeps status tracking and process logging alongside validation and business rules." },
      ],
      stack: ["Spring Boot", "SQL Server", "Redis", "ISO 20022"],
    },
    {
      slug: "s-space", name: "S-Space", company: "Wala-ICT", domain: "Pilates & fitness studio SaaS", role: "Backend Engineer", meta: "Team of 5 · live at s-space.co.kr",
      problem: "A live microservices platform needed dependable releases and day-to-day production support.",
      points: [
        "Maintained and debugged the production AWS environment: VPC with private subnets, ECS Fargate, Multi-AZ RDS, ALB, CloudFront, S3, and Secrets Manager.",
        "Handled production releases through GitLab CI → ECR → ECS Fargate as main backend maintainer of the auth, user, and center services.",
        "Built a reconciliation job that recovers payments with lost success callbacks and expires stale pending ones.",
        "Extended Toss Payments with a head-office merchant flow for B2B orders: idempotent confirmation, cancel and refund, fee and settlement tracking.",
        "Implemented configurable payroll settlement periods and migrated legacy member data with re-runnable scripts, verified on staging first.",
      ],
      decisions: [
        { title: "Treat a payment callback as something that can get lost", body: "A success callback is not guaranteed to arrive, so a reconciliation job recovers those payments and expires stale pending ones." },
        { title: "Make data migration re-runnable", body: "Legacy member data moved with scripts that can run again safely, and each run was verified on staging before production." },
      ],
      stack: ["Java 17", "ECS Fargate", "RDS MySQL", "CloudFront"],
    },
    {
      slug: "bitbuild", name: "BitBuild", company: "Wala-ICT", domain: "Multi-tenant construction procurement SaaS", role: "Main Backend Engineer", meta: "Team of 4 · first sprint to production",
      problem: "A new multi-tenant product needed clear boundaries and purchase flows that never duplicate.",
      points: [
        "Restructured the codebase into a multi-module hexagonal architecture, with ArchUnit tests enforcing boundaries.",
        "Used idempotency keys against duplicate purchase orders and advisory locks for run-once scheduled jobs.",
        "Set up GitLab CI and Docker Compose deployments with health checks.",
        "Built multi-tenant authentication: JWT with refresh-token rotation, Redis-based revocation, social login, and RBAC with data scopes (self, assigned sites, tenant-wide).",
        "Owned the domain model, PostgreSQL schema, and REST APIs for procurement, contract, approval, and supplier modules.",
      ],
      decisions: [
        { title: "Enforce architecture with tests", body: "ArchUnit tests keep layer boundaries from eroding as the multi-module hexagonal codebase grows." },
        { title: "Assume every send and job can repeat", body: "Idempotency keys stop duplicate purchase-order transmission, and PostgreSQL advisory locks make scheduled jobs run once across instances." },
      ],
      stack: ["Java 21", "PostgreSQL", "Redis", "GitLab CI"],
    },
    {
      slug: "miribom", name: "Miribom", company: "Wala-ICT", domain: "Beauty booking with AI face simulation", role: "Backend Engineer", meta: "Team of 9 · live at miribom.kr",
      points: [
        "Built Kakao AlimTalk notifications end to end: template APIs and an outbox-based sender with SKIP LOCKED claiming, retry with back-off, and SMS fallback.",
        "Integrated the Spring backend with a FastAPI AI service: async jobs with status polling, retry limits, and locking against duplicate re-queues.",
        "Owned production releases through GitLab CI on self-hosted runners, with Docker Compose builds and Caddy reverse proxy reload.",
        "Delivered refund flows and card payment for deposits with Toss Payments.",
      ],
      stack: ["Java 21", "Axon", "PostgreSQL", "GitLab CI"],
    },
    {
      slug: "thinkware", name: "Thinkware Payback", company: "Wala-ICT", domain: "IoT food-waste disposer with payback points", role: "Backend Engineer", meta: "Bluevent ID devices · AWS IoT",
      problem: "Disposer runs arrive as device events that can repeat or come out of order, and every run turns into points that are paid out.",
      points: [
        "Fixed a double-payout bug where a late, out-of-order step event from SQS restarted the session and counted one run twice: run boundaries now follow event time, not arrival order.",
        "Fixed a Redis-cached open session that was already closed in the database, and aligned period statistics with the points on the run's completion time.",
        "Built the app's Payback APIs: subscription status per device, monthly and 12-month missed points for non-subscribers using the same rounding and cap as settlement, and line detail with settlement dates on payouts.",
      ],
      stack: ["Java 21", "PostgreSQL", "Redis", "AWS IoT"],
    },
    {
      slug: "paperless", name: "Paperless", company: "Unit Technology Corporation", domain: "Digital signature module", role: "Main backend of the signing module", meta: "Team of 6",
      points: [
        "Built internal signing, external signing by email, and third-party eSign integrations including VNeID.",
        "Implemented signature revert and signer reassignment so an in-progress flow can roll back or change signers without restarting.",
        "Fixed bugs and refactored the module to keep multi-step signing workflows stable.",
      ],
      stack: ["Spring Boot", "PostgreSQL", "PAdES"],
    },
    {
      slug: "easy-doc", name: "Easy Doc", company: "Unit Technology Corporation", domain: "Document automation for Standard Chartered", role: "Backend Software Engineer", meta: "Team of 5 · banking",
      points: [
        "Built backend APIs for digital forms and document automation on the Paperless platform.",
        "Implemented document processing and multi-level approval workflows with Activiti BPMN.",
        "Developed Quartz batch jobs on SQL Server and covered services with JUnit and Mockito.",
      ],
      stack: ["Spring Boot", "Activiti BPMN", "SQL Server"],
    },
    {
      slug: "jcanary-core", name: "JCanary Core", company: "Unit Technology Corporation", domain: "Internal Java and Spring framework", role: "Backend Software Engineer", meta: "Team of 5 · in-house platform",
      points: ["Contributed reusable modules: secrets management with HashiCorp Vault, multi-database data access, storage abstraction, and shared HSM signing utilities."],
      stack: ["Spring Boot", "Vault", "Flyway"],
    },
    {
      slug: "straffico", name: "Straffico", company: "Straffico", domain: "Project and cost control for construction companies", role: "Backend Engineer", meta: "Freelance · Java 21",
      problem: "Construction companies needed sites, warehouses, accounting, and management working from the same numbers.",
      points: [
        "Built the GitHub Actions deployment for dev and prod: the JAR is built on the runner, then a blue-green switch releases it with zero downtime.",
        "Added a deploy lock so two repositories never release to the same server at once.",
        "Reconciled actual and system fund balances, and built analytics, report builder, and resource schedule APIs.",
        "Added Web Push notifications, user activity audit, and support request IDs correlated across responses and logs.",
      ],
      decisions: [
        { title: "Release with a blue-green switch", body: "The new version starts beside the live one, and traffic switches only then, so production releases need no downtime window." },
        { title: "Keep actual and system balances separate", body: "Actual and system fund balances are tracked as two values and reconciled, so a difference stays visible instead of being overwritten." },
      ],
      stack: ["Java 21", "MyBatis", "Redis", "GitHub Actions"],
    },
  ],
};
