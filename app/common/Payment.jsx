import { forwardRef, useImperativeHandle, useEffect } from "react";
import { errorAlert } from "../utils/alertService";
import { verifyPayment } from "../store/slice/bookingSlice";

const Payment = forwardRef(({ totalAmount ,dispatch}, ref) => {
    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => {
                console.log("Razorpay SDK loaded successfully");
            };
            script.onerror = () => console.log("Failed to load Razorpay SDK")
            document.body.appendChild(script);
        } else {
            console.log("Razorpay SDK already loaded");
        }
    }, []);

    const initiatePayment = async (razorpayOrderId) => {
        if (!razorpayOrderId) return errorAlert("Invalid order ID");
        try {
            const options = {
                key: process.env.NEXT_RAZORPAY_KEY_ID,
                amount: totalAmount * 100,
                currency: "INR",
                name: "Nanmai",
                description: "Payment for your order",
                order_id: razorpayOrderId,
                theme: { color: "#0C8040" },
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                },
                handler: async (response) => {
                    const verifyPayload = {
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    try {
                        await dispatch(verifyPayment(verifyPayload))
                    } catch (err) {
                        console.error("Verification error:", err);
                    }
                },
            };
            const razor = new window.Razorpay(options);
            razor.on("payment.failed", (response) =>
                errorAlert(response.error.description || "Payment failed")
            );
            razor.open();
        } catch (err) {
            console.error(err);
            errorAlert("Payment error occurred");
        } finally {
        }
    };
    useImperativeHandle(ref, () => ({
        initiatePayment
    }));
    return (
        <></>
    );
});

export default Payment;
