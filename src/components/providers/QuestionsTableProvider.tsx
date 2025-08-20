import { createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

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

interface QuestionsTableContextType {
  fetchQuestions: (questionIds: string[], page?: number, limit?: number) => Promise<Question[]>;
  fetchQuestionsByCompany: (companyId: string, page?: number, limit?: number) => Promise<Question[]>;
  fetchAllQuestions: (page?: number, limit?: number) => Promise<{ questions: Question[]; total: number }>;
}

const QuestionsTableContext = createContext<QuestionsTableContextType | undefined>(undefined);

export function QuestionsTableProvider({ children }: { children: ReactNode }) {
  const fetchQuestions = async (questionIds: string[], page = 1, limit = 25): Promise<Question[]> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .in('id', questionIds)
      .range(startIndex, endIndex);

    if (error) throw error;
    return data || [];
  };

  const fetchQuestionsByCompany = async (companyId: string, page = 1, limit = 25): Promise<Question[]> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .contains('company_ids', [companyId])
      .range(startIndex, endIndex);

    if (error) throw error;
    return data || [];
  };

  const fetchAllQuestions = async (page = 1, limit = 25): Promise<{ questions: Question[]; total: number }> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    const [{ data: questions, error: questionsError }, { count, error: countError }] = await Promise.all([
      supabase
        .from('problems')
        .select('*')
        .range(startIndex, endIndex),
      supabase
        .from('problems')
        .select('*', { count: 'exact', head: true })
    ]);

    if (questionsError || countError) throw questionsError || countError;
    
    return {
      questions: questions || [],
      total: count || 0
    };
  };

  return (
    <QuestionsTableContext.Provider
      value={{
        fetchQuestions,
        fetchQuestionsByCompany,
        fetchAllQuestions,
      }}
    >
      {children}
    </QuestionsTableContext.Provider>
  );
}

export function useQuestionsTable() {
  const context = useContext(QuestionsTableContext);
  if (context === undefined) {
    throw new Error('useQuestionsTable must be used within a QuestionsTableProvider');
  }
  return context;
}