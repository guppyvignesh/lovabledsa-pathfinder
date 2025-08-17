export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          author_avatar: string | null
          author_name: string | null
          category: string
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          likes: number | null
          published_at: string | null
          read_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_name?: string | null
          category: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          likes?: number | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string | null
          category?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          likes?: number | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_size: string | null
          created_at: string
          description: string | null
          easy_problems: number | null
          featured: boolean | null
          hard_problems: number | null
          headquarters: string | null
          id: string
          industry: string | null
          is_hiring: boolean | null
          logo_url: string | null
          medium_problems: number | null
          name: string
          total_problems: number | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          company_size?: string | null
          created_at?: string
          description?: string | null
          easy_problems?: number | null
          featured?: boolean | null
          hard_problems?: number | null
          headquarters?: string | null
          id?: string
          industry?: string | null
          is_hiring?: boolean | null
          logo_url?: string | null
          medium_problems?: number | null
          name: string
          total_problems?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          company_size?: string | null
          created_at?: string
          description?: string | null
          easy_problems?: number | null
          featured?: boolean | null
          hard_problems?: number | null
          headquarters?: string | null
          id?: string
          industry?: string | null
          is_hiring?: boolean | null
          logo_url?: string | null
          medium_problems?: number | null
          name?: string
          total_problems?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      dsa_sheets: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          name: string
          solved_problems: number | null
          tags: string[] | null
          total_problems: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          name: string
          solved_problems?: number | null
          tags?: string[] | null
          total_problems?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          name?: string
          solved_problems?: number | null
          tags?: string[] | null
          total_problems?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applied_date: string | null
          created_at: string
          id: string
          job_id: string
          notes: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_date?: string | null
          created_at?: string
          id?: string
          job_id: string
          notes?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_date?: string | null
          created_at?: string
          id?: string
          job_id?: string
          notes?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          apply_url: string | null
          company_logo: string | null
          company_name: string
          created_at: string
          currency: string | null
          description: string | null
          experience_level: string | null
          id: string
          is_active: boolean | null
          job_type: string | null
          location: string | null
          posted_date: string | null
          requirements: string[] | null
          salary_max: number | null
          salary_min: number | null
          skills: string[] | null
          source: string | null
          title: string
          updated_at: string
          work_mode: string | null
        }
        Insert: {
          apply_url?: string | null
          company_logo?: string | null
          company_name: string
          created_at?: string
          currency?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          source?: string | null
          title: string
          updated_at?: string
          work_mode?: string | null
        }
        Update: {
          apply_url?: string | null
          company_logo?: string | null
          company_name?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          location?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          skills?: string[] | null
          source?: string | null
          title?: string
          updated_at?: string
          work_mode?: string | null
        }
        Relationships: []
      }
      platform_stats: {
        Row: {
          display_order: number | null
          id: string
          is_active: boolean | null
          stat_description: string | null
          stat_label: string
          stat_name: string
          stat_value: number
          updated_at: string
        }
        Insert: {
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          stat_description?: string | null
          stat_label: string
          stat_name: string
          stat_value: number
          updated_at?: string
        }
        Update: {
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          stat_description?: string | null
          stat_label?: string
          stat_name?: string
          stat_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      problems: {
        Row: {
          acceptance_rate: number | null
          company_ids: string[] | null
          created_at: string
          description: string | null
          difficulty: string
          dislikes: number | null
          hints: string[] | null
          id: string
          is_premium: boolean | null
          leetcode_url: string | null
          likes: number | null
          practice_url: string | null
          slug: string
          solution_approach: string | null
          space_complexity: string | null
          time_complexity: string | null
          title: string
          topics: string[] | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          company_ids?: string[] | null
          created_at?: string
          description?: string | null
          difficulty: string
          dislikes?: number | null
          hints?: string[] | null
          id?: string
          is_premium?: boolean | null
          leetcode_url?: string | null
          likes?: number | null
          practice_url?: string | null
          slug: string
          solution_approach?: string | null
          space_complexity?: string | null
          time_complexity?: string | null
          title: string
          topics?: string[] | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          company_ids?: string[] | null
          created_at?: string
          description?: string | null
          difficulty?: string
          dislikes?: number | null
          hints?: string[] | null
          id?: string
          is_premium?: boolean | null
          leetcode_url?: string | null
          likes?: number | null
          practice_url?: string | null
          slug?: string
          solution_approach?: string | null
          space_complexity?: string | null
          time_complexity?: string | null
          title?: string
          topics?: string[] | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country_code: string | null
          created_at: string
          current_streak: number | null
          email: string
          full_name: string
          id: string
          is_admin: boolean | null
          max_streak: number | null
          mobile_number: string | null
          plan_type: string | null
          problems_solved: number | null
          sheets_created: number | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          country_code?: string | null
          created_at?: string
          current_streak?: number | null
          email: string
          full_name: string
          id?: string
          is_admin?: boolean | null
          max_streak?: number | null
          mobile_number?: string | null
          plan_type?: string | null
          problems_solved?: number | null
          sheets_created?: number | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          country_code?: string | null
          created_at?: string
          current_streak?: number | null
          email?: string
          full_name?: string
          id?: string
          is_admin?: boolean | null
          max_streak?: number | null
          mobile_number?: string | null
          plan_type?: string | null
          problems_solved?: number | null
          sheets_created?: number | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      roadmaps: {
        Row: {
          banner_url: string | null
          completion_rate: number | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          estimated_duration: string | null
          icon_url: string | null
          id: string
          is_coming_soon: boolean | null
          is_published: boolean | null
          prerequisites: string[] | null
          role_type: string
          skills: string[] | null
          slug: string
          steps: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: string | null
          icon_url?: string | null
          id?: string
          is_coming_soon?: boolean | null
          is_published?: boolean | null
          prerequisites?: string[] | null
          role_type: string
          skills?: string[] | null
          slug: string
          steps?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: string | null
          icon_url?: string | null
          id?: string
          is_coming_soon?: boolean | null
          is_published?: boolean | null
          prerequisites?: string[] | null
          role_type?: string
          skills?: string[] | null
          slug?: string
          steps?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_solutions: {
        Row: {
          created_at: string
          id: string
          language: string | null
          notes: string | null
          problem_id: string
          solution_code: string | null
          solved_at: string | null
          status: string
          time_taken: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          language?: string | null
          notes?: string | null
          problem_id: string
          solution_code?: string | null
          solved_at?: string | null
          status: string
          time_taken?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          language?: string | null
          notes?: string | null
          problem_id?: string
          solution_code?: string | null
          solved_at?: string | null
          status?: string
          time_taken?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_solutions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
