package com.danielyabu.service;

import com.danielyabu.dto.ProductionCapacityResponse;
import com.danielyabu.entity.Product;
import com.danielyabu.entity.RawMaterial;
import com.danielyabu.entity.ProductMaterial;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class ProductionServiceTest {

    @Inject
    ProductionService productionService;

    @Test
    @Transactional
    public void shouldCalculateProductionCapacityCorrectly() {

        ProductMaterial.deleteAll();
        Product.deleteAll();
        RawMaterial.deleteAll();

        Product product = new Product();
        product.code = "TEST1";
        product.name = "Test Product";
        product.price = BigDecimal.valueOf(100);
        product.persist();

        RawMaterial materialA = new RawMaterial();
        materialA.code = "RM-A";
        materialA.name = "Material A";
        materialA.stockQuantity = 20;
        materialA.persist();

        RawMaterial materialB = new RawMaterial();
        materialB.code = "RM-B";
        materialB.name = "Material B";
        materialB.stockQuantity = 6;
        materialB.persist();

        ProductMaterial pm1 = new ProductMaterial();
        pm1.product = product;
        pm1.rawMaterial = materialA;
        pm1.requiredQuantity = 5; // 20 / 5 = 4
        pm1.persist();

        ProductMaterial pm2 = new ProductMaterial();
        pm2.product = product;
        pm2.rawMaterial = materialB;
        pm2.requiredQuantity = 2; // 6 / 2 = 3
        pm2.persist();

        List<ProductionCapacityResponse> result =
                productionService.generateProductionPlan();

        assertEquals(1, result.size());

        ProductionCapacityResponse response = result.get(0);

        assertEquals(3, response.producibleQuantity);
        assertEquals(BigDecimal.valueOf(300), response.totalValue);
    }
}