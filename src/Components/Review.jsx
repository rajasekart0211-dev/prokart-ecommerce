const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        fill="currentColor" viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Review = ({ review }) => {
  const initials = review.reviewerName
    ? review.reviewerName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const avatarColors = [
    'bg-indigo-100 text-indigo-700',
    'bg-violet-100 text-violet-700',
    'bg-pink-100 text-pink-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
    'bg-sky-100 text-sky-700',
  ];
  const colorIndex = review.reviewerName?.charCodeAt(0) % avatarColors.length || 0;
  const avatarColor = avatarColors[colorIndex];

  const formattedDate = review.date
    ? new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-sm transition-all duration-200 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${avatarColor}`}>
            {initials}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-tight">{review.reviewerName}</p>
            {formattedDate && (
              <p className="text-[10px] text-slate-400 mt-0.5">{formattedDate}</p>
            )}
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Comment */}
      <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default Review;