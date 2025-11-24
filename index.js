const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = 3000;

const apikeyRoutes = require("./routes/apikeyRoutes");
const adminRoutes = require("./routes/adminroutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apikeyRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server nyala di http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("Gagal konek DB:", err);
});