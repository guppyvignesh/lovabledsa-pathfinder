import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Circle, 
  ExternalLink, 
  Play, 
  Code, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  HeartOff
} from "lucide-react";
import { useQuestionsTable } from "@/components/providers/QuestionsTableProvider";

interface Question {
  id: string;
  title: string;
  difficulty: string;
  topics: string[];
  leetcode_url?: string;
  practice_url?: string;
  video_url?: string;
  company_ids: string[];
  is_premium: boolean;
  acceptance_rate?: number;
  likes: number;
  dislikes: number;
}

interface QuestionsTableProps {
  questionIds?: string[];
  companyId?: string;
  showPagination?: boolean;
  pageSize?: number;
  title?: string;
}

export function QuestionsTable({ 
  questionIds, 
  companyId, 
  showPagination = false, 
  pageSize = 25,
  title = "Questions"
}: QuestionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchQuestions, fetchQuestionsByCompany, fetchAllQuestions } = useQuestionsTable();

  const { data, isLoading, error } = useQuery({
    queryKey: ['questions', questionIds, companyId, currentPage, pageSize],
    queryFn: async () => {
      if (questionIds) {
        return { questions: await fetchQuestions(questionIds, currentPage, pageSize), total: questionIds.length };
      } else if (companyId) {
        const questions = await fetchQuestionsByCompany(companyId, currentPage, pageSize);
        return { questions, total: questions.length };
      } else {
        return await fetchAllQuestions(currentPage, pageSize);
      }
    },
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Error loading questions</p>
      </div>
    );
  }

  const questions = data?.questions || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">
          {data?.total || 0} questions
        </span>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-24">Difficulty</TableHead>
              <TableHead className="w-32">Actions</TableHead>
              <TableHead>Topics</TableHead>
              <TableHead className="w-20">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question: Question) => (
              <TableRow key={question.id}>
                <TableCell>
                  <Circle className="h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{question.title}</span>
                    {question.is_premium && (
                      <Badge variant="outline" className="text-xs text-warning border-warning">
                        Premium
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {question.video_url && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={question.video_url} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {question.practice_url && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={question.practice_url} target="_blank" rel="noopener noreferrer">
                          <Code className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {question.leetcode_url && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={question.leetcode_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {question.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {question.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{question.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1 text-sm">
                    <Heart className="h-4 w-4 text-success" />
                    <span>{question.likes}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data?.total || 0)} of {data?.total || 0} questions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}