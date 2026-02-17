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
        LOG.info("🔍 Total products found: " + products.size()); // 👈 NOVO

        List<ProductionCapacityResponse> responseList = new ArrayList<>();

        for (Product product : products) {
            LOG.info("🔍 Processing product: " + product.code + " (ID: " + product.id + ")"); // 👈 NOVO

            List<ProductMaterial> materials = ProductMaterial.list("product", product);
            LOG.info("🔍 Materials found for " + product.code + ": " + materials.size()); // 👈 NOVO

            if (materials.isEmpty()) {
                LOG.info("🔍 Skipping " + product.code + " - no materials"); // 👈 NOVO
                continue;
            }

            int maxProducible = Integer.MAX_VALUE;

            for (ProductMaterial material : materials) {
                int possible = material.rawMaterial.stockQuantity / material.requiredQuantity;
                LOG.info("🔍 Material " + material.rawMaterial.code + 
                        " - Stock: " + material.rawMaterial.stockQuantity + 
                        " - Required: " + material.requiredQuantity + 
                        " - Possible: " + possible); // 👈 NOVO

                if (possible < maxProducible) {
                    maxProducible = possible;
                }
            }

            LOG.info("🔍 Final maxProducible for " + product.code + ": " + maxProducible); // 👈 NOVO

            if (maxProducible > 0) {
                LOG.info("Product " + product.code + " can produce " + maxProducible + " units.");

                ProductionCapacityResponse response = new ProductionCapacityResponse();
                response.productId = product.id;
                response.productCode = product.code;
                response.productName = product.name;
                response.productPrice = product.price;
                response.producibleQuantity = maxProducible;
                response.totalValue = product.price.multiply(BigDecimal.valueOf(maxProducible));

                responseList.add(response);
            } else {
                LOG.info("🔍 Skipping " + product.code + " - maxProducible <= 0"); // 👈 NOVO
            }
        }

        responseList.sort(Comparator.comparing((ProductionCapacityResponse r) -> r.productPrice).reversed());

        return responseList;
    }
}