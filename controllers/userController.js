const { Model } = require("sequelize");
const { User } = require("../models");

module.exports = {
    // 1. UPDATE USER (Misal Admin mau benerin nama typo)
    updateUser: async (req, res) => {
        const { id } = req.params; // Ambil ID dari URL
        const { first_name, last_name, email } = req.body;

        try {
            const user = await User.findOne({ where: { id_user: id } });

            if (!user) {
                return res.status(404).json({ message: "User tidak ditemukan" });
            }

            // Update data
            user.first_name = first_name || user.first_name;
            user.last_name = last_name || user.last_name;
            user.email = email || user.email;
            
            await user.save();

            res.json({ message: "Data user berhasil diperbarui!", user });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // 2. DELETE USER (Fitur Penting buat Admin)
    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const deleted = await User.destroy({
                where: { id_user: id } // Pastikan pakai id_user
            });

            if (deleted) {
                res.json({ message: "User dan API Key miliknya berhasil dihapus!" });
            } else {
                res.status(404).json({ message: "User tidak ditemukan" });
            }

        } catch (error) {
            res.status(500).json({ message: "Gagal menghapus: " + error.message });
        }
    },
    // 3. CREATE USER BARU
    createUser:async(req, res)=>{
        try {
            const { first_name, last_name, email } = req.body;
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email sudah terdaftar!" });
            }
            const newUser = await User.create({
                first_name,
                last_name,
                email
            });
            res.status(201).json({ message: "User berhasil dibuat!", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Gagal membuat user: " + error.message });
        }
    },
    // 4. GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                include: [{ model: ApiKey,
                    as: 'apiKeys',
                    attributes: [ 'key', 'out_of_date']
                 }],// Include API Keys jika ada asosiasi
                 order: [['id_user', 'ASC']] // Urutkan berdasarkan id_user
            });
            res.status(200).json({
                message: "Berhasil mendapatkan daftar semua user",
                data: users
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};