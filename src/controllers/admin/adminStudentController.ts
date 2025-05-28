import express from "express";
import { Response, Request } from "express";
import { CustomRequest } from "../../middlewares/token-decode";
import resultModel from "../../models/student/resultModel";

export const studentResult = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const grade = req.params.grade;
    const result = await resultModel.find({
      grade: grade,
    });
    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No results found for this student in the specified grade",
        data: "",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Results fetched successfully",
      data: result,
    });
  } catch (error: any) {
    console.log("Error", error.message);
    return res.status(400).json({
      status: 400,
      message: "something Went wrong",
      data: "",
    });
  }
};

export const fetchSingleStudentResults = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const userId = req.user._id;
    const grade = req.query.grade;
    const studentId = req.params.studentId;
    const query: any = { studentId: studentId };
    if (grade) {
      query.grade = grade;
    }
    const result = await resultModel.find(query);
    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No results found for this student in the specified grade",
        data: "",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Results fetched successfully",
      data: result,
    });
  } catch (error: any) {
    console.log("Error", error.message);
    return res.status(400).json({
      status: 400,
      message: "something Went wrong",
      data: "",
    });
  }
};
