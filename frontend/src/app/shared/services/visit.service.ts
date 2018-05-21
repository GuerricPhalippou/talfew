import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { VisitClass } from "../../core/models/VisitClass";

@Injectable()
export class VisitService {
    constructor(private http: HttpClient) { }

    post(visit: VisitClass) {
        return this.http.post<any>('/visits', visit);
    }

    getAll(): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>('/visits').pipe(
            map(res => res.map(item => new VisitClass(item)))
        );
    }

    completeCreation(visit: VisitClass) {
        return this.http.patch<any>(`/visits/${visit.id}`, visit);
    }

    pay(id: number, token: string): Observable<VisitClass> {
        return this.http.post<VisitClass>(`/visits/${id}/pay`, null, { params: { token: token } }).pipe(
            map(res => new VisitClass(res))
        );
    }

    cancel(id: number): Observable<VisitClass> {
        return this.http.post<VisitClass>(`/visits/${id}/cancel`, null).pipe(
            map(res => new VisitClass(res))
        );
    }

    architectPaid(id: number): Observable<VisitClass> {
        return this.http.post<VisitClass>(`/visits/${id}/architect-was-paid`, null).pipe(
            map(res => new VisitClass(res))
        );
    }

    getAvailableVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/available`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getPlannedVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/planned`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportPendingVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/report-pending`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportWrittenVisitsByArchitect(architectId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/architects/${architectId}/visits/report-written`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getWaitingForPaymentVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/waiting-for-payment`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getBeingAssignedVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/being-assigned`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getInProgressVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/in-progress`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportBeingWrittenVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/report-being-written`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getReportWrittenVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/report-written`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    getPlannedVisitsByAcheteur(acheteurId: number): Observable<VisitClass[]> {
        return this.http.get<VisitClass[]>(`/customers/${acheteurId}/visits/planned`).pipe(
            map(res => {
                return res.map(x => new VisitClass(x));
            })
        );
    }

    acceptVisit(id: number): Observable<any> {
        return this.http.post(`/visits/${id}/accept`, null);
    }

    refuseVisit(id: number): Observable<any> {
        return this.http.post(`/visits/${id}/refuse`, null);
    }

    getVisitCounter(): Observable<number> {
        return this.http.get<number>('/visits/count');
    }
}