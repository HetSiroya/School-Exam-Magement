import express from "express";
import { Response, Request, NextFunction } from "express";
import { checkRequiredFields } from "../../helpers/commonValidator";

import studentModel from "../../models/student/studentDetailsModel";
import { CustomRequest } from "../../middlewares/token-decode";
import teacherModel from "../../models/teachers/teacherDetailModel";

export const addStudent = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const exist = await teacherModel.findById(userId);
    if (!exist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const { name, email, password, mobileNumber } = req.body;
    const requiredFields = ["name", "email", "password", "mobileNumber"];
    const validationError = checkRequiredFields(req.body, requiredFields);
    const newStudent = new studentModel({
      addedBy: req.user._id,
      name: name,
      mobileNumber: mobileNumber,
      email: email,
      password: password,
    });
    await newStudent.save();
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: newStudent,
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

// edit Student
export const editStudent = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const userId = req.user._id;
    const teachedId = req.params.id;
    const exist = await teacherModel.findById(userId);
    if (!exist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const { name, email, password, mobileNumber } = req.body;
    const newStudent = await studentModel.findByIdAndUpdate(
      teachedId,
      {
        name: name,
        mobileNumber: mobileNumber,
        email: email,
        password: password,
      },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: newStudent,
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

// get all Student
export const getAllStudent = async (req: Request, res: Response) => {
  try {
    const Student = await studentModel.find({ isDeleted: false });
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: Student,
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

// delete Student
export const deleteStudent = async (req: CustomRequest, res: Response) => {
  try {
    const StudentId = req.params.id;
    const Student = await studentModel.findByIdAndUpdate(
      StudentId,
      {
        isDeleted: true,
      },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: Student,
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
