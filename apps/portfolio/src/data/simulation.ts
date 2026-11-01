export type SimNode = { id: string; x: number; y: number; w: number; h: number; title: string; sub?: string };
export type SimStep = { edge?: string; isReverse?: boolean; node: string; isFailed?: boolean };
export type ScenarioName = "request" | "lost" | "release";

const nodeSize = { w: 150, h: 44 };

export const layouts = {
  desktop: {
    width: 720,
    height: 320,
    group: { x: 344, y: 8, w: 216, h: 246, label: "VPC" },
    nodes: [
      { id: "users", x: 20, y: 34, w: 120, h: 44, title: "Users" },
      { id: "cf", x: 182, y: 34, w: 120, h: 44, title: "CloudFront" },
      { id: "alb", x: 368, y: 34, w: 168, h: 44, title: "ALB" },
      { id: "ecs", x: 368, y: 112, w: 168, h: 60, title: "ECS Fargate", sub: "auth · user · center" },
      { id: "rds", x: 368, y: 196, w: 168, h: 48, title: "RDS MySQL", sub: "Multi-AZ" },
      { id: "toss", x: 588, y: 120, w: 120, h: 44, title: "Toss" },
      { id: "gitlab", x: 20, y: 268, w: 120, h: 44, title: "GitLab CI" },
      { id: "ecr", x: 182, y: 268, w: 120, h: 44, title: "ECR" },
    ] satisfies SimNode[],
    edges: {
      "users-cf": "M140 56H182",
      "cf-alb": "M302 56H368",
      "alb-ecs": "M452 78V112",
      "ecs-rds": "M452 172V196",
      "ecs-toss": "M536 142H588",
      "gitlab-ecr": "M140 290H182",
      "ecr-ecs": "M302 290H330V142H368",
    } as Record<string, string>,
  },
  mobile: {
    width: 340,
    height: 330,
    group: null,
    nodes: [
      { id: "users", x: 0, y: 0, ...nodeSize, title: "Users" },
      { id: "cf", x: 190, y: 0, ...nodeSize, title: "CloudFront" },
      { id: "gitlab", x: 0, y: 90, ...nodeSize, title: "GitLab CI" },
      { id: "alb", x: 190, y: 90, ...nodeSize, title: "ALB" },
      { id: "ecr", x: 0, y: 180, ...nodeSize, title: "ECR" },
      { id: "ecs", x: 190, y: 180, w: 150, h: 54, title: "ECS Fargate", sub: "3 services" },
      { id: "toss", x: 0, y: 280, ...nodeSize, title: "Toss" },
      { id: "rds", x: 190, y: 280, w: 150, h: 48, title: "RDS MySQL", sub: "Multi-AZ" },
    ] satisfies SimNode[],
    edges: {
      "users-cf": "M150 22H190",
      "cf-alb": "M265 44V90",
      "alb-ecs": "M265 134V180",
      "ecs-rds": "M265 234V280",
      "ecs-toss": "M190 222H170V302H150",
      "gitlab-ecr": "M75 134V180",
      "ecr-ecs": "M150 202H190",
    } as Record<string, string>,
  },
};

export const steps: Record<ScenarioName, SimStep[]> = {
  request: [
    { edge: "users-cf", node: "cf" },
    { edge: "cf-alb", node: "alb" },
    { edge: "alb-ecs", node: "ecs" },
    { edge: "ecs-rds", node: "rds" },
    { edge: "ecs-rds", isReverse: true, node: "ecs" },
  ],
  lost: [
    { edge: "ecs-toss", node: "toss" },
    { edge: "ecs-toss", isReverse: true, node: "ecs", isFailed: true },
    { node: "ecs", isFailed: true },
    { edge: "ecs-toss", node: "toss" },
    { edge: "ecs-toss", isReverse: true, node: "ecs" },
    { edge: "ecs-rds", node: "rds" },
  ],
  release: [
    { edge: "gitlab-ecr", node: "ecr" },
    { edge: "ecr-ecs", node: "ecs" },
    { node: "ecs" },
  ],
};
