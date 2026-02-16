import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Section from "@/models/Section";
import Item from "@/models/Item";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const project = await Project.findOne({
      _id: params.id,
      companyId: session.user.companyId,
    }).lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get sections with items
    const sections = await Section.find({ projectId: params.id })
      .sort({ order: 1 })
      .lean();

    const sectionsWithItems = await Promise.all(
      sections.map(async (section) => {
        const items = await Item.find({ sectionId: section._id })
          .sort({ order: 1 })
          .lean();

        return {
          ...section,
          _id: section._id.toString(),
          items: items.map((item) => ({
            ...item,
            _id: item._id.toString(),
          })),
        };
      }),
    );

    return NextResponse.json({
      project: {
        ...project,
        _id: project._id.toString(),
      },
      sections: sectionsWithItems,
    });
  } catch (error: any) {
    console.error("Get project error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the project" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sections, gstPercentage } = await request.json();

    await connectDB();

    const project = await Project.findOne({
      _id: params.id,
      companyId: session.user.companyId,
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete existing sections and items
    const existingSections = await Section.find({ projectId: params.id });
    for (const section of existingSections) {
      await Item.deleteMany({ sectionId: section._id });
    }
    await Section.deleteMany({ projectId: params.id });

    // Create new sections and items
    let projectTotal = 0;

    for (const sectionData of sections) {
      const section = await Section.create({
        title: sectionData.title,
        projectId: params.id,
        order: sectionData.order,
        totalAmount: sectionData.totalAmount,
      });

      for (const itemData of sectionData.items) {
        await Item.create({
          sectionId: section._id,
          description: itemData.description,
          uom: itemData.uom,
          size: itemData.size,
          qty: itemData.qty,
          rate: itemData.rate,
          amount: itemData.amount,
          order: itemData.order,
        });
      }

      projectTotal += sectionData.totalAmount;
    }

    // Calculate final total with GST
    const gstAmount = (projectTotal * gstPercentage) / 100;
    const finalTotal = projectTotal + gstAmount;

    // Update project
    project.gstPercentage = gstPercentage;
    project.totalAmount = finalTotal;
    await project.save();

    return NextResponse.json({
      message: "Project updated successfully",
      totalAmount: finalTotal,
    });
  } catch (error: any) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the project" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const project = await Project.findOne({
      _id: params.id,
      companyId: session.user.companyId,
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete all related data
    const sections = await Section.find({ projectId: params.id });
    for (const section of sections) {
      await Item.deleteMany({ sectionId: section._id });
    }
    await Section.deleteMany({ projectId: params.id });
    await Project.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the project" },
      { status: 500 },
    );
  }
}
