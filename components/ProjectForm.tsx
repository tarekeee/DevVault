"use client";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";
interface Props {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
}
function ProjectForm({ type, session, project }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    title: project?.title || "",
    desc: project?.desc || "",
    image: project?.image || "",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { token } = await fetchToken();
    try {
      if (type === "create") {
        await createProject(form, session?.user?.id, token);
        router.push("/");
      }

      if (type === "edit") {
        await updateProject(form, project?.id as string, token);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, vlaue: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: vlaue }));
  };

  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        ></input>
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Your project's name"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.desc}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handleStateChange("desc", value)}
        isTextArea
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveUrl}
        placeholder="Your Projects live Website URL"
        setState={(value) => handleStateChange("liveUrl", value)}
      />
      <FormField
        type="url"
        title="GitHub Rep"
        state={form.githubUrl}
        placeholder="Your project's github repository"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            loading
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={loading ? "" : "/plus.svg"}
          loading={loading}
        />
      </div>
    </form>
  );
}

export default ProjectForm;
