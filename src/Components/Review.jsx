const Review = ({ review }) => {
  return (
    <div className="border border-slate-700 bg-slate-800 p-4 rounded-lg">
      <h3 className="font-bold text-white">{review.reviewerName}</h3>
      <div className="flex items-center gap-1 my-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < review.rating ? 'text-amber-400' : 'text-slate-600'}`}>★</span>
        ))}
      </div>
      <p className="text-slate-300 text-sm">{review.comment}</p>
    </div>
  );
};

export default Review;