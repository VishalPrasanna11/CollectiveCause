const CircularProgress = ({ value }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const remaining = circumference - progress;

  return (
    <svg width="100" height="100">
      {/* Grey background circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#ccc"
        strokeWidth="8"
      />
      {/* Green progress arc */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="green"
        strokeWidth="8"
        strokeDasharray={`${progress} ${remaining}`}
        strokeLinecap="round"
        transform={`rotate(-90 50 50)`}
      />
      {/* Text showing the percentage */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8"
        fill="black"
      >
        {value}%
      </text>
    </svg>
  );
};

export default CircularProgress;
