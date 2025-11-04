import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { CookieOptions } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Classe para gerenciar operações SQL diretas com o Supabase
 */
export class SQLManager {
  private static instance: SQLManager;
  public supabase: SupabaseClient;

  private constructor() {}

  /**
   * Obtém a instância singleton do SQLManager
   */
  public static async getInstance(): Promise<SQLManager> {
    if (!SQLManager.instance) {
      SQLManager.instance = new SQLManager();
      await SQLManager.instance.initialize();
    }
    return SQLManager.instance;
  }

  /**
   * Inicializa a conexão com o Supabase
   */
  private async initialize() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase não está configurado corretamente");
      return;
    }

    const cookieStore = cookies();
    this.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Server component - cookies can only be set in Server Actions or Route Handlers
            console.error("Erro ao definir cookies:", error);
          }
        },
      },
    });
  }

  /**
   * Executa uma consulta SQL direta
   * @param query Consulta SQL a ser executada
   * @param params Parâmetros para a consulta
   * @returns Resultado da consulta
   */
  public async executeQuery(query: string, params?: any[]): Promise<any> {
    try {
      const { data, error } = await this.supabase.rpc('execute_sql', {
        sql_query: query,
        params: params || []
      });

      if (error) {
        console.error("Erro ao executar consulta SQL:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Erro ao executar consulta SQL:", error);
      throw error;
    }
  }

  /**
   * Salva um script SQL no banco de dados
   * @param scriptName Nome do script
   * @param scriptContent Conteúdo do script SQL
   * @param description Descrição do script
   * @returns Resultado da operação
   */
  public async saveScript(scriptName: string, scriptContent: string, description: string): Promise<any> {
    try {
      // Usando executeQuery em vez de acessar diretamente
      const result = await this.executeQuery(
        `INSERT INTO sql_scripts (name, content, description, created_at) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [scriptName, scriptContent, description, new Date().toISOString()]
      );

      return result;
    } catch (error) {
      console.error("Erro ao salvar script SQL:", error);
      throw error;
    }
  }

  /**
   * Obtém todos os scripts SQL salvos
   * @returns Lista de scripts SQL
   */
  public async getScripts(): Promise<any[]> {
    try {
      // Usando executeQuery em vez de acessar diretamente
      const result = await this.executeQuery(
        `SELECT * FROM sql_scripts ORDER BY created_at DESC`
      );

      return result || [];
    } catch (error) {
      console.error("Erro ao obter scripts SQL:", error);
      return [];
    }
  }

  /**
   * Inicia uma transação SQL
   * @returns ID da transação
   */
  public async beginTransaction(): Promise<string> {
    try {
      const result = await this.executeQuery('SELECT begin_transaction()');
      return result[0]?.begin_transaction || '';
    } catch (error) {
      console.error("Erro ao iniciar transação:", error);
      throw error;
    }
  }

  /**
   * Confirma uma transação SQL
   * @param transactionId ID da transação
   * @returns Resultado da operação
   */
  public async commitTransaction(transactionId: string): Promise<any> {
    try {
      const result = await this.executeQuery(
        'SELECT commit_transaction($1)',
        [transactionId]
      );
      return result;
    } catch (error) {
      console.error("Erro ao confirmar transação:", error);
      throw error;
    }
  }

  /**
   * Reverte uma transação SQL
   * @param transactionId ID da transação
   * @returns Resultado da operação
   */
  public async rollbackTransaction(transactionId: string): Promise<any> {
    try {
      const result = await this.executeQuery(
        'SELECT rollback_transaction($1)',
        [transactionId]
      );
      return result;
    } catch (error) {
      console.error("Erro ao reverter transação:", error);
      throw error;
    }
  }
}

/**
 * Função para obter uma instância do SQLManager
 * @returns Instância do SQLManager
 */
export async function getSQLManager(): Promise<SQLManager> {
  return SQLManager.getInstance();
}
