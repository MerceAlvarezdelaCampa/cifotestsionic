import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ParamsDetail } from '../model/state.models';
import { Vacanca } from '../model/vacanca.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VacancesService {

  paramsDetail: ParamsDetail;

  vacances: Vacanca[];

  constructor(private firestore: Firestore,
    private authService: AuthService) {
      this.paramsDetail = {
        id: ''
      }
      this.vacances = [];
    }

  async getVacances(): Promise<Vacanca[]> {
    const userid = await this.authService.getLoggedUserUid();
    return new Promise((resolve, reject) => {
      if(this.vacances.length > 0) {
        resolve(this.vacances);
      } else {
        const q = query(collection(this.firestore, "vacances"), where("user", "==", userid));
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            const v: Vacanca = { ...doc.data() as Vacanca, id: doc.id }
            this.vacances.push(v)
          });
          resolve(this.vacances);
        })
      }
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

  setParamsDetail(params: ParamsDetail) {
    // this.paramsDetail = params;
    sessionStorage.setItem('params', JSON.stringify(params));
  }

  getParamsDetail() {
    // return this.paramsDetail;
    return JSON.parse(sessionStorage.getItem('params')!);
  }

}
