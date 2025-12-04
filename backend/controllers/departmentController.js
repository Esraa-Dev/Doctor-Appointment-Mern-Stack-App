import { Department } from "../models/DepartmentSchema.js";
import { User } from "../models/UserSchema.js";
export const createDepartment = async (req, res) => {
  try {
   const { id } = req.user;
     const user = await User.findById(id);
     if (!user) {
       return res.status(404).json({ message: "User not found" });
     } 
    const { name, description, isActive } = req.body;
    const image = req.file;
    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const newDepartment = await Department.create({
      name,
      description,
      image: image.path,
      isActive,
    });
    res.status(201).json({
      message: "Department created successfully",
      department: newDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating department", error });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res
      .status(200)
      .json({ message: "Departments fetched successfully", departments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments", error });
  }
};

export const getDepartmentCount = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    res
      .status(200)
      .json({ message: "Department count fetched successfully", count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
