import express from "express";
import { Response, Request, NextFunction } from "express";
import teacherModel from "../../models/teachers/teacherDetailModel";
import { comparePassword } from "../../helpers/hased";
import generateToken from "../../helpers/token";

export const login = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, password } = req.body;
    const exist = await teacherModel.findOne({ mobileNumber });
    if (!exist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const isPassword = await comparePassword(password, exist.password);
    if (!isPassword) {
      return res.status(400).json({
        status: 400,
        message: "password doesn't match",
        data: "",
      });
    }
    const tokenUser = {
      _id: exist._id.toString(),
      email: exist.email,
      name: exist.name,
      mobileNumber: exist.mobileNumber,
    };
    const token = generateToken(tokenUser);
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: tokenUser,
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
