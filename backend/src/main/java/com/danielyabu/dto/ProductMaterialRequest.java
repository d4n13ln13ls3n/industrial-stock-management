package com.danielyabu.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProductMaterialRequest {
    @NotNull
    public Long rawMaterialId;

    @NotNull
    @Positive
    public Integer requiredQuantity;
}