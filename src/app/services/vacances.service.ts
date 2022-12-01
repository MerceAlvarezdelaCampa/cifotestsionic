import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vacanca } from '../model/vacanca.model';

@Injectable({
  providedIn: 'root'
})
export class VacancesService {

  constructor(private firestore: Firestore) { }

  getVacances(): Observable<Vacanca[]> {
    const VacancesRef = collection(this.firestore, 'vacances');
    return collectionData(VacancesRef, { idField: 'id'}) as Observable<Vacanca[]>;
  }

  getVacancaById(id: string): Observable<Vacanca> {
    const VacancaDocRef = doc(this.firestore, `vacances/${id}`);
    return docData(VacancaDocRef, { idField: 'id' }) as Observable<Vacanca>;
  }

  addVacanca(vacanca: Vacanca) {
    const VacancesRef = collection(this.firestore, 'vacances');
    return addDoc(VacancesRef, vacanca);
  }

  deleteVacanca(id: string) {
    const VacancaDocRef = doc(this.firestore, `vacances/${id}`);
    return deleteDoc(VacancaDocRef);
  }

  updateVacanca(vacanca: Vacanca, id: string) {
    const VacancaDocRef = doc(this.firestore, `vacances/${id}`);
    return updateDoc(VacancaDocRef, {
      nom: vacanca.nom,
      descripcio: vacanca.descripcio,
      preu: vacanca.preu,
      pais: vacanca.pais,
      user: vacanca.user
    });
  }

}
