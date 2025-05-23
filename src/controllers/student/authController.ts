import express from "express";
import { Response, Request } from "express";
import studentModel from "../../models/student/studentDetailsModel";
import { comparePassword } from "../../helpers/hased";
import generateToken from "../../helpers/token";

export const login = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await studentModel.findOne({
      mobileNumber: mobileNumber,
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
        data: "",
      });
    }
    const check = await comparePassword(
      String(password),
      String(user.password)
    );
    if (!check) {
      return res.status(400).json({
        status: 400,
        message: "Password doesn't match",
        data: "",
      });
    }
    const tokenUser = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      mobileNumber: user.mobileNumber,
    };
    const token = generateToken(tokenUser);
    return res.status(200).json({
      status: 200,
      message: "Login successfully",
      data: user,
      token: token,
    });
  } catch (error: any) {
    console.log("Error", error.message);

    return res.status(400).json({
      status: 400,
      message: "somethig Went wrong",
      data: "",
    });
  }
};
