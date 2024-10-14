import category from "../models/CategoryModel.js";

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const trimmedName = name.trim().toLowerCase();

        const existingCategory = await category.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } });
        
        if (existingCategory) {
            return res.status(400).send({ 
                message: "Category already exists"
            });
        }

        const newCategory = new category({ name: trimmedName });
        await newCategory.save();

        res.status(200).send({
            success: true,
            message: "Category Added",
            category: newCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "Error in category controller",
            error
        });
    }
};
