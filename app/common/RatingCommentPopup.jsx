import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RatingCommentPopup = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Rate & Comment",
  productName,
  showLabels = true,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const labels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      const stars = document.querySelector(".stars-container");
      stars.classList.add("animate-shake");
      setTimeout(() => stars.classList.remove("animate-shake"), 500);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ rating, comment });
      handleClose();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setHoverRating(0);
    onClose();
  };

  const handleStarClick = (star) => {
    setRating(star);
    const starElement = document.querySelector(`[data-star="${star}"]`);
    if (starElement) {
      starElement.classList.add("animate-bounce");
      setTimeout(() => starElement.classList.remove("animate-bounce"), 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/10 bg-opacity-10 backdrop-blur-xs z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            className="fixed inset-0 flex items-center justify-center z-9999 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-4xl shadow-2xl w-full max-w-md overflow-hidden">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {title}
                    </h3>
                    {productName && (
                      <p className="text-sm text-gray-600 mt-1">
                        {productName}
                      </p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
              <div className="px-6 py-4">
                <form onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How would you rate this?
                    </label>

                    <div className="stars-container mb-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            data-star={star}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`text-3xl transition-all duration-200 ${
                              star <= (hoverRating || rating)
                                ? "text-yellow-500 drop-shadow-lg"
                                : "text-gray-300"
                            }`}
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          >
                            ★
                          </motion.button>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: rating > 0 ? 1 : 0 }}
                        className="mt-3"
                      >
                        {rating > 0 && showLabels && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            <span className="mr-2">{rating} ★</span>
                            <span>{labels[rating]}</span>
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <motion.div whileFocus={{ scale: 1.01 }}>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience, thoughts, or suggestions..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-0 transition-all duration-200 resize-none"
                        rows="4"
                      />
                    </motion.div>
                    <p className="text-xs text-gray-500 mt-2">
                      Your review helps others make better decisions
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex space-x-3"
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="flex-1 px-4 py-3 border text-sm border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: rating > 0 ? 1.05 : 1,
                        boxShadow:
                          rating > 0
                            ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                            : "none",
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitting || rating === 0}
                      className={`flex-1 px-4 py-3 font-medium  text-sm rounded-full transition-all ${
                        rating > 0
                          ? "bg-black text-white hover:bg-gray-900"
                          : "bg-white text-black border border-black cursor-not-allowed opacity-50"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Review"
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RatingCommentPopup;
