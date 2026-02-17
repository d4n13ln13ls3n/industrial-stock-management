package com.danielyabu.controller;

import com.danielyabu.entity.Product;
import com.danielyabu.entity.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

import jakarta.validation.Valid;

import org.hibernate.exception.ConstraintViolationException;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @GET
    public List<RawMaterial> ListAll() {
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    public Response create(@Valid RawMaterial rawMaterial) {
        rawMaterial.persist();
        return Response.status(Response.Status.CREATED)
            .entity(rawMaterial)
            .build();
    }

    @GET
    @Path("/{id}")
    public RawMaterial findById(@PathParam("id") Long id) {
        return RawMaterial.findById(id);
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, @Valid RawMaterial updated) {
        RawMaterial rawMaterial = RawMaterial.findById(id);

        if (rawMaterial == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        rawMaterial.code = updated.code;
        rawMaterial.name = updated.name;
        rawMaterial.stockQuantity = updated.stockQuantity;

        return Response.ok(rawMaterial).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        try {
            boolean deleted = RawMaterial.deleteById(id);

            if (!deleted) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            Product.getEntityManager().flush();

            return Response.noContent().build();

        } catch (ConstraintViolationException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("Cannot delete raw material because it is associated with a product. Remove association first.")
                    .build();
        }
    }
}