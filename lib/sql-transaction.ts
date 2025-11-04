import { getSQLManager } from './sql-manager';

/**
 * Interface para representar uma transação SQL
 */
export interface SQLTransaction {
  id: string;
  queries: string[];
  params: any[][];
  status: 'pending' | 'committed' | 'rolled_back';
}

/**
 * Classe para gerenciar transações SQL
 */
export class TransactionManager {
  private transactionId: string | null = null;
  private queries: string[] = [];
  private params: any[][] = [];
  
  /**
   * Inicia uma nova transação
   */
  public async begin(): Promise<string> {
    const sqlManager = await getSQLManager();
    this.transactionId = await sqlManager.beginTransaction();
    this.queries = [];
    this.params = [];
    return this.transactionId;
  }
  
  /**
   * Adiciona uma consulta à transação
   * @param query Consulta SQL
   * @param params Parâmetros da consulta
   */
  public addQuery(query: string, params: any[] = []): void {
    this.queries.push(query);
    this.params.push(params);
  }
  
  /**
   * Confirma a transação
   */
  public async commit(): Promise<any> {
    if (!this.transactionId) {
      throw new Error('Nenhuma transação foi iniciada');
    }
    
    const sqlManager = await getSQLManager();
    
    try {
      // Executa todas as consultas na transação
      for (let i = 0; i < this.queries.length; i++) {
        await sqlManager.executeQuery(this.queries[i], this.params[i]);
      }
      
      // Confirma a transação
      const result = await sqlManager.commitTransaction(this.transactionId);
      
      // Limpa o estado
      this.transactionId = null;
      this.queries = [];
      this.params = [];
      
      return result;
    } catch (error) {
      // Em caso de erro, reverte a transação
      await this.rollback();
      throw error;
    }
  }
  
  /**
   * Reverte a transação
   */
  public async rollback(): Promise<any> {
    if (!this.transactionId) {
      throw new Error('Nenhuma transação foi iniciada');
    }
    
    const sqlManager = await getSQLManager();
    const result = await sqlManager.rollbackTransaction(this.transactionId);
    
    // Limpa o estado
    this.transactionId = null;
    this.queries = [];
    this.params = [];
    
    return result;
  }
}

/**
 * Cria uma nova instância de TransactionManager
 */
export function createTransaction(): TransactionManager {
  return new TransactionManager();
}

/**
 * Executa uma função dentro de uma transação
 * @param callback Função a ser executada dentro da transação
 * @returns Resultado da função
 */
export async function withTransaction<T>(
  callback: (transaction: TransactionManager) => Promise<T>
): Promise<T> {
  const transaction = createTransaction();
  await transaction.begin();
  
  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
