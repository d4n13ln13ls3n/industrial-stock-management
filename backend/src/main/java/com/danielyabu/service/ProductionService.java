package com.danielyabu.service;

import com.danielyabu.dto.ProductionCapacityResponse;
import com.danielyabu.entity.Product;
import com.danielyabu.entity.ProductMaterial;

import jakarta.enterprise.context.ApplicationScoped;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.jboss.logging.Logger;

@ApplicationScoped
public class ProductionService {

    private static final Logger LOG = Logger.getLogger(ProductionService.class);

    public List<ProductionCapacityResponse> generateProductionPlan() {
        LOG.info("Generating production capacity plan...");

        List<Product> products = Product.listAll();
        List<ProductionCapacityResponse> responseList = new ArrayList<>();

        for (Product product : products) {

            List<ProductMaterial> materials =
                    ProductMaterial.list("product", product);

            if (materials.isEmpty()) {
                continue;
            }

            int maxProducible = Integer.MAX_VALUE;

            for (ProductMaterial material : materials) {

                int possible =
                        material.rawMaterial.stockQuantity / material.requiredQuantity;

                if (possible < maxProducible) {
                    maxProducible = possible;
                }
            }

            if (maxProducible > 0) {

                LOG.info("Product " + product.code + " can produce " + maxProducible + " units.");

                ProductionCapacityResponse response = new ProductionCapacityResponse();
                response.productId = product.id;
                response.productCode = product.code;
                response.productName = product.name;
                response.productPrice = product.price;
                response.producibleQuantity = maxProducible;
                response.totalValue =
                        product.price.multiply(BigDecimal.valueOf(maxProducible));

                responseList.add(response);
            }
        }

        responseList.sort(
                Comparator.comparing(
                        (ProductionCapacityResponse r) -> r.productPrice)
                        .reversed()
        );

        return responseList;
    }
}