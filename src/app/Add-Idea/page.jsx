"use client"
import { authClient } from "@/lib/auth-client";
import { Slide, toast } from "react-toastify";

export default function AddIdeaPage() {

  const { data: session } = authClient.useSession();
  const handleSubmitForm = async (event) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const idea = Object.fromEntries(formData.entries());
    idea.createdBy = session?.user?.email;

    // console.log(idea);
    // console.log("Logged User:", session?.user?.email);
    // console.log("Idea:", idea);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(idea),
    });

    const data = await res.json();

    if (data.insertedId) {
      // toast.success("");
      toast.success('Idea Added Successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      // event.target.reset();
    }

  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <form onSubmit={handleSubmitForm} className="bg-white rounded-2xl shadow border p-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">
              Idea Title
            </label>

            <input
              required
              name="title"
              type="text"
              placeholder="StudyBuddy AI"
              className="w-full mt-1 h-11 rounded-lg border px-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Category
            </label>

            <select
              required
              name="category"
              className="w-full mt-1 h-11 rounded-lg border px-3"
            >
              <option value="">Select Category</option>
              <option value="AI">AI</option>
              <option value="Tech">Tech</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Image URL
            </label>

            <input
              name="imageURL"
              type="url"
              required
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full mt-1 h-11 rounded-lg border px-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Estimated Budget
            </label>

            <input
              name="estimatedBudget"
              type="text"
              placeholder="$15,000"
              required
              className="w-full mt-1 h-11 rounded-lg border px-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Target Audience
            </label>

            <input
              name="targetAudience"
              type="text"
              required
              placeholder="University Students"
              className="w-full mt-1 h-11 rounded-lg border px-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Tags
            </label>

            <input
              name="tags"
              type="text"
              required
              placeholder="AI, Education, Students"
              className="w-full mt-1 h-11 rounded-lg border px-3"
            />
          </div>

        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">
            Short Description
          </label>

          <textarea
            required
            name="shortDescription"
            rows={2}
            // placeholder="AI-powered study assistant for university students."
            className="w-full mt-1 rounded-lg border p-3"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">
            Detailed Description
          </label>

          <textarea
            required
            name="detailedDescription"
            rows={3}
            // placeholder="StudyBuddy AI helps students generate notes, quizzes, and personalized study plans based on course materials."
            className="w-full mt-1 rounded-lg border p-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

          <div>
            <label className="text-sm font-medium">
              Problem Statement
            </label>

            <textarea
              required
              name="problemStatement"
              rows={3}
              // placeholder="e.g : Students struggle to organize study materials efficiently."
              className="w-full mt-1 rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Proposed Solution
            </label>

            <textarea
              required
              name="proposedSolution"
              rows={3}
              // placeholder="Provide AI-generated summaries, quizzes, and personalized study schedules."
              className="w-full mt-1 rounded-lg border p-3"
            />
          </div>

        </div>

        <div className="flex justify-center gap-10 items-center">
          <button
            type="submit"
            className=" mt-5 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
          >
            Submit Idea
          </button>
          <button
            type="reset"
            className="  mt-5 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
          >
            Reset Idea
          </button>
        </div>
      </form>
    </div>
  );
}
