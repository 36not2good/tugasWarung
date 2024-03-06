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
        let foodOrders = [];
        if (req.body.selectedFoods) {
            foodOrders = await Promise.all(req.body.selectedFoods.map(async (food) => {
                const order = await Order.create({
                    nama_menu: food.nama_menu,
                    jumlah_pesanan: food.jumlah_pesanan,
                    harga_satuan: food.harga_satuan,
                    catatan: food.catatan,
                    foto_menu: food.foto_menu
                });
                return order;
            }));
        }

        let drinkOrders = [];
        if (req.body.selectedDrinks) {
            drinkOrders = await Promise.all(req.body.selectedDrinks.map(async (drink) => {
                const order = await Order.create({
                    nama_menu: drink.nama_menu,
                    jumlah_pesanan: drink.jumlah_pesanan,
                    harga_satuan: drink.harga_satuan,
                    catatan: drink.catatan,
                    foto_menu: drink.foto_menu
                });
                return order;
            }));
        }

        res.status(201).json({ msg: "Orders Created Successfully", foodOrders, drinkOrders });
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
