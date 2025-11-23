const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin, User } = require("../models"); // Pastikan import User juga

const SECRET_KEY = "rahasia_negara_api"; 

module.exports = {
    // ==========================================
    // 1. REGISTER ADMIN
    // ==========================================
    register: async (req, res) => {
        const { email, password } = req.body;
        try {
            const existingAdmin = await Admin.findOne({ where: { email: email } });
            if (existingAdmin) return res.status(400).json({ message: "Email ini sudah terdaftar!" });

            const hashedPassword = await bcrypt.hash(password, 10);
            await Admin.create({ email: email, password: hashedPassword });

            res.status(201).json({ message: "Admin berhasil didaftarkan!" });
        } catch (error) {
            res.status(500).json({ message: "Gagal register: " + error.message });
        }
    },

    // ==========================================
    // 2. LOGIN ADMIN
    // ==========================================
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const admin = await Admin.findOne({ where: { email: email } });
            if (!admin) return res.status(404).json({ message: "Email tidak ditemukan!" });

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) return res.status(401).json({ message: "Password salah!" });

            const token = jwt.sign(
                { id: admin.id_admin, email: admin.email }, 
                SECRET_KEY, 
                { expiresIn: "1h" }
            );

            res.json({
                message: "Login Berhasil!",
                token: token,
                admin: { id: admin.id_admin, email: admin.email }
            });
        } catch (error) {
            res.status(500).json({ message: "Server Error: " + error.message });
        }
    },

    // ==========================================
    // 3. GET ALL USERS (FUNGSI INI YANG HILANG!)
    // ==========================================
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};