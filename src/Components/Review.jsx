import React from "react";

const Review = ({ review }) => {
  return (
    <div className="border border-gray-600 bg-gray-700 p-4 rounded-lg">
      <h3 className="font-bold text-white">{review.reviewerName}</h3>
      <p className="text-gray-200">{review.comment}</p>
    </div>
  );
};

export default Review;