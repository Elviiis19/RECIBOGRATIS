export interface SavedDocument {
  id: string;
  category: 'recibo' | 'declaracao' | 'outro';
  modelSlug: string;
  title: string;
  createdAt: number;
  formattedDate: string;
  valor?: string;
  pagador?: string;
  recebedor?: string;
  descricao?: string;
  url: string;
  formData: Record<string, any>;
}

const STORAGE_KEY = 'rg_saved_documents';
const EDIT_KEY = 'rg_prefill_document';

export function getSavedDocuments(): SavedDocument[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    return [];
  } catch (e) {
    console.error('Erro ao ler documentos salvos:', e);
    return [];
  }
}

export function saveDocument(
  doc: Omit<SavedDocument, 'id' | 'createdAt'>
): SavedDocument | null {
  if (typeof window === 'undefined') return null;
  try {
    const existing = getSavedDocuments();
    
    // Check if duplicate action in last 10 seconds with same values
    const now = Date.now();
    const newDoc: SavedDocument = {
      ...doc,
      id: `doc_${now}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
    };

    // Keep max 100 items to prevent storage limits
    const updated = [newDoc, ...existing.filter(item => 
      !(item.modelSlug === doc.modelSlug && 
        item.valor === doc.valor && 
        item.pagador === doc.pagador && 
        Math.abs(item.createdAt - now) < 5000)
    )].slice(0, 100);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('rg-documents-updated'));
    return newDoc;
  } catch (e) {
    console.error('Erro ao salvar documento:', e);
    return null;
  }
}

export function deleteDocument(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedDocuments();
    const updated = existing.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('rg-documents-updated'));
  } catch (e) {
    console.error('Erro ao excluir documento:', e);
  }
}

export function clearAllDocuments(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('rg-documents-updated'));
  } catch (e) {
    console.error('Erro ao limpar documentos:', e);
  }
}

export function setDocumentToDuplicate(doc: SavedDocument): void {
  if (typeof window === 'undefined') return;
  try {
    // Clone form data and update date to today if applicable
    const today = new Date().toISOString().split('T')[0];
    const clonedData = {
      ...doc.formData,
      data: today,
      dataPagamento: today,
    };
    sessionStorage.setItem(EDIT_KEY, JSON.stringify({
      ...doc,
      formData: clonedData,
      isDuplicate: true,
    }));
  } catch (e) {
    console.error('Erro ao preparar duplicação:', e);
  }
}

export function getDocumentToPrefill(): { doc: SavedDocument; isDuplicate: boolean } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(EDIT_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(EDIT_KEY);
    const parsed = JSON.parse(raw);
    return {
      doc: parsed,
      isDuplicate: !!parsed.isDuplicate,
    };
  } catch (e) {
    return null;
  }
}
