// import User from "../models/UserModel.js";
// import path from "path"
// import fs from "fs";

// export const getUsers = async (req, res) => {
//     try {
//         const response = await User.findAll();
//         res.json(response)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// export const getUserById = async (req, res) => {
//     try {
//         const response = await User.findOne({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json(response)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// export const saveUser = async (req, res) => {
//     console.log("req.body:", req.body);
//     console.log("req.files:", req.files);

//     const name = req.body.nama;

//     try {
//         // Create the User instance
//         const user = await User.create({ nama: name, no_hp: req.body.no_hp, username: req.body.username, password: req.body.password, id_role: req.body.id_role });

//         // Send a success response
//         res.status(201).json({ msg: "User Created Successfully", user });
//     } catch (error) {
//         // Handle errors
//         console.log(error.message);
//         res.status(500).json({ msg: error.message });
//     }
// };


// export const updateUser = async(req, res) => {
//     const user = await User.findOne({
//         where:{
//             id : req.params.id
//         }
//     });
//     if(!user) return res.status(404).json({msg: "No Data Found"});

//     const name = req.body.nama;
    
//     try {
//         await User.update({ nama: name, no_hp: req.body.no_hp, username: req.body.username, password: req.body.password, id_role: req.body.id_role},{
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "User Updated Successfuly"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const deleteUser = async (req, res) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 id: req.params.id
//             }
//         });

//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }

//         await User.destroy();

//         res.status(200).json({ msg: "User Deleted Successfully" });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// }

import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUser = async(req, res) => {
    try {
        const user = await User.findAll();
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req,res) =>{
    const{ nama, no_hp, username, password, confPassword, id_role } = req.body;
    if(password !== confPassword) return res.status(400).json
    ({msg:"password dan confirm password tidak valid"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            nama: nama,
            no_hp: no_hp,
            username: username,
            password: hashPassword,
            id_role: id_role
        });
        res.json({msg: "berhasil register"})
    } catch (error) {
        console.log(error);
    }
}