import { getSQLManager } from './sql-manager';
import fs from 'fs';
import path from 'path';

/**
 * Interface para representar um script SQL
 */
export interface SQLScript {
  id?: string;
  name: string;
  content: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Salva um script SQL no banco de dados
 * @param script Objeto do script SQL
 * @returns Script salvo
 */
export async function saveScriptToDatabase(script: SQLScript): Promise<SQLScript | null> {
  const sqlManager = await getSQLManager();
  
  try {
    const result = await sqlManager.saveScript(script.name, script.content, script.description);
    return result[0] || null;
  } catch (error) {
    console.error('Erro ao salvar script no banco de dados:', error);
    return null;
  }
}

/**
 * Salva um script SQL em arquivo
 * @param script Objeto do script SQL
 * @param directory Diretório onde o arquivo será salvo
 * @returns Caminho do arquivo salvo
 */
export async function saveScriptToFile(script: SQLScript, directory: string = 'scripts'): Promise<string | null> {
  try {
    // Garante que o diretório existe
    const dirPath = path.resolve(process.cwd(), directory);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Cria nome de arquivo seguro
    const fileName = `${script.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.sql`;
    const filePath = path.join(dirPath, fileName);
    
    // Adiciona comentário com descrição e data
    const timestamp = new Date().toISOString();
    const fileContent = `-- ${script.description}\n-- Criado em: ${timestamp}\n\n${script.content}`;
    
    // Escreve o arquivo
    fs.writeFileSync(filePath, fileContent, 'utf8');
    
    return filePath;
  } catch (error) {
    console.error('Erro ao salvar script em arquivo:', error);
    return null;
  }
}

/**
 * Executa um script SQL
 * @param script Objeto do script SQL ou conteúdo do script
 * @returns Resultado da execução
 */
export async function executeScript(script: SQLScript | string): Promise<any> {
  const sqlManager = await getSQLManager();
  const scriptContent = typeof script === 'string' ? script : script.content;
  
  try {
    return await sqlManager.executeQuery(scriptContent);
  } catch (error) {
    console.error('Erro ao executar script SQL:', error);
    throw error;
  }
}

/**
 * Carrega um script SQL de um arquivo
 * @param filePath Caminho do arquivo
 * @returns Conteúdo do script
 */
export function loadScriptFromFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Erro ao carregar script do arquivo:', error);
    throw error;
  }
}

/**
 * Obtém todos os scripts SQL salvos no banco de dados
 * @returns Lista de scripts
 */
export async function getAllScripts(): Promise<SQLScript[]> {
  const sqlManager = await getSQLManager();
  return sqlManager.getScripts();
}

/**
 * Obtém um script SQL pelo ID
 * @param scriptId ID do script
 * @returns Script encontrado ou null
 */
export async function getScriptById(scriptId: string): Promise<SQLScript | null> {
  const sqlManager = await getSQLManager();
  
  try {
    // Usando executeQuery em vez de acessar supabase diretamente
    const result = await sqlManager.executeQuery(
      'SELECT * FROM sql_scripts WHERE id = $1',
      [scriptId]
    );
    
    return result && result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Erro ao buscar script por ID:', error);
    return null;
  }
}
