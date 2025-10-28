import { getSQLManager } from './sql-manager';

/**
 * Funções para operações CRUD com tabelas SQL
 */

/**
 * Busca registros de uma tabela
 * @param tableName Nome da tabela
 * @param conditions Condições da consulta (WHERE)
 * @param fields Campos a serem retornados
 * @param orderBy Campo para ordenação
 * @param orderDirection Direção da ordenação
 * @param limit Limite de registros
 * @param offset Offset para paginação
 * @returns Registros encontrados
 */
export async function selectRecords(
  tableName: string,
  conditions?: Record<string, any>,
  fields: string[] = ['*'],
  orderBy?: string,
  orderDirection: 'ASC' | 'DESC' = 'ASC',
  limit?: number,
  offset?: number
): Promise<any[]> {
  const sqlManager = await getSQLManager();
  
  let query = `SELECT ${fields.join(', ')} FROM ${tableName}`;
  const params: any[] = [];
  
  // Adiciona condições WHERE
  if (conditions && Object.keys(conditions).length > 0) {
    const whereConditions = Object.entries(conditions).map(([key, _], index) => {
      params.push(Object.values(conditions)[index]);
      return `${key} = $${index + 1}`;
    });
    
    query += ` WHERE ${whereConditions.join(' AND ')}`;
  }
  
  // Adiciona ordenação
  if (orderBy) {
    query += ` ORDER BY ${orderBy} ${orderDirection}`;
  }
  
  // Adiciona limite
  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  
  // Adiciona offset
  if (offset) {
    query += ` OFFSET ${offset}`;
  }
  
  return sqlManager.executeQuery(query, params);
}

/**
 * Insere um registro em uma tabela
 * @param tableName Nome da tabela
 * @param data Dados a serem inseridos
 * @returns Registro inserido
 */
export async function insertRecord(
  tableName: string,
  data: Record<string, any>
): Promise<any> {
  const sqlManager = await getSQLManager();
  
  const fields = Object.keys(data);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);
  
  const query = `
    INSERT INTO ${tableName} (${fields.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
  `;
  
  const result = await sqlManager.executeQuery(query, values);
  return result[0];
}

/**
 * Atualiza registros em uma tabela
 * @param tableName Nome da tabela
 * @param data Dados a serem atualizados
 * @param conditions Condições para atualização (WHERE)
 * @returns Registros atualizados
 */
export async function updateRecords(
  tableName: string,
  data: Record<string, any>,
  conditions: Record<string, any>
): Promise<any[]> {
  const sqlManager = await getSQLManager();
  
  const updateFields = Object.keys(data).map((key, index) => `${key} = $${index + 1}`);
  const updateValues = Object.values(data);
  
  const whereConditions = Object.entries(conditions).map(([key, _], index) => {
    return `${key} = $${index + updateValues.length + 1}`;
  });
  
  const params = [...updateValues, ...Object.values(conditions)];
  
  const query = `
    UPDATE ${tableName}
    SET ${updateFields.join(', ')}
    WHERE ${whereConditions.join(' AND ')}
    RETURNING *
  `;
  
  return sqlManager.executeQuery(query, params);
}

/**
 * Remove registros de uma tabela
 * @param tableName Nome da tabela
 * @param conditions Condições para remoção (WHERE)
 * @returns Registros removidos
 */
export async function deleteRecords(
  tableName: string,
  conditions: Record<string, any>
): Promise<any[]> {
  const sqlManager = await getSQLManager();
  
  const whereConditions = Object.entries(conditions).map(([key, _], index) => {
    return `${key} = $${index + 1}`;
  });
  
  const params = Object.values(conditions);
  
  const query = `
    DELETE FROM ${tableName}
    WHERE ${whereConditions.join(' AND ')}
    RETURNING *
  `;
  
  return sqlManager.executeQuery(query, params);
}

/**
 * Executa uma consulta SQL personalizada
 * @param query Consulta SQL
 * @param params Parâmetros da consulta
 * @returns Resultado da consulta
 */
export async function executeCustomQuery(
  query: string,
  params?: any[]
): Promise<any[]> {
  const sqlManager = await getSQLManager();
  return sqlManager.executeQuery(query, params);
}

/**
 * Busca um registro por ID
 * @param tableName Nome da tabela
 * @param id ID do registro
 * @param idField Nome do campo ID (padrão: 'id')
 * @returns Registro encontrado ou null
 */
export async function getRecordById(
  tableName: string,
  id: string | number,
  idField: string = 'id'
): Promise<any | null> {
  const result = await selectRecords(tableName, { [idField]: id });
  return result.length > 0 ? result[0] : null;
}