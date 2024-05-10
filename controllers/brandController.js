const brand = require('../models/brand-model')



const addBrand = async (req, res) => {
    try {
        const { name,website } = req.body;

        const newBrand = await brand.create({
            name,website
        })

        console.log('Brand Added Successfully');
        return res.status(200).json({ message: "Brand Added Successfully", newBrand: newBrand })

    } catch (error) {
        console.log('Error adding product', error);
    }
}

const getBrand = async (req, res) => {
    try {
        const response = await brand.find();
        console.log(response);
        return res.status(200).json({ message: "All Brand Fetched", response: response })
    } catch (error) {
        console.log('error getting all Brand', error);
    }
}


const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteBrand = await brand.findByIdAndDelete(id);

        if (!deleteBrand) {
            console.log("brand not found");
        } else {

            console.log("brand Deleted Successfully", deleteBrand);
            res.json({ message: 'brand Deleted Successfully', deleteBrand: deleteBrand })
        }

    } catch (error) {
        console.log('Error Deleting product', error);
    }
}


const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name,website} = req.body;

        const updateBrand = await brand.findByIdAndUpdate(id,{name,website}, { new: true });

        console.log("Brand updated successfully",updateBrand);

        res.status(200).json({message:"Brand updated successfully",updateBrand})
        
        if (!updateBrand) {
            console.log("Brand not found");
        } 
    } catch (error) {
        console.log("Error Updating Brand", error);
    }
}


const geteachBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await brand.find({ _id: id });
        console.log(response);
        return res.status(200).json({ message: "Brand fetched successfully", response: response });
    } catch (error) {
        console.error('Error getting brand by id:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}





module.exports = { addBrand,getBrand,deleteBrand,updateBrand,geteachBrand }