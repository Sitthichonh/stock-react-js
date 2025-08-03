const express = require("express");
const router = express.Router();
const product = require("./models/product");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Upload Image
uploadImage = async (files, doc) => {
  let imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

  if (imageFile && imageFile.originalname && imageFile.path) {
    const fileExtension = imageFile.originalname.split(".").pop();
    doc.image = `${doc.id}.${fileExtension}`;

    const newpath = path.resolve(__dirname, "uploaded", "images", doc.image);

    // ลบไฟล์เก่าถ้ามี
    if (fs.existsSync(newpath)) {
      await fs.remove(newpath);
    }

    // ✅ ย้ายไฟล์ใหม่
    await fs.move(imageFile.path, newpath); // ← แก้ตรงนี้

    // ✅ อัปเดต DB (แน่ใจว่า doc.id มีจริง)
    const result = await product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    );

    return result;
  } else {
    throw new Error("ไม่พบไฟล์หรือข้อมูลไฟล์ไม่ครบ (name/path)");
  }
};

// Get Products
router.get("/product", async (req, res) => {
  let result = await product.findAll({ order: Sequelize.literal("id DESC") });
  res.json(result);
});

// Add Product
router.post("/product", upload.single("image"), async (req, res) => {
  try {
    console.log("file:", req.file);
    console.log("body:", req.body);

    // 1. สร้าง product ใหม่ก่อน
    const newProduct = await product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      // image ยังไม่ใส่ตอนนี้
    });

    // 2. เตรียมข้อมูลสำหรับ uploadImage
    const files = { image: req.file };
    const doc = { id: newProduct.id };

    // 3. เรียก uploadImage เพื่อย้ายไฟล์และอัปเดต image
    await uploadImage(files, doc);

    // 4. ดึงข้อมูลสินค้าที่อัปเดตแล้วส่งกลับ
    const updatedProduct = await product.findByPk(newProduct.id);

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update Product
router.put("/product", upload.single("image"), async (req, res) => {
  try {
    const doc = req.body;
    if (req.file) {
      const files = { image: req.file };
      await uploadImage(files, doc); // จัดการอัปโหลดไฟล์แยก
    }

    await product.update(doc, { where: { id: doc.id } });

    res.json({
      result: constants.kResultOk,
      message: "Updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      result: constants.kResultNok,
      message: err.message,
    });
  }
});

// Delete Product
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await product.findOne({ where: { id: id } });
    await fs.remove(
      path.resolve(__dirname + "/uploaded/images/") + "/" + result.image
    );
    result = await product.destroy({ where: { id: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: "Internal error" });
  }
});

// Get Product by Id
router.get("/product/:id", async (req, res) => {
  let result = await product.findOne({ where: { id: req.params.id } });
  if (result) {
    res.json(result);
  } else {
    res.json({});
  }
});

// Get Products by Keyword
router.get("/product/keyword/:keyword", async (req, res) => {
  const { keyword } = req.params;
  let result = await product.findAll({
    where: { name: { [Op.like]: `%${keyword}%` } },
  });
  res.json(result);
});

module.exports = router;
