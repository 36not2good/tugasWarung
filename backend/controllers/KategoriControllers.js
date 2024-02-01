import Kategori from "../models/KategoriModel.js"
import path from "path"
import fs from "fs";
import { error } from "console";

export const getKategoris = async (req, res) => {
    try {
        const response = await Kategori.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getKategoriById = async (req, res) => {
    try {
        const response = await Kategori.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}


export const saveKategori = async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const name = req.body.nama_kategori;

    try {
        // Create the Kategori instance
        const kategori = await Kategori.create({ nama_kategori: name });

        // Send a success response
        res.status(201).json({ msg: "Kategori Created Successfully", kategori });
    } catch (error) {
        // Handle errors
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};








