import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
};

export interface ProjectInterface {
    title: string;
    desc: string;
    image: string;
    liveUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    author: {
      name: string;
      email: string;
      pfp: string;
      id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    pfp: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    pfo: string;
  };
}

export interface ProjectForm {
  title: string;
  desc: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  category: string;
}