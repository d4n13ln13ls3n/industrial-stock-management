package com.danielyabu.controller;

import com.danielyabu.entity.Product;
import com.danielyabu.entity.RawMaterial;
import com.danielyabu.entity.ProductMaterial;

import com.danielyabu.dto.ProductMaterialRequest;

import jakarta.transaction.Transactional;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import org.jboss.logging.Logger;

import java.util.List;

import jakarta.validation.Valid;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    private static final Logger LOG = Logger.getLogger(ProductResource.class);

    @GET
    public List<Product> listAll() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Response create(@Valid Product product) {
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @GET
    @Path("/{id}")
    public Product findById(@PathParam("id") Long id) {
        return Product.findById(id);
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, @Valid Product updatedProduct) {
        Product product = Product.findById(id);

        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        product.code = updatedProduct.code;
        product.price = updatedProduct.price;
        product.name = updatedProduct.name;

        return Response.ok(product).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Product.deleteById(id);

        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.noContent().build();
    }

    @POST
    @Path("/{productId}/materials")
    @Transactional
    public Response addMaterialToProduct(@PathParam("productId") Long productId, @Valid ProductMaterialRequest request) {
        
        Product product = Product.findById(productId);

        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND)
                .entity("Product not found")
                .build();
        }

        RawMaterial rawMaterial = RawMaterial.findById(request.rawMaterialId);

        if (rawMaterial == null) {
            return Response.status(Response.Status.NOT_FOUND)
                .entity("Raw material not found")
                .build();
        }

        List<ProductMaterial> existing = ProductMaterial.list("product = ?1 and rawMaterial = ?2", product, rawMaterial);

        if (!existing.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity("Raw material already associated with this product")
                .build();
        }

        ProductMaterial productMaterial = new ProductMaterial();
        productMaterial.product = product;
        productMaterial.rawMaterial = rawMaterial;
        productMaterial.requiredQuantity = request.requiredQuantity;

        productMaterial.persist();

        LOG.info("Associated raw material " + rawMaterial.code +
        " to product " + product.code +
        " with required quantity " + request.requiredQuantity);

        return Response.status(Response.Status.CREATED)
            .entity(productMaterial)
            .build();
    }
}