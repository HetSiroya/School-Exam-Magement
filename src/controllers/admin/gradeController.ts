import express from "express";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../middlewares/token-decode";
import { log } from "console";
import adminModel from "../../models/admin/adminDetailsModel";
import gradeModel from "../../models/admin/gradeModel";

export const addGrade = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const userExist = await adminModel.findById(userId);
    if (!userExist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const { grade } = req.body;
    const gradeExist = await gradeModel.findOne({
      grade: grade,
    });
    if (gradeExist) {
      return res.status(400).json({
        status: 400,
        message: "grade already exist",
        data: "",
      });
    }
    const newGrade = new gradeModel({
      addedBy: userId,
      grade: grade,
    });
    await newGrade.save();
    return res.status(200).json({
      status: 200,
      message: "grade added successfully",
      data: newGrade,
    });
  } catch (error: any) {
    console.log("Error", error.message);
    console.log("Error", error);
    return res.status(400).json({
      status: 400,
      message: "somethig Went wrong",
      data: "",
    });
  }
};

// get all grade
export const getAllGrade = async (req: Request, res: Response) => {
  try {
    const grade = await gradeModel.find();
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: grade,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json({
      status: 400,
      message: "somethig Went wrong",
      data: "",
    });
  }
};

// edit grade
export const editGrade = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const userExist = await adminModel.findById(userId);
    if (!userExist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const gradeId = req.params.id;
    const { grade } = req.body;
    const gradeExist = await gradeModel.findById(gradeId);
    if (!gradeExist) {
      return res.status(400).json({
        status: 400,
        message: "grade not found",
        data: "",
      });
    }
    const newGrade = await gradeModel.findByIdAndUpdate(
      gradeId,
      {
        grade: grade,
      },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "grade updated successfully",
      data: newGrade,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json({
      status: 400,
      message: "somethig Went wrong",
      data: "",
    });
  }
};
