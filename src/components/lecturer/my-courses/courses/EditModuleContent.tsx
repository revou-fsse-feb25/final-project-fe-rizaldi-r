import ContentHeader from "@/components/_commons/ContentHeader";
import Header from "@/components/_commons/Header";
import Link from "next/link";
import { BookMinus, Check, Pencil, PlayIcon, Plus, Trash2, TriangleAlert, X } from "lucide-react";
import { CourseModuleDetails, DescriptionType, ModuleType } from "@/types/module-interface";
import { Submission } from "@/types/submission-interface";
import EditAssignmentSubmissionForm from "./EditAssignmentSubmissionForm";
import { capitalizeFirstWord } from "@/utils/capitalize-first-word";
import React, { useEffect, useState } from "react";
import SmallSpinner from "@/components/_commons/icons/SmallSpinner";
import ConfirmationModal from "@/components/_commons/ConfirmationModal";
import DeleteConfirmation from "@/components/_commons/DeleteConfirmation";
import {
  addLink,
  addSubdescription,
  deleteLink,
  deleteModule,
  deleteSubdescription,
  patchLink,
  patchModule,
  patchSubdescription,
} from "@/services/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function EditModuleContent({
  refetchModule,
  courseId,
  id,
  title,
  moduleType,
  description,
  links,
  embedVideoLink,
  subdescriptions,
  submissionTemplate,
  submissions,
}: CourseModuleDetails & {
  submissions?: Submission[];
  courseId: string;
  refetchModule: (params_0: string) => Promise<void>;
}) {
  const router = useRouter()

  const { data: session } = useSession();
  const token = session?.accessToken;

  const isAssignment = moduleType === ModuleType.ASSIGNMENT;

  const [isEditingHeaderAndDescription, setIsEditingHeaderAndDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedModuleType, setEditedModuleType] = useState(moduleType);
  const [isUpdatingHeaderAndDescription, setIsUpdatingHeaderAndDescription] = useState(false);

  const [editingSubdescriptionId, setEditingSubdescriptionId] = useState<null | string>(null);
  const [editedSubdescriptions, setEditedSubdescriptions] = useState(subdescriptions || []);
  const [isUpdatingSubdescription, setIsUpdatingSubdescription] = useState(false);
  const [deletingSubdescriptionId, setDeletingSubdescriptionId] = useState<null | string>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmingDeletionId, setConfirmingDeletionId] = useState<null | string>(null);

  const [editingLinkId, setEditingLinkId] = useState<null | string>(null);
  const [editedLinks, setEditedLinks] = useState(links || []);
  const [isUpdatingLink, setIsUpdatingLink] = useState(false);
  const [deletingLinkId, setDeletingLinkId] = useState<null | string>(null);
  const [confirmingLinkDeletionId, setConfirmingLinkDeletionId] = useState<null | string>(null);

  const [isAddingSubdescription, setIsAddingSubdescription] = useState(false);
  const [newSubdescription, setNewSubdescription] = useState({
    header: "",
    type: DescriptionType.DESCRIPTION,
    description: "",
  });
  const [isSubmittingNewSubdescription, setIsSubmittingNewSubdescription] = useState(false);

  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLink, setNewLink] = useState({
    label: "",
    href: "",
  });
  const [isSubmittingNewLink, setIsSubmittingNewLink] = useState(false);

  // Update edited state if props change from a parent component
  useEffect(() => {
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedModuleType(moduleType);
    const linksWithIds = links ? links.map((link) => ({ ...link, id: link.id })) : [];
    const subdescriptionsWithIds = subdescriptions
      ? subdescriptions.map((sd) => ({ ...sd, id: sd.id }))
      : [];
    setEditedSubdescriptions(subdescriptionsWithIds);
    setEditedLinks(linksWithIds);
  }, [title, description, moduleType, subdescriptions, links]);

  const handleHeaderAndDescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingHeaderAndDescription(true);

    // Create an array of promises for the API calls
    const payload: Partial<CourseModuleDetails> = {};
    if (editedTitle.trim() !== title.trim()) {
      payload.title = editedTitle;
    }
    if (editedDescription.trim() !== description.trim()) {
      payload.description = editedDescription;
    }
    if (editedModuleType !== moduleType) {
      payload.moduleType = editedModuleType;
    }
    if (Object.keys(payload).length === 0) {
      setIsEditingHeaderAndDescription(false);
      setIsUpdatingHeaderAndDescription(false);
      return;
    }

    try {
      const reqBody = {
        title: payload?.title,
        description: payload?.description,
        moduleType: payload.moduleType,
      };
      const response = await patchModule(token || "", id, reqBody || {});
      refetchModule(id);
    } catch (error) {
      console.error("Failed to update content:", error);
      setEditedTitle(title);
      setEditedDescription(description);
      setEditedModuleType(moduleType);
    } finally {
      setIsUpdatingHeaderAndDescription(false);
      setIsEditingHeaderAndDescription(false);
    }
  };

  // Handle Subdescription
  const handleSubdescriptionSubmit = async (e: React.FormEvent, sdId: string) => {
    e.preventDefault();
    const currentSubdescription = subdescriptions.find((sd) => sd.id === sdId);
    const editedSubdescription = editedSubdescriptions.find((sd) => sd.id === sdId);

    if (
      editedSubdescription?.header?.trim() === currentSubdescription?.header?.trim() &&
      editedSubdescription?.description.trim() === currentSubdescription?.description.trim()
    ) {
      setEditingSubdescriptionId(null);
      return;
    }

    setIsUpdatingSubdescription(true);
    try {
      const reqBody = {
        header: editedSubdescription?.header,
        description: editedSubdescription?.description,
      };
      const response = await patchSubdescription(token || "", sdId, reqBody || {});
    } catch (error) {
      console.error("Failed to update subdescription:", error);
      setEditedSubdescriptions(subdescriptions);
    } finally {
      setIsUpdatingSubdescription(false);
      setEditingSubdescriptionId(null);
    }
  };

  const handleSubdescriptionChange = (sdId: string, field: string, value: string) => {
    const newEditedSubdescriptions = editedSubdescriptions.map((sd) =>
      sd.id === sdId ? { ...sd, [field]: value } : sd
    );
    setEditedSubdescriptions(newEditedSubdescriptions);
  };

  const handleSubdescriptionDelete = (sdId: string) => {
    setConfirmingDeletionId(sdId);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setDeletingSubdescriptionId(confirmingDeletionId);
    try {
      const response = await deleteSubdescription(token || "", confirmingDeletionId || "");
      refetchModule(id);
      const newSubdescriptions = editedSubdescriptions.filter(
        (sd) => sd.id !== confirmingDeletionId
      );
      setEditedSubdescriptions(newSubdescriptions);
    } catch (error) {
      console.error("Failed to delete subdescription:", error);
    } finally {
      setIsDeleting(false);
      setDeletingSubdescriptionId(null);
      setConfirmingDeletionId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmingDeletionId(null);
  };

  const handleAddSubdescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewSubdescription(true);
    try {
      const reqBody = {
        header: newSubdescription?.header,
        type: newSubdescription?.type,
        description: newSubdescription.description,
        moduleId: id,
      };
      const response = await addSubdescription(token || "", reqBody || {});
      refetchModule(id);
      const newSubdescriptionWithId = response.data;
      setEditedSubdescriptions([...editedSubdescriptions, newSubdescriptionWithId]);
      console.log("New subdescription added successfully!");
    } catch (error) {
      console.error("Failed to add new subdescription:", error);
    } finally {
      setIsSubmittingNewSubdescription(false);
      setIsAddingSubdescription(false);
      setNewSubdescription({ header: "", type: DescriptionType.DESCRIPTION, description: "" });
    }
  };

  // Handle Link
  const handleLinkSubmit = async (e: React.FormEvent, linkId: string) => {
    e.preventDefault();
    const currentLink = links.find((link) => link.id === linkId);
    const editedLink = editedLinks.find((link) => link.id === linkId);

    if (
      editedLink?.label?.trim() === currentLink?.label?.trim() &&
      editedLink?.href.trim() === currentLink?.href.trim()
    ) {
      setEditingLinkId(null);
      return;
    }

    setIsUpdatingLink(true);
    try {
      const reqBody = {
        label: editedLink?.label,
        href: editedLink?.href,
      };
      const response = await patchLink(token || "", linkId, reqBody || {});
      refetchModule(id);
    } catch (error) {
      console.error("Failed to update link:", error);
      setEditedLinks(links);
    } finally {
      setIsUpdatingLink(false);
      setEditingLinkId(null);
    }
  };

  const handleLinkChange = (linkId: string, field: string, value: string) => {
    const newEditedLinks = editedLinks.map((link) =>
      link.id === linkId ? { ...link, [field]: value } : link
    );
    setEditedLinks(newEditedLinks);
  };

  const handleLinkDelete = (linkId: string) => {
    setConfirmingLinkDeletionId(linkId);
  };

  const confirmDeleteLink = async () => {
    setIsDeleting(true);
    setDeletingLinkId(confirmingLinkDeletionId);
    try {
      const response = await deleteLink(token || "", confirmingLinkDeletionId || "");
      refetchModule(id);
      const newLinks = editedLinks.filter((link) => link.id !== confirmingLinkDeletionId);
      setEditedLinks(newLinks);
    } catch (error) {
      console.error("Failed to delete link:", error);
    } finally {
      setIsDeleting(false);
      setDeletingLinkId(null);
      setConfirmingLinkDeletionId(null);
    }
  };

  const cancelDeleteLink = () => {
    setConfirmingLinkDeletionId(null);
  };

  const handleAddLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewLink(true);
    try {
      const reqBody = {
        label: newLink?.label,
        href: newLink?.href,
        moduleId: id,
      };
      const response = await addLink(token || "", reqBody || {});
      refetchModule(id);
      setEditedLinks([...editedLinks, response.data]);
      console.log("New link added successfully!");
    } catch (error) {
      console.error("Failed to add new link:", error);
    } finally {
      setIsSubmittingNewLink(false);
      setIsAddingLink(false);
      setNewLink({ label: "", href: "" });
    }
  };

  const [isConfirmingDeleteModule, setIsConfirmingDeleteModule] = useState(false);
  const handleDeleteModule = async () => {
    try {
      const response = await deleteModule(token || "", id || "");
      router.push("module-not-found")
      setIsDeleting(true);
    } catch (error) {
      setIsDeleting(false);
      console.error("Failed to delete module:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <section className="bg-blue-50 py-4 px-7 rounded-lg border border-blue-300 text-blue-500">
        Hover over the section you want to edit and click the{" "}
        <Pencil size={14} className="inline mx-2" /> icon
      </section>
      {embedVideoLink && (
        <iframe
          src={embedVideoLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="aspect-video rounded-xl"
        ></iframe>
      )}
      <section className="bg-white py-6 px-7 rounded-lg border border-slate-300 ">
        {/* Module Header */}
        <form onSubmit={handleHeaderAndDescriptionSubmit}>
          <section className="mb-4 text-slate-700">
            {isEditingHeaderAndDescription ? (
              <select
                value={editedModuleType}
                onChange={(e) => setEditedModuleType(e.target.value as ModuleType)}
                className="p-1 rounded-md border border-slate-300 bg-white text-sm"
                disabled={isUpdatingHeaderAndDescription}
              >
                <option value={ModuleType.LECTURE}>Lecture</option>
                <option value={ModuleType.ASSIGNMENT}>Assignment</option>
              </select>
            ) : (
              <>
                {moduleType === ModuleType.ASSIGNMENT ? (
                  <BookMinus size={16} className="text-slate-400 inline mr-2" />
                ) : (
                  <PlayIcon size={16} className="text-slate-400 inline mr-2" />
                )}
                {capitalizeFirstWord(moduleType)}
              </>
            )}
            <div className="flex items-center gap-2">
              {isEditingHeaderAndDescription ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className=" text-2xl font-bold border-b-2 border-blue-500 focus:outline-none focus:border-blue-700"
                  disabled={isUpdatingHeaderAndDescription}
                  autoFocus
                />
              ) : (
                <>
                  <Header element="h2" size="20" fontWeight="bold">
                    {title}
                  </Header>
                </>
              )}
              {!isEditingHeaderAndDescription && (
                <button
                  onClick={() => setIsEditingHeaderAndDescription(true)}
                  type="button"
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>
          </section>

          {/* End Date */}
          {isAssignment && (
            <div className="text-sm text-slate-500 mb-6">
              <TriangleAlert size={16} className="text-slate-400 inline mr-1 mb-1" />
              <span>Deadline:</span>{" "}
              {submissionTemplate?.endDate
                ? new Date(submissionTemplate.endDate).toDateString()
                : "No deadline"}
            </div>
          )}

          {/* Main Description */}
          <div className="flex items-start gap-2 group mb-6">
            {isEditingHeaderAndDescription ? (
              <div className="flex  flex-col items-end gap-2">
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full h-40 p-2 border rounded-md border-blue-500 focus:outline-none focus:border-blue-700 resize-none whitespace-pre-wrap"
                  disabled={isUpdatingHeaderAndDescription}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                    disabled={isUpdatingHeaderAndDescription}
                  >
                    <Check size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingHeaderAndDescription(false);
                      setEditedTitle(title);
                      setEditedDescription(description);
                      setEditedModuleType(moduleType);
                    }}
                    className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                    disabled={isUpdatingHeaderAndDescription}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-700 leading-relaxed  whitespace-pre-wrap">
                {description}
              </p>
            )}
          </div>
        </form>

        {/* Subdescriptions */}
        {editedSubdescriptions.length > 0 && (
          <section className="mb-6">
            {editedSubdescriptions.map((item) => (
              <div key={item.id} className="mb-5">
                {editingSubdescriptionId === item.id ? (
                  <form
                    onSubmit={(e) => handleSubdescriptionSubmit(e, item.id)}
                    className="flex flex-col gap-2"
                  >
                    {item.header && (
                      <input
                        type="text"
                        value={editedSubdescriptions.find((sd) => sd.id === item.id)?.header || ""}
                        onChange={(e) =>
                          handleSubdescriptionChange(item.id, "header", e.target.value)
                        }
                        className="text-lg font-semibold border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 my-3"
                        disabled={isUpdatingSubdescription}
                        autoFocus
                      />
                    )}
                    <textarea
                      value={
                        editedSubdescriptions.find((sd) => sd.id === item.id)?.description || ""
                      }
                      onChange={(e) =>
                        handleSubdescriptionChange(item.id, "description", e.target.value)
                      }
                      className="w-full p-2 border rounded-md border-blue-500 focus:outline-none focus:border-blue-700 resize-none whitespace-pre-wrap"
                      rows={5}
                      disabled={isUpdatingSubdescription}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        type="submit"
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                        disabled={isUpdatingSubdescription}
                      >
                        <Check size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSubdescriptionId(null);
                          setEditedSubdescriptions(subdescriptions);
                        }}
                        className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                        disabled={isUpdatingSubdescription}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="group">
                    <div className="flex items-center gap-2">
                      {item.header && (
                        <Header element="h2" size="14" className="my-3 ">
                          {item.header}
                        </Header>
                      )}
                      <div className="flex items-center gap-2  transition-opacity">
                        <button
                          onClick={() => setEditingSubdescriptionId(item.id)}
                          className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                          disabled={isDeleting}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleSubdescriptionDelete(item.id)}
                          className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                          disabled={isDeleting && deletingSubdescriptionId === item.id}
                        >
                          {isDeleting && deletingSubdescriptionId === item.id ? (
                            <SmallSpinner />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    {confirmingDeletionId === item.id && (
                      <DeleteConfirmation
                        onConfirm={confirmDelete}
                        isDeleting={isDeleting}
                        cancelDelete={cancelDelete}
                      />
                    )}
                    {item.type === DescriptionType.LIST ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 mb-6">
                        {item.description.split("\n").map((line, lineIndex) => (
                          <div key={lineIndex} className="flex items-start mb-1">
                            <span className="text-slate-700 mr-2">•</span>
                            <p className="text-slate-700 flex-grow">{line}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Add subdescription */}
        {isAddingSubdescription ? (
          <form
            onSubmit={handleAddSubdescriptionSubmit}
            className="p-4 border border-slate-300 rounded-md mb-8"
          >
            <h4 className="text-lg font-semibold mb-2">Add New Subdescription</h4>
            <div className="mb-3">
              <label htmlFor="header" className="block text-sm font-medium mb-1">
                Header
              </label>
              <input
                id="header"
                type="text"
                value={newSubdescription.header}
                onChange={(e) =>
                  setNewSubdescription({ ...newSubdescription, header: e.target.value })
                }
                className="w-full p-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E.g., Key Concepts"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={newSubdescription.description}
                onChange={(e) =>
                  setNewSubdescription({ ...newSubdescription, description: e.target.value })
                }
                className="w-full p-2 border border-slate-300 rounded-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                placeholder="Enter the section content here. For a list, use a new line for each item."
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
                Content Type
              </label>
              <select
                id="type"
                value={newSubdescription.type}
                onChange={(e) =>
                  setNewSubdescription({
                    ...newSubdescription,
                    type: e.target.value as DescriptionType,
                  })
                }
                className="w-full p-2 border border-slate-300 bg-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={DescriptionType.DESCRIPTION}>Paragraph</option>
                <option value={DescriptionType.LIST}>List</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmittingNewSubdescription}
              >
                {isSubmittingNewSubdescription ? (
                  <>
                    <SmallSpinner />
                    Adding...
                  </>
                ) : (
                  <>Add</>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsAddingSubdescription(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingSubdescription(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors mb-8"
          >
            <Plus size={14} className="mr-2" /> Add Subdescription
          </button>
        )}

        {/* Links */}
        {editedLinks && editedLinks.length > 0 && (
          <section>
            <Header size="14" element="h2" className="my-2">
              Links
            </Header>
            <div className="flex flex-col gap-2">
              {editedLinks.map((link) => (
                <div key={link.id} className="flex items-center gap-2 group">
                  {editingLinkId === link.id ? (
                    <form
                      onSubmit={(e) => handleLinkSubmit(e, link.id)}
                      className="flex-1 flex flex-col gap-2"
                    >
                      <input
                        type="text"
                        value={editedLinks.find((l) => l.id === link.id)?.label || ""}
                        onChange={(e) => handleLinkChange(link.id, "label", e.target.value)}
                        className="text-sm font-medium border-b border-blue-500 focus:outline-none focus:border-blue-700"
                        placeholder="Link Label"
                        disabled={isUpdatingLink}
                        autoFocus
                      />
                      <input
                        type="url"
                        value={editedLinks.find((l) => l.id === link.id)?.href || ""}
                        onChange={(e) => handleLinkChange(link.id, "href", e.target.value)}
                        className="text-sm border-b border-blue-500 focus:outline-none focus:border-blue-700"
                        placeholder="https://example.com"
                        disabled={isUpdatingLink}
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                          disabled={isUpdatingLink}
                        >
                          <Check size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingLinkId(null);
                            setEditedLinks(links);
                          }}
                          className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                          disabled={isUpdatingLink}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className=" flex flex-col">
                        <span className="text-slate-700 font-medium">{link.label}</span>
                        <Link
                          href={link.href}
                          target="_blank"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {link.href}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2  transition-opacity">
                        <button
                          onClick={() => setEditingLinkId(link.id)}
                          className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                          disabled={isDeleting}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleLinkDelete(link.id)}
                          className="p-1 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                          disabled={isDeleting && deletingLinkId === link.id}
                        >
                          {isDeleting && deletingLinkId === link.id ? (
                            <SmallSpinner />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                  {confirmingLinkDeletionId === link.id && (
                    <DeleteConfirmation
                      onConfirm={confirmDeleteLink}
                      isDeleting={isDeleting}
                      cancelDelete={cancelDeleteLink}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Add new link */}
        {isAddingLink ? (
          <form
            onSubmit={handleAddLinkSubmit}
            className="mt-4 p-4 border rounded-lg bg-slate-100 shadow-sm"
          >
            <h4 className="text-lg font-bold mb-2 text-slate-800">Add New Link</h4>
            <div className="mb-3">
              <label htmlFor="linkLabel" className="block text-sm font-medium text-slate-700 mb-1">
                Label
              </label>
              <input
                id="linkLabel"
                type="text"
                value={newLink.label}
                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E.g., Course Website"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="linkHref" className="block text-sm font-medium text-slate-700 mb-1">
                URL
              </label>
              <input
                id="linkHref"
                type="url"
                value={newLink.href}
                onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmittingNewLink}
              >
                {isSubmittingNewLink ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsAddingLink(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingLink(true)}
            className="mt-4 flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} /> Add Link
          </button>
        )}
      </section>

      {/* Submission */}
      {isAssignment && (
        <EditAssignmentSubmissionForm
          refetchModule={refetchModule}
          moduleId={id}
          submissions={submissions || []}
          submissionTitle={submissionTemplate?.submissionTitle || "Submission"}
          submissionFields={submissionTemplate?.submissionFields || []}
          submissionTemplateId={submissionTemplate?.id || ""}
        />
      )}

      {/* delete module */}
      <div className="ml-auto">
        {isConfirmingDeleteModule && (
          <ConfirmationModal
            message="Are you sure you want to delete this Module?"
            onConfirm={handleDeleteModule}
            onCancel={() => setIsConfirmingDeleteModule(false)}
            isDeleting={isDeleting}
          />
        )}
        <button
          onClick={() => setIsConfirmingDeleteModule(true)}
          className="px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-700 transition-colors"
        >
          Delete Module
        </button>
      </div>
    </>
  );
}
