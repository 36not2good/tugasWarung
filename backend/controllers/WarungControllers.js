import Warung from "../models/WarungModel.js";
import path from "path"
import fs from "fs";

export const getWarungs = async (req, res) => {
    try {
        const response = await Warung.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getWarungById = async (req, res) => {
    try {
        const response = await Warung.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const saveWarung = async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    
    if (req.files === null) return res.status(400).json({ msg: "No file uploaded" });
    const name = req.body.nama_warung;
    const file = req.files.foto_warung;
    const fileSize = file.size; 
    const ext = path.extname(file.name);
    const fileName = `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image format" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Photo must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Warung.create({ nama_warung: name, id_warung: req.body.id_warung, foto_warung: fileName, url: url });
            res.status(201).json({ msg: "warung Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })
};


export const updateWarung = async(req, res) => {
    try {
        const warung = await Warung.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!warung) {
            return res.status(404).json({ msg: "warung not found" });
        }

        // Update warung properties based on your requirements
        warung.nama_warung = req.body.nama_warung || warung.nama_warung;
        warung.id_owner = req.body.id_owner || warung.id_owner;

        // Save the updated warung
        await warung.save();

        res.status(200).json({ msg: "warung Updated Successfully", warung });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
