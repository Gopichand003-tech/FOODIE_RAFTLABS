import Order from "../models/order.js";

//  CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { items, total, address, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "Items required" });
    }

    if (!total || !address || !phone) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const order = await Order.create({
      items,
      total,
      address,
      phone,
      status: "pending",
    });

    //  AUTO FLOW 
    setTimeout(() => updateStatusAuto(order._id, "confirmed"), 5000);
    setTimeout(() => updateStatusAuto(order._id, "cooking"), 15000);
    setTimeout(() => updateStatusAuto(order._id, "out for delivery"), 30000);
    setTimeout(() => updateStatusAuto(order._id, "delivered"), 60000);

    res.status(201).json(order);
  } catch (err) {
    console.log("CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//  GET ORDER 
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order); 
  } catch (err) {
    console.log("GET ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//  UPDATE STATUS (manual/admin)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  HISTORY
export const getHistory = async (req, res) => {
  try {
    const orders = await Order.find({ status: "delivered" });
    res.json(orders);
  } catch (err) {
    console.log("HISTORY ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//  AUTO STATUS UPDATE FUNCTION
const updateStatusAuto = async (id, status) => {
  try {
    await Order.findByIdAndUpdate(id, { status });
  } catch (err) {
    console.log("AUTO UPDATE ERROR:", err.message);
  }
};