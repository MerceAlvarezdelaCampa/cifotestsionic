import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vacanca } from '../model/vacanca.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VacancesService {

  constructor(private firestore: Firestore,
    private authService: AuthService) { }

  async getVacances(): Promise<Vacanca[]> {
    const userid = await this.authService.getLoggedUserUid();
    return new Promise((resolve, reject) => {
      const q = query(collection(this.firestore, "vacances"), where("user", "==", userid));
      getDocs(q).then((querySnapshot) => {
        const vacances: Vacanca[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const v: Vacanca = {
            ...doc.data() as Vacanca, id: doc.id
          }
          vacances.push(v)
        });
        resolve(vacances);
      })
    })
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
