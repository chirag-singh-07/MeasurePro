"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Download,
  Save,
  GripVertical,
  Check,
  Calculator,
  Upload,
  FileSpreadsheet,
} from "lucide-react";
import { useToast } from "@/components/ui/toast-context";
import * as XLSX from "xlsx";
import { pdf } from "@react-pdf/renderer";
import { ProjectPDF } from "@/components/project-pdf";

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
  const { toast } = useToast();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [billDate, setBillDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (project?.date) {
      setBillDate(new Date(project.date).toISOString().split('T')[0]);
    }
  }, [project]);

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
      title: `SECTION ${sections.length + 1}`,
      items: [],
      totalAmount: 0,
      order: sections.length,
    };
    setSections([...sections, newSection]);
    toast({ title: "Section Added", type: "success", duration: 2000 });
  };

  const removeSection = (sectionIndex: number) => {
    if (confirm("Delete this section and all its items?")) {
      setSections(sections.filter((_, i) => i !== sectionIndex));
      toast({ title: "Section Deleted", type: "info" });
    }
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

  const toggleItemSelection = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAllItems = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    const sectionKeys = section.items.map((_, i) => `${sectionIndex}-${i}`);
    const someUnselected = sectionKeys.some((k) => !selectedItems[k]);

    const newSelection = { ...selectedItems };
    sectionKeys.forEach((k) => {
      newSelection[k] = someUnselected;
    });
    setSelectedItems(newSelection);
  };

  const clearSelection = () => {
    setSelectedItems({});
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

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        if (jsonData.length <= 1) {
          toast({ title: "Import Error", description: "Excel file is empty or invalid.", type: "error" });
          return;
        }

        const newSections = [...sections];
        
        jsonData.slice(1).forEach((row) => {
          if (!row[1] && !row[0]) return; // Skip empty rows

          const sectionTitle = (row[0] || "Imported Items").toString().toUpperCase();
          const description = (row[1] || "").toString();
          const uom = (row[2] || "Nos").toString();
          const size = parseFloat(row[3]) || 1;
          const qty = parseFloat(row[4]) || 1;
          const rate = parseFloat(row[5]) || 0;
          const amount = size * qty * rate;

          if (!description) return;

          let section = newSections.find(s => s.title === sectionTitle);
          if (!section) {
            section = {
              title: sectionTitle,
              items: [],
              totalAmount: 0,
              order: newSections.length
            };
            newSections.push(section);
          }

          section.items.push({
            description,
            uom: UOM_OPTIONS.includes(uom) ? uom : "Nos",
            size,
            qty,
            rate,
            amount,
            order: section.items.length
          });
          
          section.totalAmount += amount;
        });

        setSections(newSections);
        toast({ 
          title: "Import Successful", 
          description: "Excel data has been imported into sections.", 
          type: "success" 
        });
      } catch (err) {
        toast({ title: "Import Failed", description: "Could not parse Excel file.", type: "error" });
      }
      // Reset input
      e.target.value = "";
    };
    reader.onerror = () => {
      toast({ title: "File Error", description: "Could not read the file.", type: "error" });
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadTemplate = () => {
    const templateData = [
      ["SECTION TITLE", "DESCRIPTION", "UNIT", "SIZE", "QTY", "RATE"],
      ["DEMOLITION WORKS", "Dismantling of existing R.C.C structure", "Cum", 10.5, 1, 1250],
      ["CIVIL WORKS", "M25 Grade Concrete for Footings", "Cum", 15.2, 1, 6500],
      ["CIVIL WORKS", "TMT Reinforcement Steel", "Kg", 1200, 1, 68],
      ["CIVIL WORKS", "9 inch Brick Masonry in CM 1:6", "Cum", 25.5, 1, 5800],
      ["PLASTERING", "Interior wall plastering 12mm thick", "Sqm", 150, 1, 240],
      ["PAINTING", "Applying two coats of emulsion paint", "Sqm", 150, 1, 120]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Import Template");
    
    // Auto-size columns for better readability
    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 45 },
      { wch: 8 },
      { wch: 10 },
      { wch: 10 },
      { wch: 12 }
    ];

    XLSX.writeFile(workbook, "MeasurePro_Import_Template.xlsx");
    toast({ 
      title: "Template Ready", 
      description: "Follow the sample format for successful import.", 
      type: "success" 
    });
  };

  const exportToPDF = async () => {
    if (!project) return;

    // Filter items if any are selected
    const selectedKeys = Object.keys(selectedItems).filter(
      (k) => selectedItems[k],
    );

    let sectionsToExport = sections;
    if (selectedKeys.length > 0) {
      sectionsToExport = sections
        .map((section, sIdx) => {
          const filteredItems = section.items.filter(
            (_, iIdx) => selectedItems[`${sIdx}-${iIdx}`],
          );
          return {
            ...section,
            items: filteredItems,
            totalAmount: filteredItems.reduce((sum, item) => sum + item.amount, 0),
          };
        })
        .filter((s) => s.items.length > 0);
    }

    if (sectionsToExport.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to include in the bill.",
        type: "error",
      });
      return;
    }

    toast({
      title: "Preparing Billing PDF",
      description: "Generating document...",
      type: "info",
    });

    try {
      const doc = (
        <ProjectPDF
          project={project}
          sections={sectionsToExport}
          billDate={billDate}
        />
      );

      // Trigger automatic save to history
      await saveBillToHistory(sectionsToExport);

      const asBlob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(asBlob);
      const link = document.createElement("a");
      link.href = url;
      const dateStr = new Date(billDate).toISOString().split("T")[0];
      link.download = `${project.name.replace(/\s+/g, "_")}_Bill_${dateStr}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export & Save Complete",
        description: "Bill saved to history and PDF downloaded.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "PDF Error",
        description: "Failed to generate PDF.",
        type: "error",
      });
    }
  };

  const saveBillToHistory = async (billedSections: Section[]) => {
    if (!project) return;

    const subtotal = billedSections.reduce((sum, s) => sum + s.totalAmount, 0);
    const gstAmount = (subtotal * project.gstPercentage) / 100;
    const totalAmount = subtotal + gstAmount;
    const itemsCount = billedSections.reduce((sum, s) => sum + s.items.length, 0);

    try {
      const response = await fetch("/api/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project._id,
          projectName: project.name,
          clientName: project.clientName,
          billDate: billDate,
          sections: billedSections,
          subtotal,
          gstAmount,
          totalAmount,
          itemsCount,
        }),
      });

      if (!response.ok) {
        console.error("Failed to auto-save bill");
      }
    } catch (err) {
      console.error("Error auto-saving bill:", err);
    }
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
        toast({ title: "Save Failed", description: data.error, type: "error" });
      } else {
        await fetchProjectData();
        toast({
          title: "Project Saved",
          description: "All changes secured.",
          type: "success",
        });
      }
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Could not save project.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f0f0f0]">
        <div className="text-center animate-pulse">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase">
              Loading Project...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-red-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-red-700 font-black uppercase text-xl mb-4">
          {error}
        </p>
        <Link
          href="/projects"
          className="inline-block bg-black text-white px-6 py-3 font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-4 sm:p-8 font-sans text-black">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide hover:underline mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <div className="flex items-baseline gap-4 mt-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              {project?.name}
            </h1>
            <span
              className={`px-3 py-1 text-sm font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                project?.status === "Active" ? "bg-[#98FB98]" : "bg-[#87CEEB]"
              }`}
            >
              {project?.status}
            </span>
          </div>
          <p className="font-bold text-gray-600 mt-2 text-lg uppercase tracking-wide">
            Client: {project?.clientName}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-[#87CEEB] text-black px-4 py-4 font-black uppercase border-4 border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-xs"
            title="Download Excel Import Template"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Template
          </button>
          <label className="flex items-center gap-2 bg-[#98FB98] text-black px-6 py-4 font-black uppercase border-4 border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleImportExcel}
            />
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#FFDE59] text-black px-8 py-4 font-black uppercase border-4 border-black hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 bg-white px-8 py-4 font-black uppercase border-4 border-black hover:bg-black hover:text-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
          >
            <Download className="w-5 h-5" />
            Export Bill PDF
          </button>
        </div>
      </div>

      {/* Project Metadata & Selection Card */}
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border-l-4 border-black pl-4">
          <p className="text-xs font-black uppercase text-gray-500 mb-1">
            Bill/Report Date
          </p>
          <input
            type="date"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            className="font-bold text-lg bg-transparent border-b-2 border-black focus:outline-none"
          />
        </div>
        <div className="border-l-4 border-black pl-4">
          <p className="text-xs font-black uppercase text-gray-500 mb-1">
            Selection Status
          </p>
          {Object.values(selectedItems).filter(Boolean).length > 0 ? (
            <div className="flex items-center gap-2">
              <span className="font-black text-blue-600 animate-pulse uppercase">
                {Object.values(selectedItems).filter(Boolean).length} ITEMS SELECTED
              </span>
              <button
                onClick={clearSelection}
                className="text-[10px] font-black uppercase underline hover:text-red-500"
              >
                Clear
              </button>
            </div>
          ) : (
            <p className="font-bold text-gray-400 uppercase italic text-sm">Selective Billing Mode</p>
          )}
        </div>
        <div className="border-l-4 border-black pl-4">
          <p className="text-xs font-black uppercase text-gray-500 mb-1">
            {Object.values(selectedItems).filter(Boolean).length > 0 ? "Billed Value" : "Project Value"}
          </p>
          <p className="font-black text-2xl">
            ₹
            {Object.keys(selectedItems).filter(k => selectedItems[k]).length > 0 
              ? sections.reduce((sum, s, sIdx) => 
                  sum + s.items.reduce((iSum, item, iIdx) => 
                    iSum + (selectedItems[`${sIdx}-${iIdx}`] ? item.amount : 0), 0
                  ), 0
                ).toLocaleString("en-IN")
              : project?.totalAmount.toLocaleString("en-IN")
            }
          </p>
        </div>
      </div>

      {/* Sections & Items */}
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Section Header */}
            <div className="p-4 border-b-4 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#f0f0f0]">
              <div className="flex items-center gap-4 flex-1 w-full">
                <div className="bg-black text-white p-2 font-black border-2 border-black">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </div>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateSectionTitle(sectionIndex, e.target.value)
                  }
                  className="flex-1 text-xl font-black uppercase bg-transparent border-b-2 border-transparent focus:border-black focus:outline-none transition-colors placeholder:text-gray-400 w-full"
                  placeholder="SECTION TITLE"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAllItems(sectionIndex)}
                  className="bg-blue-500 text-white px-3 py-1 font-black text-xs border-2 border-black hover:bg-black transition-colors"
                >
                  {section.items.every((_, i) => selectedItems[`${sectionIndex}-${i}`]) && section.items.length > 0 ? "DESELECT ALL" : "SELECT ALL"}
                </button>
                <button
                  onClick={() => removeSection(sectionIndex)}
                  className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                  title="Delete Section"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-12 text-center">
                      <Check className="w-4 h-4 mx-auto" />
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-12 text-center">
                      #
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider min-w-[240px]">
                      Description
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-24">
                      Unit
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-24">
                      Size
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-24">
                      Qty
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-24 text-right">
                      Total
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-32">
                      Rate (₹)
                    </th>
                    <th className="p-3 text-xs font-black uppercase tracking-wider w-36 text-right">
                      Amount (₹)
                    </th>
                    <th className="p-3 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100">
                  {section.items.map((item, itemIndex) => (
                    <tr
                      key={itemIndex}
                      className={`group transition-colors ${selectedItems[`${sectionIndex}-${itemIndex}`] ? 'bg-blue-50/50 hover:bg-blue-100/50' : 'hover:bg-yellow-50'}`}
                    >
                      <td className="p-3 text-center border-r-2 border-gray-100">
                        <input
                          type="checkbox"
                          checked={!!selectedItems[`${sectionIndex}-${itemIndex}`]}
                          onChange={() => toggleItemSelection(sectionIndex, itemIndex)}
                          className="w-4 h-4 cursor-pointer accent-black"
                        />
                      </td>
                      <td className="p-3 text-center font-bold text-gray-500 border-r-2 border-gray-100">
                        {itemIndex + 1}
                      </td>
                      <td className="p-3 border-r-2 border-gray-100">
                        <textarea
                          rows={1}
                          value={item.description}
                          onChange={(e) =>
                            updateItem(
                              sectionIndex,
                              itemIndex,
                              "description",
                              e.target.value,
                            )
                          }
                          className="w-full px-2 py-1 bg-transparent border-b border-transparent focus:border-black focus:outline-none resize-none overflow-hidden font-medium"
                          placeholder="Item Description"
                        />
                      </td>
                      <td className="p-3 border-r-2 border-gray-100">
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
                          className="w-full bg-transparent font-bold focus:outline-none cursor-pointer"
                        >
                          {UOM_OPTIONS.map((uom) => (
                            <option key={uom} value={uom}>
                              {uom}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 border-r-2 border-gray-100">
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
                          className="w-full bg-transparent focus:outline-none focus:bg-white font-mono"
                        />
                      </td>
                      <td className="p-3 border-r-2 border-gray-100">
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
                          className="w-full bg-transparent focus:outline-none focus:bg-white font-mono"
                        />
                      </td>
                      <td className="p-3 text-right font-bold font-mono border-r-2 border-gray-100 bg-gray-50/50">
                        {(item.size * item.qty).toFixed(2)}
                      </td>
                      <td className="p-3 border-r-2 border-gray-100">
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
                          className="w-full bg-transparent focus:outline-none focus:bg-white font-mono"
                        />
                      </td>
                      <td className="p-3 text-right font-black font-mono border-r-2 border-gray-100 bg-gray-50/50">
                        {item.amount.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeItem(sectionIndex, itemIndex)}
                          className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {section.items.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="p-8 text-center text-gray-400 font-bold italic"
                      >
                        No items in this section. Add one below.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Section Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center border-t-4 border-black">
              <button
                onClick={() => addItem(sectionIndex)}
                className="w-full md:w-auto px-6 py-4 flex items-center gap-2 font-black uppercase hover:bg-black hover:text-white transition-colors"
              >
                <Plus className="w-5 h-5" /> Add New Item
              </button>
              <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-x-6 px-6 py-4 bg-black text-white">
                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">
                  Section Total
                </span>
                <span className="text-2xl font-black font-mono">
                  ₹
                  {section.totalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add Section Button */}
        <button
          onClick={addSection}
          className="w-full py-8 border-4 border-dashed border-gray-400 text-gray-500 font-black uppercase text-xl hover:border-black hover:text-black hover:bg-white transition-all flex flex-col items-center gap-2 group"
        >
          <div className="p-3 rounded-full border-4 border-gray-400 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
            <Plus className="w-8 h-8" />
          </div>
          Add New Section
        </button>
      </div>

      {/* Grand Total Summary */}
      <div className="sticky bottom-4 z-20 mt-12">
        <div className="bg-[#FFDE59] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-black text-white p-3 border-2 border-black">
              <Calculator className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-black uppercase mb-1">Project Total</p>
              <p className="text-4xl font-black tracking-tight">
                ₹
                {calculateFinalTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/50 p-3 border-2 border-black/20 rounded-lg">
            <div className="text-right">
              <p className="text-xs font-bold uppercase">Subtotal</p>
              <p className="font-bold">
                ₹
                {calculateGrandTotal().toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="text-right border-l-2 border-black/20 pl-6">
              <div className="flex items-center gap-1 justify-end">
                <p className="text-xs font-bold uppercase">GST</p>
                <input
                  type="number"
                  value={project?.gstPercentage || 0}
                  onChange={(e) =>
                    setProject({
                      ...project!,
                      gstPercentage: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-12 text-xs border-b border-black bg-transparent text-right font-bold focus:outline-none"
                />
                <span className="text-xs font-bold">%</span>
              </div>
              <p className="font-bold">
                ₹
                {calculateGST().toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
