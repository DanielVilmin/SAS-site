import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import type { Campaign } from './campaigns.types';

// Converter timestamp do Firestore para string de data
function formatDate(timestamp: any): string {
  if (!timestamp) return new Date().toLocaleDateString('pt-PT');
  
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString('pt-PT');
  }
  
  return timestamp;
}

// Buscar campanhas em tempo real
export function getCampaignsRealtime(callback: (campaigns: Campaign[]) => void) {
  const q = query(
    collection(db, 'campaigns'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const campaigns: Campaign[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      campaigns.push({
        id: doc.id,
        title: data.title,
        date: formatDate(data.date),
        description: data.description,
        image: data.image
      });
    });
    callback(campaigns);
  });
}

// Adicionar nova campanha
export async function addCampaign(campaign: Omit<Campaign, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'campaigns'), {
      ...campaign,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('Campanha criada com ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Erro ao criar campanha:', error);
    throw error;
  }
}

// Atualizar campanha existente
export async function updateCampaign(id: string, data: Partial<Campaign>) {
  try {
    const docRef = doc(db, 'campaigns', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    console.log('Campanha atualizada:', id);
  } catch (error) {
    console.error('Erro ao atualizar campanha:', error);
    throw error;
  }
}

// Deletar campanha
export async function deleteCampaign(id: string) {
  try {
    const docRef = doc(db, 'campaigns', id);
    await deleteDoc(docRef);
    console.log('Campanha deletada:', id);
  } catch (error) {
    console.error('Erro ao deletar campanha:', error);
    throw error;
  }
}