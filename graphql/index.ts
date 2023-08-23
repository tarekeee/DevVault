export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				desc
				author {
					email
					name
				}
			}
		}
	}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				desc
				author {
					email
					name
				}
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
      
export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				pfp
				bio
				githubUrl
				linkedinUrl
				id
			}
		}
	}
`;

export const projectsQueryWithFilter = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 2, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          desc
          liveUrl
          id
          image
          category
          author {
            id
            email
            name
            pfp
          }
        }
      }
    }
  }
`;
export const projectsQueryAll = `
  query getProjects( $endcursor: String) {
    projectSearch(first: 2, after: $endcursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          desc
          liveUrl
          id
          image
          category
          author {
            id
            email
            name
            pfp
          }
        }
      }
    }
  }
`;
export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      desc
      image
      liveUrl
      githubUrl
      category
      author {
        id
        name
        email
        pfp
      }
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      pfp
      bio
      githubUrl
      linkedinUrl
    }
  }
`;
      
export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      bio
      pfp
      githubUrl
      linkedinUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;