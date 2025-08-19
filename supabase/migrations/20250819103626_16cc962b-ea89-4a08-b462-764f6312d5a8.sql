-- Fix the difficulty constraint and insert official DSA sheets
ALTER TABLE public.dsa_sheets DROP CONSTRAINT IF EXISTS dsa_sheets_difficulty_check;
ALTER TABLE public.dsa_sheets ADD CONSTRAINT dsa_sheets_difficulty_check 
  CHECK (difficulty IN ('easy', 'medium', 'hard', 'mixed', 'easy-medium', 'medium-hard'));

-- Insert official DSA sheets that the user requested
INSERT INTO public.dsa_sheets (
  id,
  user_id,
  name,
  description,
  difficulty,
  total_problems,
  solved_problems,
  is_public,
  is_featured,
  tags
) VALUES 
  (
    'a0000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'Striver''s A2Z DSA Course/Sheet',
    'Complete DSA preparation with step-by-step approach covering all important topics',
    'mixed',
    180,
    0,
    true,
    true,
    ARRAY['beginner-friendly', 'comprehensive', 'structured', 'interview-prep']
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'LeetCode Blind 75',
    'Essential 75 problems to crack any coding interview, curated by Blind community',
    'mixed',
    75,
    0,
    true,
    true,
    ARRAY['interview-prep', 'essential', 'FAANG', 'curated']
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'Striver''s SDE Sheet (Top 150)',
    'Must-do problems for Software Development Engineer interviews',
    'medium-hard',
    150,
    0,
    true,
    true,
    ARRAY['SDE', 'interview-prep', 'advanced', 'top-companies']
  );