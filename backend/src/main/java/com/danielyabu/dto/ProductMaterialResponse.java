package com.danielyabu.dto;

public class ProductMaterialResponse {
    public Long rawMaterialId;
    public String rawMaterialName;
    public int requiredQuantity;

    public ProductMaterialResponse(Long rawMaterialId, String rawMaterialName, int requiredQuantity) {
        this.rawMaterialId = rawMaterialId;
        this.rawMaterialName = rawMaterialName;
        this.requiredQuantity = requiredQuantity;
    }
}