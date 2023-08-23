import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  image: string;
  title: string;
  name: string;
  pfp: string;
  authorId: string;
}

const ProjectCard = ({ id, image, title, name, pfp, authorId }: Props) => {
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          alt="image"
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${authorId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={pfp}
              width={24}
              height={24}
              className="rounded-full"
              alt="pfp"
            />
            <p className="text-sm ml-1">{name}</p>
          </div>
        </Link>
        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{Math.floor(Math.random() * 10000)}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="eye" />
            <p className="text-sm">{`${Math.round(
              (Math.random() * 10000)
            )/1000}k`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
