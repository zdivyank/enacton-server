const express = require('express')
const router = express.Router();
const {addBrand,getBrand,updateBrand,deleteBrand,geteachBrand} = require('../controllers/brandController')

router.route("/addbrand").post(addBrand);
router.route("/getbrand").get(getBrand);

router.route("/:id").get(geteachBrand);
router.route("/:id/updatebrand").put(updateBrand);
router.route("/:id/deletebrand").delete(deleteBrand);

module.exports = router