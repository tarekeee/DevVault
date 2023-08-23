import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  if (!result?.project) {
    <p>Failed to fetch project info.</p>;
  }

  return (
    <Modal>
      <section className="flex items-center flex-col gap-12 ">
        <section className="flexStart w-full gap-7">
          <Image
            src={result?.project?.author?.pfp as string}
            width={60}
            height={60}
            className="rounded-full"
            alt={"pfp"}
          />
          <div className="flex items-start gap-1 flex-col">
            <p className="text-xl font-semibold">{result?.project?.title}</p>
            <div className="flexBetween gap-5">
              <p>{result?.project?.author?.name}</p>
              <p className="  text-primary-purple">
                {result?.project?.category}
              </p>
            </div>
          </div>
          {session?.user?.email === result?.project?.author?.email && (
            <div className="ml-auto flex justify-end items-center gap-2">
              <ProjectActions projectId={result?.project?.id} />
            </div>
          )}
        </section>

        <Image
          src={result?.project?.image as string}
          width={1064}
          height={798}
          alt={"Project Image"}
          className=" object-contain rounded-xl border-black border-2"
        />
      </section>
      <section className="mt-12 flex flex-col gap-4 items-center ">
        <p className="mt-10 text-2xl  text-gray-100">{result?.project?.desc}</p>

        <div className="flex flex-wrap mt-5 gap-5 text-2xl">
          <Link
            href={result?.project?.githubUrl as string}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={result?.project?.liveUrl as string}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="w-full flex items-center gap-10 mt-24">
        <div className="h-0.5  bg-light-white-200 w-full"></div>
        <Image
          width={80}
          height={80}
          className="rounded-full"
          src={result?.project?.author?.pfp as string}
          alt="pfp"
        />
        <div className="h-0.5 bg-light-white-200 w-full"></div>
      </section>
      <RelatedProjects
        userId={result?.project?.author?.id as string}
        projectId={result?.project?.id as string}
      />
    </Modal>
  );
};

export default Project;
