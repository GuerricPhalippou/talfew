package fr.weflat.backend.web.controller;

import java.util.List;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.service.ArchitectTypeService;
import fr.weflat.backend.web.dto.ArchitectTypeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/architecte/types")
public class ArchitectTypeController {
	
	@Autowired
	private ArchitectTypeService architectTypeService;
	
	@Autowired
	MapperFacade orikaMapperFacade;
	
	@RequestMapping(method=RequestMethod.GET)
    public List<ArchitectTypeDto> getAll() {
		return orikaMapperFacade.mapAsList(architectTypeService.getAll(), ArchitectTypeDto.class);
	}
}