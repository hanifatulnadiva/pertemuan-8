const crypto = require("crypto");
const { User, ApiKey } = require("../models");

module.exports = {

    generateKey: (req, res) => {
        try {
            const key = crypto.randomBytes(16).toString('hex');
            const outOfDate = new Date();
            outOfDate.setDate(outOfDate.getDate() + 30);
            res.status(200).json({ apiKey: key, outOfDate: outOfDate });
        } catch (error) {
            res.status(500).json({ message: "Gagal membuat API Key" });
        }
    },

    saveUserKey: async (req, res) => {
        try {
            const { first_name, last_name, email, key, out_of_date } = req.body;
            if (!email || !key) return res.status(400).json({ message: "Data tidak lengkap!" });

            const [user] = await User.findOrCreate({
                where: { email: email },
                defaults: { first_name, last_name }
            });

            await ApiKey.create({
                key: key,
                out_of_date: out_of_date,
                id_user: user.id_user 
            });

            res.status(201).json({ message: "Sukses! API Key berhasil didaftarkan." });
        } catch (error) {
            res.status(500).json({ message: "Server Error: " + error.message });
        }
    },

    getAllApiKeys: async (req, res) => {
        try {
            const keys = await ApiKey.findAll({
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['first_name', 'last_name', 'email']
                }],
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json(keys);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }   
    },

    createApiKey: async (req, res) => {
        try {
            const { key, out_of_date, id_user } = req.body;
            
            const user = await User.findByPk(id_user);
            if(!user) return res.status(404).json({ message: "User tidak ditemukan" });

            const newKey = await ApiKey.create({
                key,
                out_of_date: out_of_date || new Date(),
                id_user
            });
            res.status(201).json({ message: "Key manual berhasil dibuat", data: newKey });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateApiKey: async (req, res) => {
        const { id } = req.params;
        const { out_of_date } = req.body;

        try {
            const apiKey = await ApiKey.findOne({ where: { id_apiKey: id } });
            if (!apiKey) return res.status(404).json({ message: "API Key tidak ditemukan" });

            apiKey.out_of_date = out_of_date || apiKey.out_of_date;
            await apiKey.save();

            res.status(200).json({ message: "API Key berhasil diperbarui!", data: apiKey });
        } catch (error) {
            res.status(500).json({ message: "Gagal update: " + error.message });
        }
    },

    deleteKey: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await ApiKey.destroy({ where: { id_apiKey: id } }); 
            if (deleted) res.status(200).json({ message: "API Key berhasil dihapus!" });
            else res.status(404).json({ message: "API Key tidak ditemukan!" });
        } catch (error) {
            res.status(500).json({ message: "Gagal menghapus: " + error.message });
        }
    },
    
    getApiKeyById: async (req, res) => {
        const { id } = req.params;
        try {
            const apiKey = await ApiKey.findOne({
                where: { id_apiKey: id },
                include: [{ model: User, as: 'user' }]
            });
            if (!apiKey) return res.status(404).json({ message: "Tidak ditemukan" });
            res.status(200).json(apiKey);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};