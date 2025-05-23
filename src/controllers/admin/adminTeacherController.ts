import express from "express";
import { Response, Request, NextFunction } from "express";
import { checkRequiredFields } from "../../helpers/commonValidator";

import teacherModel from "../../models/teachers/teacherDetailModel";
import { CustomRequest } from "../../middlewares/token-decode";
import adminModel from "../../models/admin/adminDetailsModel";

const router = express.Router();

export const addTeacher = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const exist = await adminModel.findById(userId);
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
    const newTeacher = new teacherModel({
      addedBy: req.user._id,
      name: name,
      mobileNumber: mobileNumber,
      email: email,
      password: password,
    });
    await newTeacher.save();
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: newTeacher,
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

// edit teacher
export const editTeacher = async (req: CustomRequest, res: Response) => {
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
    const exist = await adminModel.findById(userId);
    if (!exist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const { name, email, password, mobileNumber } = req.body;
    const newTeacher = await teacherModel.findByIdAndUpdate(
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
      data: newTeacher,
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

// get all teacher
export const getAllTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await teacherModel.find({ isDeleted: false });
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: teacher,
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

// delete teacher
export const deleteTeacher = async (req: CustomRequest, res: Response) => {
  try {
    const teacherId = req.params.id;
    const teacher = await teacherModel.findByIdAndUpdate(
      teacherId,
      {
        isDeleted: true,
      },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: teacher,
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
