

const Invoice = require('../schema/invoice');
const User = require('../schema/user');


const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({user: req.user._id});
        res.status(200).json({
            success: true,
            invoices
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


const createInvoice = async (req, res) => {
    try {
        
        const user = await User.findOne({email: req.user.email, sub: req.user.sub});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        console.log(user, "user");
        const invoice = new Invoice({
            user: user._id
        })
        invoice.save();
        res.status(200).json({ success: true, invoice });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}




module.exports = {createInvoice, getInvoices}