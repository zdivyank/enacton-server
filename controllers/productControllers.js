const product = require('../models/product-model')

const home = () => {
    console.log('Hello Home page');
}

const addProduct = async (req, res) => {
    try {
        const { name, decsription, old_price, discount, color, gender, brands, occasion, rating, category, image } = req.body;

        const newPrice = old_price - (old_price * (discount / 100));

        const newProduct = await product.create({
            name, decsription, old_price, discount, new_price: newPrice, color, gender, brands, occasion, rating, category, image
        })

        console.log('Product Added Successfully');
        return res.status(200).json({ message: "Product Added Successfully", product: newProduct })

    } catch (error) {
        console.log('Error adding product', error);
    }
}

const getProducts = async (req, res) => {
    try {
        const response = await product.find();
        console.log(response);
        return res.status(200).json({ message: "All Products Fetched", response: response })
    } catch (error) {
        console.log('error getting all products', error);
    }
}


const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteproduct = await product.findByIdAndDelete(id);

        if (!deleteproduct) {
            console.log("Product not found");
        } else {

            console.log("Product Deleted Successfully", deleteproduct);
            res.json({ message: 'Product Deleted Successfully', deleteproduct: deleteproduct })
        }

    } catch (error) {
        console.log('Error Deleting product', error);
    }
}


const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, decsription, old_price, discount, color, gender, brands, occasion, rating, category, image } = req.body;

        const newPrice = old_price - (old_price * (discount / 100));

        const updateProduct = await product.findByIdAndUpdate(id, { name, decsription, old_price, discount, new_price: newPrice, color, gender, brands, occasion, rating, category, image }, { new: true });

        console.log("product updated successfully", updateProduct);

        res.status(200).json({ message: "product updated successfully", updateProduct })

        if (!updateProduct) {
            console.log("Product not found");
        }
    } catch (error) {
        console.log("Error Updating Products", error);
    }
}

const productsByCategory = async (req, res) => {
    try {
        const { category } = req.params;


        const Product = await product.find({ category: category })

        console.log("product updated successfully", Product);

        res.status(200).json({ message: "Category wise Fetching product ", Product })

        if (!Product) {
            console.log("Category not found");
        }
    } catch (error) {
        console.log("Error Category wise Fetching product", error);
    }
}

const geteachProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await product.find({ _id: id });
        console.log(response);
        return res.status(200).json({ message: "product fetched successfully", response: response });
    } catch (error) {
        console.error('Error getting product by id:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


const productQuery = async (req, res) => {
    try {
        const { sort, brands, gender, discount, maxPrice, occasion, category } = req.query;

        let query = {};

        // Sorting logic
        let sortCriteria = {};
        if (sort === 'name_asc') {
            sortCriteria.name = 1;
        } else if (sort === 'name_desc') {
            sortCriteria.name = -1;
        } else if (sort === 'rating_asc') {
            sortCriteria.rating = 1;
        } else if (sort === 'rating_desc') {
            sortCriteria.rating = -1;
        } else if (sort === 'date_newest') {
            sortCriteria.createdAt = -1;
        } else if (sort === 'date_oldest') {
            sortCriteria.createdAt = 1;
        }

        // Filtering by selected brands

        if (brands && brands.length >= 2) {
            query.brands = { $all: brands };
        }
        if (category && category.length > 0) {
            query.category = { $in: category };
        }



        //filter occasion 
        if (occasion) {
            query.occasion = Array.isArray(occasion) ? { $in: occasion } : occasion;
        }

        // Filtering by gender
        if (gender) {
            query.gender = gender;
        }

        // Filtering by discount range
        if (discount) {
            const [minDiscount, maxDiscount] = discount.split('-');
            query.discount = { $gte: minDiscount, $lte: maxDiscount };
        }

        // Filtering by maximum price
        if (maxPrice) {
            query.new_price = { $lt: maxPrice };
        }

        const products = await product.find(query).sort(sortCriteria);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};


const minMax = async (req, res) => {
    try {
        const mostCostlyProduct = await product.findOne().sort({ new_price: 1 });
        res.json({ mostCostlyProduct });
    } catch (error) {
        console.error('Error fetching price extremes:', error);
        res.status(500).json({ message: 'Failed to fetch price extremes' });
    }
}
module.exports = { home, addProduct, getProducts, deleteProducts, updateProducts, productsByCategory, geteachProduct, productQuery, minMax }