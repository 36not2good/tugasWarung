import Role from "../models/RoleModel.js"
import path from "path"
import fs from "fs";
import { error } from "console";

export const getRoles = async (req, res) => {
    try {
        const response = await Role.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getRoleById = async (req, res) => {
    try {
        const response = await Role.findOne({
            where: {
                id: req.params.id_Role
            }
        });
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}


export const saveRole = async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const name = req.body.role;

    try {
        // Create the Role instance
        const role = await Role.create({ role: name });

        // Send a success response
        res.status(201).json({ msg: "Role Created Successfully", role });
    } catch (error) {
        // Handle errors
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};