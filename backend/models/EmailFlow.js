import mongoose from "mongoose";

const emailFlowSchema = new mongoose.Schema({
    nodes: Array,
    edges: Array,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const EmailFlow = mongoose.model("EmailFlow", emailFlowSchema);
export default EmailFlow;