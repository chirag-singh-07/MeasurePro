"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Download, Save } from "lucide-react";

interface Item {
  _id?: string;
  description: string;
  uom: string;
  size: number;
  qty: number;
  rate: number;
  amount: number;
  order: number;
}

interface Section {
  _id?: string;
  title: string;
  items: Item[];
  totalAmount: number;
  order: number;
}

interface Project {
  _id: string;
  name: string;
  clientName: string;
  date: string;
  location: string;
  notes?: string;
  gstPercentage: number;
  totalAmount: number;
  status: string;
}

const UOM_OPTIONS = [
  "Nos",
  "Sqm",
  "Cum",
  "Rmt",
  "Kg",
  "Ton",
  "Ltr",
  "Sqft",
  "Cft",
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();

      if (response.ok) {
        setProject(data.project);
        setSections(data.sections || []);
      } else {
        setError(data.error || "Failed to load project");
      }
    } catch (err) {
      setError("An error occurred while loading the project");
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    const newSection: Section = {
      title: `Section ${sections.length + 1}`,
      items: [],
      totalAmount: 0,
      order: sections.length,
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (sectionIndex: number) => {
    setSections(sections.filter((_, i) => i !== sectionIndex));
  };

  const updateSectionTitle = (sectionIndex: number, title: string) => {
    const updated = [...sections];
    updated[sectionIndex].title = title;
    setSections(updated);
  };

  const addItem = (sectionIndex: number) => {
    const updated = [...sections];
    const newItem: Item = {
      description: "",
      uom: "Nos",
      size: 1,
      qty: 1,
      rate: 0,
      amount: 0,
      order: updated[sectionIndex].items.length,
    };
    updated[sectionIndex].items.push(newItem);
    setSections(updated);
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].items = updated[sectionIndex].items.filter(
      (_, i) => i !== itemIndex,
    );
    recalculateSection(updated, sectionIndex);
    setSections(updated);
  };

  const updateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: keyof Item,
    value: any,
  ) => {
    const updated = [...sections];
    const item = updated[sectionIndex].items[itemIndex];

    (item as any)[field] = value;

    // Auto-calculate amount
    if (field === "size" || field === "qty" || field === "rate") {
      item.amount = item.size * item.qty * item.rate;
    }

    recalculateSection(updated, sectionIndex);
    setSections(updated);
  };

  const recalculateSection = (
    sectionsArray: Section[],
    sectionIndex: number,
  ) => {
    const section = sectionsArray[sectionIndex];
    section.totalAmount = section.items.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
  };

  const calculateGrandTotal = () => {
    return sections.reduce((sum, section) => sum + section.totalAmount, 0);
  };

  const calculateGST = () => {
    const subtotal = calculateGrandTotal();
    return (subtotal * (project?.gstPercentage || 0)) / 100;
  };

  const calculateFinalTotal = () => {
    return calculateGrandTotal() + calculateGST();
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sections,
          gstPercentage: project?.gstPercentage || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save project");
      } else {
        // Refresh data
        await fetchProjectData();
        alert("Project saved successfully!");
      }
    } catch (err) {
      setError("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="skeleton w-16 h-16 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <div className="bg-red-50 border-2 border-red-500 p-6 text-center">
          <p className="text-red-700 font-semibold">{error}</p>
          <Link
            href="/projects"
            className="inline-block mt-4 text-sm hover:underline"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold">{project?.name}</h1>
          <p className="text-gray-600 mt-1">Client: {project?.clientName}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save"}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 font-semibold border-2 border-black hover:bg-gray-100 transition-all">
            <Download className="w-5 h-5" />
            PDF
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-500 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Project Info */}
      <div className="bg-white border-2 border-black p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Location</p>
          <p className="font-semibold">{project?.location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Date</p>
          <p className="font-semibold">
            {project?.date &&
              new Date(project.date).toLocaleDateString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold ${
              project?.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {project?.status}
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white border-2 border-black">
            {/* Section Header */}
            <div className="p-4 border-b-2 border-black flex items-center justify-between bg-gray-50">
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  updateSectionTitle(sectionIndex, e.target.value)
                }
                className="text-lg font-bold bg-transparent border-none focus:outline-none flex-1"
                placeholder="Section Title"
              />
              <button
                onClick={() => removeSection(sectionIndex)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-black">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase w-8">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase min-w-[200px]">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase w-24">
                      UOM
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase w-24">
                      Size
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase w-24">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase w-24">
                      Total Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase w-32">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase w-32">
                      Amount
                    </th>
                    <th className="px-4 py-3 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-200">
                  {section.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {itemIndex + 1}
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "description",
                              e.target.value,
                            )
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:border-black"
                          placeholder="Item description"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={item.uom}
                          onChange={(e) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "uom",
                              e.target.value,
                            )
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:border-black"
                        >
                          {UOM_OPTIONS.map((uom) => (
                            <option key={uom} value={uom}>
                              {uom}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.size}
                          onChange={(e) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "size",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:border-black"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "qty",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:border-black"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {(item.size * item.qty).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "rate",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:border-black"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-2 font-bold">
                        ₹
                        {item.amount.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => removeItem(sectionIndex, itemIndex)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Item Button */}
            <div className="p-4 border-t-2 border-black bg-gray-50">
              <button
                onClick={() => addItem(sectionIndex)}
                className="flex items-center gap-2 text-sm font-semibold hover:underline"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* Section Total */}
            <div className="p-4 border-t-2 border-black bg-black text-white flex justify-between items-center">
              <span className="font-bold">Section Total:</span>
              <span className="text-xl font-bold">
                ₹
                {section.totalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Add Section Button */}
        <button
          onClick={addSection}
          className="w-full border-2 border-dashed border-gray-300 py-8 hover:border-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Section
        </button>
      </div>

      {/* Grand Total */}
      <div className="bg-white border-2 border-black p-6 space-y-4">
        <div className="flex justify-between items-center text-lg">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-bold">
            ₹
            {calculateGrandTotal().toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-semibold">GST:</span>
            <input
              type="number"
              value={project?.gstPercentage || 0}
              onChange={(e) =>
                setProject({
                  ...project!,
                  gstPercentage: parseFloat(e.target.value) || 0,
                })
              }
              className="w-20 px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              step="0.01"
              min="0"
              max="100"
            />
            <span>%</span>
          </div>
          <span className="font-bold">
            ₹
            {calculateGST().toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="pt-4 border-t-2 border-black flex justify-between items-center text-2xl">
          <span className="font-bold">Final Total:</span>
          <span className="font-bold">
            ₹
            {calculateFinalTotal().toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
