"use client";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/app/common/CommonModel";
import { closePopup } from "@/app/store/slice/popupSlice";
import { AnimatePresence, motion } from "framer-motion";
import RegisterSection from "../components/Container/RegisterSection/RegisterSection";
import LoginSection from "../components/Container/LoginSection/LoginSection";

const formAnimation = {
    initial: { opacity: 0, x: 60, rotateY: 10, scale: 0.95 },
    animate: { opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -60, rotateY: -10, scale: 0.95, transition: { duration: 0.3 } },
};

export default function PopupManager() {
    const dispatch = useDispatch();
    const { activePopup } = useSelector((state) => state.popup);
    return (
        <AnimatePresence>
            {activePopup && (
                <Modal isOpen={true} onClose={() => dispatch(closePopup())}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePopup}
                            variants={formAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {activePopup === "register" && <RegisterSection />}
                            {activePopup === "login" && <LoginSection />}
                        </motion.div>

                    </AnimatePresence>
                </Modal>
            )}
        </AnimatePresence>
    );
}
