package fr.weflat.backend.web.controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.weflat.backend.service.ZipCodeService;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.MapperFacade;

@RestController
@Produces("application/json")
@RequestMapping("/zipcodes")
public class ZipCodeController {
	@Autowired
	MapperFacade orikaMapperFacade;

	@Autowired
	ZipCodeService zipCodeService;
	
	@RequestMapping(path="/check-status", method=RequestMethod.POST)
	public List<ZipCodeDto> checkZipCodesStatus(@RequestBody Set<ZipCodeDto> input) {
		return orikaMapperFacade.mapAsList(
				zipCodeService
				.getZipCodesByNumbers(
						input.stream()
						.map(x -> x.getNumber())
						.collect(Collectors.toSet())),
				ZipCodeDto.class
				);
	}
}