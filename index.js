const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = 3000;

const adminController = require("./controllers/adminController");
//ROUTES
const apikeyRoutes = require("./routes/apikeyRoutes");
const adminRoutes = require("./routes/adminroutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder Public untuk HTML
app.use(express.static(path.join(__dirname, 'public')));

// GUNAKAN ROUTES
app.use('/api', apikeyRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// START SERVER
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server nyala di http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("Gagal konek DB:", err);
});