const Category = require('../models/category-model')



const addCategory = async (req, res) => {
    try {
        const { category } = req.body;

        const newCategory = await Category.create({
            category
        })

        console.log('category Added Successfully');
        return res.status(200).json({ message: "category Added Successfully", newCategory: newCategory })

    } catch (error) {
        console.log('Error adding product', error);
    }
}

const getCategory = async (req, res) => {
    try {
        const response = await Category.find();
        console.log(response);
        return res.status(200).json({ message: "All category Fetched", response: response })
    } catch (error) {
        console.log('error getting all category', error);
    }
}


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Category.findByIdAndDelete(id);

        if (!response) {
            console.log("category not found");
        } else {

            console.log("category Deleted Successfully", response);
            res.json({ message: 'category Deleted Successfully', response: response })
        }

    } catch (error) {
        console.log('Error Deleting product', error);
    }
}


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category} = req.body;

        const updateCategory = await Category.findByIdAndUpdate(id,{category}, { new: true });

        console.log("category updated successfully",updateCategory);

        res.status(200).json({message:"category updated successfully",updateCategory})
        
        if (!updateCategory) {
            console.log("category not found");
        } 
    } catch (error) {
        console.log("Error Updating category", error);
    }
}

const geteachCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Category.find({ _id: id });
        console.log(response);
        return res.status(200).json({ message: "category fetched successfully", response: response });
    } catch (error) {
        console.error('Error getting category by id:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {addCategory,getCategory,deleteCategory,updateCategory,geteachCategory }