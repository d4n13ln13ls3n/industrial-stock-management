package com.danielyabu.controller;

import com.danielyabu.dto.ProductionCapacityResponse;
import com.danielyabu.service.ProductionService;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/production")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionResource {
    
    @Inject
    ProductionService productionService;

    @GET
    @Path("/capacity")
    public List<ProductionCapacityResponse> getCapacity() {
        return productionService.generateProductionPlan();
    }
}
