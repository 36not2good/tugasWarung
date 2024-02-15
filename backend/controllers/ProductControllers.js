import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProduct = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  if (req.files === null) return res.status(400).json({ msg: "No file uploaded" });

  const name = req.body.nama_menu;
  const file = req.files.foto;
  const fileSize = file.size;
  const ext = file.name ? path.extname(file.name) : '.jpg';
  const fileName = `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image format" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Photo must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Product.create({ nama_menu: name, harga: req.body.harga, stok: req.body.stok, id_kategori: req.body.id_kategori, foto: fileName, url: url });
      res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = product.foto;
  } else {
    const file = req.files.foto;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    fileName = `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${product.foto}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.nama_menu;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.update({ nama_menu: name, harga: req.body.harga, stok: req.body.stok, id_kategori: req.body.id_kategori, foto: fileName, url: url }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
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
};