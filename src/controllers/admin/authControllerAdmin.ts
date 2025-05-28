import express from "express";
import { Response, Request, NextFunction } from "express";
import { checkRequiredFields } from "../../helpers/commonValidator";
import adminModel from "../../models/admin/adminDetailsModel";
import { comparePassword, hashPassword } from "../../helpers/hased";
import generateToken from "../../helpers/token";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword, mobileNumber } = req.body;
    const requiredFields = [
      "name",
      "email",
      "password",
      "confirmPassword",
      "mobileNumber",
    ];
    const validationError = checkRequiredFields(req.body, requiredFields);
    if (validationError) {
      return res.status(400).json({
        status: 400,
        message: validationError,
        data: "",
      });
    }
    const exist = await adminModel.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (exist) {
      return res.status(400).json({
        status: 400,
        message: "user already exist",
        data: "",
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: "password doesn't match",
        data: "",
      });
    }
    const hasedPassword = await hashPassword(String(password));
    const newUser = new adminModel({
      name: name,
      mobileNumber: mobileNumber,
      email: email,
      password: hasedPassword,
    });
    const tokenUser = {
      _id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      mobileNumber: newUser.mobileNumber,
    };
    const token = generateToken(tokenUser);
    await newUser.save();
    return res.status(200).json({
      status: 200,
      message: "Succesfully",
      data: tokenUser,
      token: token,
    });
  } catch (e: any) {
    console.log("Error", e.message);
    return res.status(400).json({
      status: 400,
      message: "somethig Went wrong",
      data: "",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await adminModel.findOne({
      mobileNumber: mobileNumber,
    });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "USer not found",
        data: "",
      });
    }
    const check = await comparePassword(
      String(password),
      String(user?.password)
    );
    if (!check) {
      return res.status(400).json({
        status: 400,
        message: "password dont match",
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
      message: "login succesfully",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "somethig Went wrong",
      data: "",
    });
  }
};
