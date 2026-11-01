export type DiagramNode = { x: number; y: number; w: number; h: number; title: string; sub?: string; isKey?: boolean };
export type DiagramEdge = { path: string; hasPacket?: boolean };

export const title = "S-Space production architecture";

export const desktop = {
  width: 720,
  height: 340,
  group: { x: 344, y: 8, w: 216, h: 246, label: "VPC" },
  labels: [
    { x: 20, y: 24, text: "Request flow" },
    { x: 20, y: 272, text: "Release flow" },
  ],
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
  ] satisfies DiagramNode[],
  edges: [
    { path: "M140 56H182", hasPacket: true },
    { path: "M302 56H368", hasPacket: true },
    { path: "M452 78V112", hasPacket: true },
    { path: "M452 172V196", hasPacket: true },
    { path: "M242 78V112" },
    { path: "M588 142H536" },
    { path: "M140 302H182", hasPacket: true },
    { path: "M302 302H330V142H368", hasPacket: true },
  ] satisfies DiagramEdge[],
};

// Màn hẹp: cùng nội dung, xếp thành hai luồng dọc để chữ không bị thu nhỏ.
export const mobileLanes: { label: string; steps: Pick<DiagramNode, "title" | "sub" | "isKey">[] }[] = [
  {
    label: "Request flow",
    steps: [
      { title: "Users" },
      { title: "CloudFront", sub: "S3 static assets" },
      { title: "ALB" },
      { title: "ECS Fargate", sub: "auth · user · center", isKey: true },
      { title: "RDS MySQL", sub: "Multi-AZ" },
    ],
  },
  {
    label: "Release flow",
    steps: [{ title: "GitLab CI" }, { title: "ECR" }, { title: "ECS Fargate", isKey: true }],
  },
];
