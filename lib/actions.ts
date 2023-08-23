import { ProjectForm } from "@/common.types";
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQueryAll,
  projectsQueryWithFilter,
  updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { emitWarning } from "process";
const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
const client = new GraphQLClient(apiUrl);
const makeGraphQlRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    return err;
  }
};
export const getUser = async (email: string) => {
  client.setHeader("x-api-key", apiKey);
  const user = await makeGraphQlRequest(getUserQuery, { email });
  return user;
};
export const createUser = async (name: string, email: string, pfp: string) => {
  client.setHeader("x-api-key", apiKey);
  const vars = {
    input: {
      name,
      email,
      pfp,
    },
  };
  return await makeGraphQlRequest(createUserMutation, vars);
};

export const uploadImage = async (image: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: image }),
    });
    return await res.json();
  } catch (e) {
    throw e;
  }
};
export const fetchToken = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/auth/token`);
    return await res.json();
  } catch (e) {
    throw e;
  }
};
export const createProject = async (
  form: ProjectForm,
  authorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);
  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const vars = {
      input: {
        ...form,
        image: imageUrl.url,
        author: {
          link: authorId,
        },
      },
    };
    return await makeGraphQlRequest(createProjectMutation, vars);
  }
};
export const fetchAllProjects = async (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);
  if (category) {
    return makeGraphQlRequest(projectsQueryWithFilter, { category, endcursor });
  }
  return makeGraphQlRequest(projectsQueryAll, { endcursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  const Project = makeGraphQlRequest(getProjectByIdQuery, { id });
  return Project;
};
export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  const Project = makeGraphQlRequest(getProjectsOfUserQuery, { id, last });
  return Project;
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQlRequest(deleteProjectMutation, { id });
};
export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  const isBase64 = (input: string) => {
    const base64DataURLPattern =
      /^data:[a-z]+\/[a-z]+;base64,([A-Za-z0-9+/=]+\s*)*$/;

    return base64DataURLPattern.test(input);
  };
  let updatedForm = { ...form };
  const isUploadingNewImage = isBase64(form.image);
  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
      updatedForm = {
        ...form,
        image: imageUrl.url,
      };
    }
  }

  const vars = {
    id: projectId,
    input : updatedForm,
  }
  console.log(vars);
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQlRequest(updateProjectMutation, vars);
};
