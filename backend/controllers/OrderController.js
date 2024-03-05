import Order from "../models/OrderModel.js"; 

export const getOrders = async (req, res) => {
    try {
        const response = await Order.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const response = await Order.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const saveOrder = async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    try {
        const orders = await Order.create({
            nama_menu: req.body.selectedFoods.map(food => food.nama_menu).join(', '), 
            jumlah_pesanan: req.body.selectedFoods.map(food => food.jumlah_pesanan).join(', '),
            harga_satuan: req.body.selectedFoods.map(food => food.harga_satuan).join(', '),
            catatan: req.body.selectedFoods.map(food => food.catatan).join(', '), 
            foto_menu: req.body.selectedFoods.map(food => food.foto_menu).join(', ')
        });
        

        res.status(201).json({ msg: "Order Created Successfully", orders });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};


export const updateOrder = async (req, res) => {
    try {
        res.json({ msg: "Order Updated Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        res.json({ msg: "Order Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }
};
