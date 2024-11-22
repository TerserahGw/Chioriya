const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../database/storekei.json');

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

async function addKeiStore({ id, name, price, amt, seller, rec, pro, kon }) {
    if (!id) {
        id = generateRandomId();
    }
    const newItem = { id, name, price, amt, seller, rec, pro, kon };
    let data = [];
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    data.push(newItem);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return { message: `Produk berhasil ditambahkan dengan ID: ${id}` };
}

async function dellStore(id) {
    if (!id) throw new Error("ID produk harus diberikan!");
    if (!fs.existsSync(filePath)) throw new Error("Tidak ada data produk.");
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newData = data.filter(item => item.id !== id);
    if (data.length === newData.length) throw new Error("Produk dengan ID tersebut tidak ditemukan.");
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    return { message: `Produk dengan ID ${id} berhasil dihapus.` };
}

module.exports = { addKeiStore, dellStore };
