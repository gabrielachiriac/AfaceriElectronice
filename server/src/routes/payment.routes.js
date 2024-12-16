const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res
      .status(400)
      .json({ success: false, message: "Order ID is required" });
  }

  // Varificare daca comanda exista
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    return res
      .status(400)
      .json({ success: false, message: "Order not found", data: {} });
  }

  try {
    // Creare payment:
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        total: order.total,
        status: "PENDING", // status implicit pentru un payment nou
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
});

module.exports = router;
