import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjecCard";
import { fetchAllProjects } from "@/lib/actions";

interface ProjectSearch {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
    };
  };
}
interface SearchParams {
  category?: string,
  endcursor?:string,
}

interface Props {
  searchParams: SearchParams;
}
export default async function Home({ searchParams: { category,endcursor } }: Props) {
  const data = (await fetchAllProjects(category,endcursor)) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];
  const pagination = data?.projectSearch?.pageInfo;
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      {projectsToDisplay.length === 0 ? (
        <section className="flexStart flex-col paddings">
          <p className="no-result-text text-center">
            No projects found,go create some first
          </p>
        </section>
      ) : (
        <section className="projects-grid">
          {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.author?.name}
              pfp={node?.author?.pfp}
              authorId={node?.author?.id}
            />
          ))}
        </section>
      )}
      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasNextPage={pagination?.hasNextPage}
        hasPreviousPage={pagination?.hasPreviousPage}
      />
    </section>
  );
}
