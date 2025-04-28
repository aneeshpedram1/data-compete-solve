
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

interface TimerProps {
  duration: number; // Duration in minutes
  onTimeEnd: () => void;
  active: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeEnd, active }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const { toast } = useToast();
  
  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [active, onTimeEnd]);

  useEffect(() => {
    // Show notifications at specific intervals
    if (active) {
      const thirtyMinWarning = 30 * 60;
      const tenMinWarning = 10 * 60;
      const oneMinWarning = 60;

      if (timeLeft === thirtyMinWarning) {
        toast({
          title: "30 minutes remaining",
          description: "You're running out of time!",
          variant: "destructive",
        });
      } else if (timeLeft === tenMinWarning) {
        toast({
          title: "10 minutes remaining",
          description: "Almost out of time!",
          variant: "destructive",
        });
      } else if (timeLeft === oneMinWarning) {
        toast({
          title: "1 minute remaining",
          description: "Hurry up! Time is almost over!",
          variant: "destructive",
        });
      }
    }
  }, [timeLeft, active, toast]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (value: number) => String(value).padStart(2, "0");

  const getTimerColor = () => {
    if (timeLeft <= 60) return "text-red-600";
    if (timeLeft <= 10 * 60) return "text-orange-600";
    return "text-blue-600";
  };

  if (!active) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${getTimerColor()}`}>
      <div className="flex items-center">
        {timeLeft <= 10 * 60 && <AlertCircle className="mr-1 h-4 w-4" />}
        <div className="text-xl font-mono">
          {hours > 0 && `${formatTime(hours)}:`}
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
      </div>
    </div>
  );
};

export default Timer;
