package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Visit;

public interface VisitService {
	Long save(Visit visite);
	
	Set<Visit> findAvailableVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findPlannedVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findReportPendingVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findReportWrittenVisitsByArchitectId(Long idArchitecte);
	
	Set<Visit> findWaitingForPaymentVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findBeingAssignedVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findInProgressVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findReportBeingWrittenVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findReportWrittenVisitsByAcheteurId(Long idAcheteur);
	
	Set<Visit> findPlannedVisitsByAcheteurId(Long idAcheteur);
	
	Visit findById(Long id);
	
	Set<Visit> findAll();
	
	void createVisit(Visit visit, Long idAcheteur) throws Exception;
	
	void completeVisitCreation(Visit visit, Long idAcheteur) throws Exception;
	
	void pay(Visit visit, String token) throws Exception;
	
	void cancel(Visit visit) throws Exception;
	
	void refund(Visit visit) throws Exception;
	
	void accept(Long idVisite, Long idArchitecte) throws Exception;
	
	void refuse(Long idVisite, Long idArchitecte) throws Exception;
	
	boolean isVisitComplete(Visit visit);

	void partialRefund(Visit visit) throws Exception;

}