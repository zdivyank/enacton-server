const express = require('express')
const router = express.Router();
const {home,addProduct,getProducts,deleteProducts, updateProducts,productsByCategory,geteachProduct,productQuery,minMax} = require('../controllers/productControllers')

router.route("/").get(home);
router.route("/addproduct").post(addProduct);
router.route("/getproduct").get(getProducts);

router.route("/:id/updateproduct").put(updateProducts);
router.route("/:id/deleteproduct").delete(deleteProducts);

router.route("/:category/category").get(productsByCategory);

router.route("/search").get(productQuery);
router.route("/minmax").get(minMax);


router.route("/:id").get(geteachProduct);



module.exports = router