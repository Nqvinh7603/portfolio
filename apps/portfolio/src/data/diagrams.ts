export type DiagramNode = { x: number; y: number; w: number; h: number; title: string; sub?: string; isKey?: boolean };
export type DiagramEdge = { path: string; hasPacket?: boolean };
type MobileStep = Pick<DiagramNode, "title" | "sub" | "isKey">;

export type Diagram = {
  title: string;
  width: number;
  height: number;
  groups: { x: number; y: number; w: number; h: number; label: string }[];
  labels: { x: number; y: number; text: string }[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  lanes: { label: string; steps: MobileStep[] }[];
};

export const diagrams: Record<string, Diagram> = {
  straffico: {
    title: "Straffico blue-green release",
    width: 720,
    height: 330,
    groups: [],
    labels: [{ x: 20, y: 24, text: "Request" }, { x: 20, y: 240, text: "Release" }],
    nodes: [
      { x: 20, y: 60, w: 130, h: 64, title: "Admin web", sub: "React" },
      { x: 230, y: 40, w: 200, h: 64, title: "API · blue", sub: "live version", isKey: true },
      { x: 230, y: 130, w: 200, h: 64, title: "API · green", sub: "new version" },
      { x: 530, y: 40, w: 170, h: 44, title: "Redis" },
      { x: 530, y: 100, w: 170, h: 44, title: "Database" },
      { x: 20, y: 250, w: 150, h: 64, title: "GitHub Actions", sub: "builds the JAR" },
      { x: 230, y: 250, w: 200, h: 64, title: "bg-switch", sub: "one deploy at a time" },
    ],
    edges: [
      { path: "M150 92H190V72H230", hasPacket: true },
      { path: "M430 72H480V62H530" },
      { path: "M480 72V122H530", hasPacket: true },
      { path: "M170 282H230", hasPacket: true },
      { path: "M330 250V194", hasPacket: true },
    ],
    lanes: [
      { label: "Request", steps: [{ title: "Admin web", sub: "React" }, { title: "API · blue", sub: "live version", isKey: true }, { title: "Redis and database" }] },
      { label: "Release", steps: [{ title: "GitHub Actions", sub: "builds the JAR" }, { title: "bg-switch", sub: "one deploy at a time" }, { title: "API · green", sub: "new version" }] },
    ],
  },
  "s-space": {
    title: "S-Space production architecture",
    width: 720,
    height: 340,
    groups: [{ x: 344, y: 8, w: 216, h: 246, label: "VPC" }],
    labels: [{ x: 20, y: 24, text: "Request" }, { x: 20, y: 272, text: "Release" }],
    nodes: [
      { x: 20, y: 34, w: 120, h: 44, title: "Users" },
      { x: 182, y: 34, w: 120, h: 44, title: "CloudFront" },
      { x: 368, y: 34, w: 168, h: 44, title: "ALB" },
      { x: 182, y: 112, w: 120, h: 44, title: "S3" },
      { x: 368, y: 112, w: 168, h: 60, title: "ECS Fargate", sub: "auth · user · center", isKey: true },
      { x: 368, y: 196, w: 168, h: 48, title: "RDS MySQL", sub: "Multi-AZ" },
      { x: 588, y: 120, w: 120, h: 44, title: "Secrets Mgr" },
      { x: 20, y: 280, w: 120, h: 44, title: "GitLab CI" },
      { x: 182, y: 280, w: 120, h: 44, title: "ECR" },
    ],
    edges: [
      { path: "M140 56H182", hasPacket: true },
      { path: "M302 56H368", hasPacket: true },
      { path: "M452 78V112", hasPacket: true },
      { path: "M452 172V196", hasPacket: true },
      { path: "M242 78V112" },
      { path: "M588 142H536" },
      { path: "M140 302H182", hasPacket: true },
      { path: "M302 302H330V142H368", hasPacket: true },
    ],
    lanes: [
      { label: "Request", steps: [{ title: "Users" }, { title: "CloudFront", sub: "S3 static assets" }, { title: "ALB" }, { title: "ECS Fargate", sub: "auth · user · center", isKey: true }, { title: "RDS MySQL", sub: "Multi-AZ" }] },
      { label: "Release", steps: [{ title: "GitLab CI" }, { title: "ECR" }, { title: "ECS Fargate", isKey: true }] },
    ],
  },
  "ach-gateway": {
    title: "ACH Gateway inward-deposit flow",
    width: 720,
    height: 310,
    groups: [],
    labels: [{ x: 20, y: 24, text: "Interbank" }],
    nodes: [
      { x: 20, y: 50, w: 140, h: 64, title: "NAPAS ACH", sub: "ISO 20022" },
      { x: 230, y: 50, w: 220, h: 64, title: "ACH Gateway", sub: "pacs.008 · camt.033", isKey: true },
      { x: 540, y: 50, w: 160, h: 64, title: "Core Banking", sub: "APIs" },
      { x: 230, y: 170, w: 100, h: 44, title: "SQL Server" },
      { x: 350, y: 170, w: 100, h: 44, title: "Redis" },
      { x: 230, y: 250, w: 220, h: 48, title: "Reconciliation", sub: "internal · NAPAS · Core" },
    ],
    edges: [
      { path: "M160 82H230", hasPacket: true },
      { path: "M450 82H540", hasPacket: true },
      { path: "M290 114V170" },
      { path: "M390 114V170" },
      { path: "M280 214V250" },
      { path: "M230 274H90V114", hasPacket: true },
      { path: "M450 274H620V114", hasPacket: true },
    ],
    lanes: [
      { label: "Interbank", steps: [{ title: "NAPAS ACH", sub: "ISO 20022" }, { title: "ACH Gateway", sub: "pacs.008 · camt.033", isKey: true }, { title: "Core Banking", sub: "APIs" }] },
      { label: "Control", steps: [{ title: "Reconciliation", sub: "internal · NAPAS · Core" }] },
    ],
  },
  bitbuild: {
    title: "BitBuild multi-tenant backend",
    width: 720,
    height: 330,
    groups: [],
    labels: [{ x: 20, y: 24, text: "Request" }, { x: 20, y: 262, text: "Release" }],
    nodes: [
      { x: 20, y: 60, w: 120, h: 64, title: "Tenants", sub: "web clients" },
      { x: 200, y: 50, w: 240, h: 84, title: "REST API", sub: "Hexagonal · JWT · RBAC", isKey: true },
      { x: 540, y: 20, w: 160, h: 44, title: "MinIO (S3)" },
      { x: 540, y: 70, w: 160, h: 44, title: "Redis" },
      { x: 540, y: 120, w: 160, h: 44, title: "PostgreSQL" },
      { x: 200, y: 180, w: 240, h: 50, title: "Scheduled jobs", sub: "advisory locks" },
      { x: 20, y: 270, w: 120, h: 44, title: "GitLab CI" },
      { x: 200, y: 270, w: 240, h: 44, title: "Docker Compose" },
    ],
    edges: [
      { path: "M140 92H200", hasPacket: true },
      { path: "M440 92H540" },
      { path: "M490 92V42H540" },
      { path: "M490 92V142H540", hasPacket: true },
      { path: "M440 205H510V152H540" },
      { path: "M140 292H200", hasPacket: true },
    ],
    lanes: [
      { label: "Request", steps: [{ title: "Tenants", sub: "web clients" }, { title: "REST API", sub: "Hexagonal · JWT · RBAC", isKey: true }, { title: "PostgreSQL", sub: "with Redis and MinIO" }] },
      { label: "Release", steps: [{ title: "GitLab CI" }, { title: "Docker Compose" }] },
    ],
  },
  "signature-hub": {
    title: "Signature Hub signing flow",
    width: 720,
    height: 310,
    groups: [{ x: 196, y: 8, w: 300, h: 196, label: "Signing hub" }],
    labels: [{ x: 20, y: 24, text: "On-premise" }, { x: 516, y: 24, text: "Signers" }],
    nodes: [
      { x: 20, y: 40, w: 136, h: 64, title: "Sign agent", sub: "client systems" },
      { x: 216, y: 40, w: 118, h: 64, title: "Gateway", sub: "ingress" },
      { x: 360, y: 40, w: 118, h: 64, title: "RS-Hub", isKey: true },
      { x: 216, y: 130, w: 262, h: 56, title: "Kafka", sub: "tracked by transaction code" },
      { x: 516, y: 34, w: 184, h: 44, title: "HSM" },
      { x: 516, y: 88, w: 184, h: 44, title: "Remote signing" },
      { x: 516, y: 142, w: 184, h: 44, title: "VNeID" },
      { x: 216, y: 240, w: 118, h: 48, title: "Data", sub: "metadata" },
      { x: 360, y: 240, w: 118, h: 48, title: "Audit", sub: "metadata" },
    ],
    edges: [
      { path: "M156 72H216", hasPacket: true },
      { path: "M334 72H360", hasPacket: true },
      { path: "M478 72H497V56H516" },
      { path: "M478 72H497V110H516", hasPacket: true },
      { path: "M497 110V164H516" },
      { path: "M275 104V130" },
      { path: "M419 104V130" },
      { path: "M275 186V240", hasPacket: true },
      { path: "M419 186V240", hasPacket: true },
    ],
    lanes: [{ label: "Signing", steps: [{ title: "Sign agent", sub: "client systems" }, { title: "Gateway", sub: "ingress" }, { title: "Kafka", sub: "tracked by transaction code" }, { title: "RS-Hub", isKey: true }, { title: "HSM · Remote · VNeID" }] }],
  },
};
