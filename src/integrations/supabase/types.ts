export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          author: string
          category: string
          category_en: string | null
          category_fr: string | null
          category_ht: string | null
          content: string
          content_en: string | null
          content_fr: string | null
          content_ht: string | null
          created_at: string
          date: string
          excerpt: string
          excerpt_en: string | null
          excerpt_fr: string | null
          excerpt_ht: string | null
          id: string
          image_url: string | null
          published: boolean
          read_time: string
          slug: string
          title: string
          title_en: string | null
          title_fr: string | null
          title_ht: string | null
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          category_en?: string | null
          category_fr?: string | null
          category_ht?: string | null
          content: string
          content_en?: string | null
          content_fr?: string | null
          content_ht?: string | null
          created_at?: string
          date: string
          excerpt: string
          excerpt_en?: string | null
          excerpt_fr?: string | null
          excerpt_ht?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          read_time: string
          slug: string
          title: string
          title_en?: string | null
          title_fr?: string | null
          title_ht?: string | null
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          category_en?: string | null
          category_fr?: string | null
          category_ht?: string | null
          content?: string
          content_en?: string | null
          content_fr?: string | null
          content_ht?: string | null
          created_at?: string
          date?: string
          excerpt?: string
          excerpt_en?: string | null
          excerpt_fr?: string | null
          excerpt_ht?: string | null
          id?: string
          image_url?: string | null
          published?: boolean
          read_time?: string
          slug?: string
          title?: string
          title_en?: string | null
          title_fr?: string | null
          title_ht?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      homepage_slider: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          link_url: string | null
          main_image_url: string | null
          order_position: number | null
          subtitle: string | null
          tags: string[] | null
          thumbnail_url: string
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          link_url?: string | null
          main_image_url?: string | null
          order_position?: number | null
          subtitle?: string | null
          tags?: string[] | null
          thumbnail_url: string
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          link_url?: string | null
          main_image_url?: string | null
          order_position?: number | null
          subtitle?: string | null
          tags?: string[] | null
          thumbnail_url?: string
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      inspiration_gallery: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_active: boolean | null
          order_position: number | null
          source_url: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          order_position?: number | null
          source_url?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          order_position?: number | null
          source_url?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
          subscribed_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email: string
          id?: string
          subscribed_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          after_image_url: string | null
          before_image_url: string | null
          category: string | null
          category_en: string | null
          category_fr: string | null
          category_ht: string | null
          content: string | null
          created_at: string
          date: string
          description: string
          description_en: string | null
          description_fr: string | null
          description_ht: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          images: string[] | null
          location: string | null
          location_en: string | null
          location_fr: string | null
          location_ht: string | null
          meta_description: string | null
          meta_title: string | null
          project_type: string | null
          published: boolean
          slug: string | null
          tags: string[] | null
          title: string
          title_en: string | null
          title_fr: string | null
          title_ht: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          after_image_url?: string | null
          before_image_url?: string | null
          category?: string | null
          category_en?: string | null
          category_fr?: string | null
          category_ht?: string | null
          content?: string | null
          created_at?: string
          date: string
          description: string
          description_en?: string | null
          description_fr?: string | null
          description_ht?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          location?: string | null
          location_en?: string | null
          location_fr?: string | null
          location_ht?: string | null
          meta_description?: string | null
          meta_title?: string | null
          project_type?: string | null
          published?: boolean
          slug?: string | null
          tags?: string[] | null
          title: string
          title_en?: string | null
          title_fr?: string | null
          title_ht?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          after_image_url?: string | null
          before_image_url?: string | null
          category?: string | null
          category_en?: string | null
          category_fr?: string | null
          category_ht?: string | null
          content?: string | null
          created_at?: string
          date?: string
          description?: string
          description_en?: string | null
          description_fr?: string | null
          description_ht?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          location?: string | null
          location_en?: string | null
          location_fr?: string | null
          location_ht?: string | null
          meta_description?: string | null
          meta_title?: string | null
          project_type?: string | null
          published?: boolean
          slug?: string | null
          tags?: string[] | null
          title?: string
          title_en?: string | null
          title_fr?: string | null
          title_ht?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          description_en: string | null
          description_fr: string | null
          description_ht: string | null
          duration: string | null
          features: string[] | null
          icon: string | null
          id: string
          order_position: number | null
          price_range: string | null
          published: boolean
          title: string
          title_en: string | null
          title_fr: string | null
          title_ht: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_en?: string | null
          description_fr?: string | null
          description_ht?: string | null
          duration?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          order_position?: number | null
          price_range?: string | null
          published?: boolean
          title: string
          title_en?: string | null
          title_fr?: string | null
          title_ht?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_en?: string | null
          description_fr?: string | null
          description_ht?: string | null
          duration?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          order_position?: number | null
          price_range?: string | null
          published?: boolean
          title?: string
          title_en?: string | null
          title_fr?: string | null
          title_ht?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      static_content: {
        Row: {
          content: string
          id: string
          key: string
          language: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          id?: string
          key: string
          language?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          id?: string
          key?: string
          language?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      translations: {
        Row: {
          created_at: string
          english: string | null
          french: string | null
          id: string
          key: string
          kreyol: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          english?: string | null
          french?: string | null
          id?: string
          key: string
          kreyol: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          english?: string | null
          french?: string | null
          id?: string
          key?: string
          kreyol?: string
          updated_at?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
