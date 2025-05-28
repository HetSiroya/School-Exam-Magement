import express from "express";
import { Response, Request, NextFunction } from "express";
import { checkRequiredFields } from "../../helpers/commonValidator";
import studentModel from "../../models/student/studentDetailsModel";
import { CustomRequest } from "../../middlewares/token-decode";
import teacherModel from "../../models/teachers/teacherDetailModel";
import { hashPassword } from "../../helpers/hased";
import { generatePassword } from "../../helpers/passwordGenerator";
import sendEmail from "../../helpers/sendMail";
import gradeModel from "../../models/admin/gradeModel";
import { studentWelcomeEmailTemplate } from "../../templates/studentWelcomeEmail";

// add Student
export const addStudent = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const exist = await teacherModel.findById(userId);
    // if (!exist) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "user not found",
    //     data: "",
    //   });
    // }
    const { name, email, mobileNumber, grade } = req.body;
    const gradeExist = await gradeModel.findById(grade);
    if (!gradeExist) {
      return res.status(400).json({
        status: 400,
        message: "grade not found",
        data: "",
      });
    }
    const userExist = await studentModel.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (userExist) {
      return res.status(400).json({
        status: 400,
        message: "user already exist",
        data: "",
      });
    }
    const password = generatePassword();
    const requiredFields = ["name", "email", "grade", "mobileNumber"];
    const validationError = checkRequiredFields(req.body, requiredFields);
    if (validationError) {
      return res.status(400).json({
        status: 400,
        message: validationError,
        data: "",
      });
    }
    const hasedPassword = await hashPassword(String(password));
    const existingStudent = await studentModel.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (existingStudent) {
      return res.status(400).json({
        status: 400,
        message: "Student already exists",
        data: "",
      });
    }

    const newStudent = new studentModel({
      addedBy: userId,
      name: name,
      mobileNumber: mobileNumber,
      email: email,
      password: hasedPassword,
      grade: grade,
    });
    await newStudent.save();
    sendEmail(
      email,
      "Welcome to School Portal - Your Account Details",
      studentWelcomeEmailTemplate(name, String(newStudent.mobileNumber), password, exist?.name || 'School Administration')
    );
    console.log("password", password);
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
    const studentId = req.params.id;
    const exist = await teacherModel.findById(userId);
    // if (!exist) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "user not found",
    //     data: "",
    //   });
    // }
    // Destructure all required fields
    const { name, email, password, mobileNumber, grade } = req.body;

    // Only include fields that are present in the request
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) {
      const emailExist = await studentModel.findOne({
        email: email,
        _id: { $ne: studentId },
      });
      if (emailExist) {
        return res.status(400).json({
          status: 400,
          message: "Email already exists",
          data: "",
        });
      }
      updateData.email = email;
    }
    if (password !== undefined)
      updateData.password = await hashPassword(String(password));
    if (mobileNumber !== undefined) {
      const mobileNumberExist = await studentModel.findOne({
        mobileNumber: mobileNumber,
        _id: { $ne: studentId },
      });
      if (mobileNumberExist) {
        return res.status(400).json({
          status: 400,
          message: "Mobile number already exists",
          data: "",
        });
      }
      updateData.mobileNumber = mobileNumber;
    }
    if (grade !== undefined) updateData.grade = grade;

    const newStudent = await studentModel.findByIdAndUpdate(
      studentId,
      updateData,
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
      message: "something Went wrong",
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

export const getStudentsByGrade = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const gradeId = req.params.gradeId;
    const students = await studentModel.find({
      grade: gradeId,
      isDeleted: false,
    });
    if (!students || students.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No students found for this grade",
        data: "",
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json({
      status: 400,
      message: "something Went wrong",
      data: "",
    });
  }
};
