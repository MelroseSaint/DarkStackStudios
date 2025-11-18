import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  minScore?: number;
  type?: 'assessment' | 'mood' | 'streak' | 'progress';
  showTrend?: boolean;
  previousScore?: number;
  className?: string;
}

export default function ScoreDisplay({ 
  score, 
  maxScore = 100, 
  minScore = 0, 
  type = 'assessment',
  showTrend = false,
  previousScore,
  className = ''
}: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Validate and normalize score
  const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
  const isValidScore = !isNaN(score) && isFinite(score);
  
  // Calculate trend
  const trend = previousScore !== undefined ? normalizedScore - previousScore : 0;
  const trendDirection = trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';

  // Animation effect
  useEffect(() => {
    if (normalizedScore !== displayScore) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayScore(normalizedScore);
        setIsAnimating(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [normalizedScore, displayScore]);

  // Get color based on score and type
  const getScoreColor = () => {
    if (!isValidScore) return 'text-error';
    
    const percentage = (normalizedScore - minScore) / (maxScore - minScore);
    
    switch (type) {
      case 'assessment':
        if (percentage >= 0.8) return 'text-success';
        if (percentage >= 0.6) return 'text-warning';
        return 'text-error';
      case 'mood':
        if (percentage >= 0.7) return 'text-success';
        if (percentage >= 0.4) return 'text-warning';
        return 'text-error';
      case 'streak':
        if (percentage >= 0.9) return 'text-success';
        if (percentage >= 0.7) return 'text-primary';
        return 'text-text-muted';
      case 'progress':
        if (percentage >= 0.8) return 'text-success';
        if (percentage >= 0.5) return 'text-primary';
        return 'text-warning';
      default:
        return 'text-text-primary';
    }
  };

  // Get background color for progress bar
  const getProgressColor = () => {
    if (!isValidScore) return 'bg-error';
    
    const percentage = (normalizedScore - minScore) / (maxScore - minScore);
    
    if (percentage >= 0.8) return 'bg-success';
    if (percentage >= 0.6) return 'bg-warning';
    return 'bg-error';
  };

  // Trend icon rendering
  const trendIconClass = `w-4 h-4 ml-1 ${trend > 0 ? 'text-success' : 'text-error'}`;

  // Format score display
  const formatScore = (value: number) => {
    if (!isValidScore) return 'Invalid';
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(1);
  };

  // Calculate progress percentage
  const progressPercentage = isValidScore 
    ? Math.max(0, Math.min(100, ((normalizedScore - minScore) / (maxScore - minScore)) * 100))
    : 0;

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {/* Score Value */}
      <div className={`text-2xl font-bold ${getScoreColor()} transition-colors duration-200 ${isAnimating ? 'scale-110' : ''}`}>
        {formatScore(displayScore)}
      </div>
      
      {/* Trend Indicator */}
      {showTrend && trend !== 0 && (
        trend > 0 ? (
          <TrendingUp className={trendIconClass} />
        ) : (
          <TrendingDown className={trendIconClass} />
        )
      )}
      
      {/* Progress Bar */}
      <div className="flex-1 min-w-[100px]">
        <div className="w-full bg-surface-elevated rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>{minScore}</span>
          <span>{maxScore}</span>
        </div>
      </div>
      
      {/* Validation Warning */}
      {!isValidScore && (
        <div className="flex items-center space-x-1 text-error text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Invalid score</span>
        </div>
      )}
      
      {/* Score out of bounds warning */}
      {isValidScore && score !== normalizedScore && (
        <div className="text-xs text-warning">
          Score adjusted to valid range
        </div>
      )}
    </div>
  );
}