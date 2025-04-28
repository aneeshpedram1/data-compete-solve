
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";

export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // Duration in minutes
  participants: number;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Intermediate":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Advanced":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const ChallengeCard: React.FC<ChallengeProps> = ({
  id,
  title,
  description,
  difficulty,
  duration,
  participants,
}) => {
  const difficultyColor = getDifficultyColor(difficulty);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Badge variant="outline" className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4" />
          <span>{duration} min</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Award className="h-4 w-4" />
          <span>{participants} participants</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/challenges/${id}`} className="w-full">
          <Button className="w-full" variant="default">
            View Challenge <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
