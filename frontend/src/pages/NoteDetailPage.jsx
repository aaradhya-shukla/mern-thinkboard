import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("something went wrong while deleting the note", error);
      toast.error("something went wrong");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() && !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("error saving the note", error);
      toast.error("failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.note);
        toast.success("successfully fetched note");
        console.log(res.data.note);
      } catch (error) {
        console.error("error occcured while fetching note", error);
        toast.error("error occured while fetching note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
                <textarea
                  placeholder="write your note here"
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
