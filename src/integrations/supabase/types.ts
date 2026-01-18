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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      arc_dapps: {
        Row: {
          actions: Json
          category: string
          chain_id: number
          created_at: string
          description: string
          icon_url: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          is_verified: boolean
          name: string
          slug: string
          target_contract: string | null
          updated_at: string
          website_url: string
        }
        Insert: {
          actions?: Json
          category: string
          chain_id?: number
          created_at?: string
          description?: string
          icon_url?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          is_verified?: boolean
          name: string
          slug: string
          target_contract?: string | null
          updated_at?: string
          website_url: string
        }
        Update: {
          actions?: Json
          category?: string
          chain_id?: number
          created_at?: string
          description?: string
          icon_url?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          is_verified?: boolean
          name?: string
          slug?: string
          target_contract?: string | null
          updated_at?: string
          website_url?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          actions_completed: string[] | null
          caption: string
          created_at: string
          id: string
          image_url: string | null
          intent_category: string | null
          is_minted: boolean
          minted_at: string | null
          proof_hash: string | null
          share_count: number
          target_dapps: string[] | null
          updated_at: string
          user_id: string | null
          wallet_address: string
        }
        Insert: {
          actions_completed?: string[] | null
          caption: string
          created_at?: string
          id?: string
          image_url?: string | null
          intent_category?: string | null
          is_minted?: boolean
          minted_at?: string | null
          proof_hash?: string | null
          share_count?: number
          target_dapps?: string[] | null
          updated_at?: string
          user_id?: string | null
          wallet_address: string
        }
        Update: {
          actions_completed?: string[] | null
          caption?: string
          created_at?: string
          id?: string
          image_url?: string | null
          intent_category?: string | null
          is_minted?: boolean
          minted_at?: string | null
          proof_hash?: string | null
          share_count?: number
          target_dapps?: string[] | null
          updated_at?: string
          user_id?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      daily_task_completions: {
        Row: {
          action: string
          created_at: string
          dapp_id: string | null
          id: string
          task_date: string
          tx_hash: string | null
          verified_at: string | null
          wallet_address: string
        }
        Insert: {
          action: string
          created_at?: string
          dapp_id?: string | null
          id?: string
          task_date?: string
          tx_hash?: string | null
          verified_at?: string | null
          wallet_address: string
        }
        Update: {
          action?: string
          created_at?: string
          dapp_id?: string | null
          id?: string
          task_date?: string
          tx_hash?: string | null
          verified_at?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_task_completions_dapp_id_fkey"
            columns: ["dapp_id"]
            isOneToOne: false
            referencedRelation: "arc_dapps"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          badge_image_url: string | null
          badge_minted: boolean | null
          badge_minted_at: string | null
          created_at: string
          id: string
          ip_address: string | null
          share_count: number
          twitter_followed: boolean
          wallet_address: string
        }
        Insert: {
          badge_image_url?: string | null
          badge_minted?: boolean | null
          badge_minted_at?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          share_count?: number
          twitter_followed?: boolean
          wallet_address: string
        }
        Update: {
          badge_image_url?: string | null
          badge_minted?: boolean | null
          badge_minted_at?: string | null
          created_at?: string
          id?: string
          ip_address?: string | null
          share_count?: number
          twitter_followed?: boolean
          wallet_address?: string
        }
        Relationships: []
      }
    }
    Views: {
      waitlist_stats: {
        Row: {
          total_count: number | null
        }
        Relationships: []
      }
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
