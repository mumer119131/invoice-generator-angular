

const Invoice = require('../schema/invoice');
const User = require('../schema/user');


const getInvoices = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email, sub: req.user.sub});
        const invoices = await Invoice.find({user: user._id});
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


const getInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const user = await User.findOne({ email: req.user.email, sub: req.user.sub });
        const invoice = await Invoice.findOne({ _id: invoiceId, user: user._id });
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }
        res.status(200).json({ success: true, invoice });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

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
        console.error("Error creating invoice:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}



const saveInvoice = async (req, res) => {
    try {
        const { invoice, invoiceId } = req.body;

        // Validate user
        const user = await User.findOne({ email: req.user.email, sub: req.user.sub });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Validate invoice ownership
        const existingInvoice = await Invoice.findById(invoiceId);
        if (!existingInvoice || existingInvoice.user.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "User does not own the invoice"
            });
        }

        // Structure the update
        const updateData = {
            user: user._id,
            toDetails: invoice.toDetails || existingInvoice.toDetails,
            fromDetails: invoice.fromDetails || existingInvoice.fromDetails,
            paymentInfo: invoice.paymentInfo || existingInvoice.paymentInfo,
            invoiceDetails: invoice.invoiceDetails || existingInvoice.invoiceDetails,
            summaryDetails: invoice.summaryDetails || existingInvoice.summaryDetails,
            items: invoice.items || existingInvoice.items, // Ensure items is handled properly
        };

        // Update the invoice
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            invoiceId,
            { $set: updateData },
            { new: true } // Return the updated document
        );

        res.status(200).json({ success: true, updatedInvoice });
    } catch (err) {
        console.error("Error updating invoice:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




module.exports = {createInvoice, getInvoices, saveInvoice, getInvoice}