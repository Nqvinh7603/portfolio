export type Locale = "en" | "vi";

export type Project = {
  slug: string;
  name: string;
  company: string;
  domain: string;
  role: string;
  meta: string;
  problem?: string;
  points: string[];
  decisions?: { title: string; body: string }[];
  stack: string[];
};

export type Job = { company: string; title: string; date: string; note: string; projects: string };

export type Scenario = { label: string; logs: string[] };

export type Content = {
  name: { first: string; last: string; full: string };
  meta: { title: string; description: string };
  nav: { projects: string; experience: string; resume: string; contact: string; menu: string; theme: string; language: string; skip: string; source: string };
  actions: { downloadCv: string; viewProjects: string; caseStudy: string; allProjects: string; fullExperience: string; print: string; backToProjects: string; home: string; viewArchitecture: string; seeSimulation: string };
  cvFile: string;
  hero: { eyebrow: string; statement: string; scroll: string };
  labels: { about: string; simulation: string; work: string; experience: string; contact: string };
  facts: [string, string][];
  about: { title: string; body: string; focus: [string, string][] };
  work: { title: string };
  experience: { title: string; pageTitle: string; pageIntro: string; awardsTitle: string; awards: string[]; educationTitle: string; education: { school: string; detail: string; date: string }[] };
  contact: { title: string };
  simulation: { title: string; intro: string; caption: string; label: string; scenarios: { request: Scenario; lost: Scenario; release: Scenario } };
  projectsPage: { title: string; intro: string };
  caseStudy: { problem: string; architecture: string; delivered: string; decisions: string; stack: string; simplified: string };
  resume: { title: string; profileTitle: string; profile: string; skillsTitle: string; skills: [string, string][]; experienceTitle: string; educationTitle: string; note: string };
  notFound: { title: string; body: string };
  projects: Project[];
  jobs: Job[];
};
