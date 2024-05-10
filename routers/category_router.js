const express = require('express')
const router = express.Router();
const {addCategory,getCategory,deleteCategory,updateCategory,geteachCategory} = require('../controllers/categoryController')

router.route("/addcategory").post(addCategory);
router.route("/getcategory").get(getCategory);

router.route("/:id/updatecategory").put(updateCategory);
router.route("/:id/deletecategory").delete(deleteCategory);
router.route("/:id").get(geteachCategory);

module.exports = router