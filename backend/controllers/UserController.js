import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async(req, res) => {
    try {
        const user = await User.findAll({
            attributes: ['id', 'nama', 'username']
        });
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

// export const Login = async(req,res) =>{
//     try {
//         const user = await User.findAll({
//             where:{
//                 username: req.body.username
//             }
//         });
//         const match = await bcrypt.compare(req.body.password, user[0].password);
//         if(!match) return res.status(400).json({msg: "wrong password"});
//         const userId = user[0].id;
//         const nama = user[0].nama;
//         const username = user[0].username;
//         const accessToken = jwt.sign({userId, nama, username}, process.env.ACCESS_TOKEN_SECRET,{
//             expiresIn: '20s '
//         });
//         const refreshToken = jwt.sign({userId, nama, username}, process.env.REFRESH_TOKEN_SECRET,{
//             expiresIn: '1d'
//         });
//         await User.update({refresh_token: refreshToken}, {
//             where:{
//                 id: userId
//             }
//         });
//         res.cookies('refreshToken', refreshToken,{
//             httponly: true,
//             maxAge: 24 * 60 * 60 * 1000,   
//         })
//         res.json({ accessToken });
//     } catch (error) {
//         res.status(404).json({msg: "username tidak ditemukan"})
//     }
// }

export const Login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "Username not found" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        const userId = user.id;
        const nama = user.nama;
        const username = user.username;
        const id_role = user.id_role;
        console.log(user);
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        // return res.status(400).json({ msg: "sampai disini" });

        const accessToken = jwt.sign({ userId, nama, username, id_role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        });

        const refreshToken = jwt.sign({ userId, nama, username, id_role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // res.json({ accessToken });
        res.json({msg: "berhasil login", access_token:accessToken,data:user});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
