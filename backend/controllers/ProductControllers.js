import Product from "../models/ProductModel.js";
import path from "path"
import fs from "fs";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const saveProduct = async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    
    if (req.files === null) return res.status(400).json({ msg: "No file uploaded" });
    const name = req.body.nama_menu;
    const file = req.files.foto;
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
            await Product.create({ nama_menu: name, harga: req.body.harga, stok: req.body.stok, id_kategori: req.body.id_kategori, foto: fileName, url: url });
            res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })
};


export const updateProduct = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        // Update product properties based on your requirements
        product.nama_menu = req.body.nama_menu || product.nama_menu;
        product.harga = req.body.harga || product.harga;
        product.stok = req.body.stok || product.stok;
        product.id_kategori = req.body.id_kategori || product.id_kategori;

        // Save the updated product
        await product.save();

        res.status(200).json({ msg: "Product Updated Successfully", product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const filepath = `./public/images/${product.foto}`;
        fs.unlinkSync(filepath);

        await product.destroy();

        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
