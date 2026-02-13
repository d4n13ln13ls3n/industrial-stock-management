package com.danielyabu.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "product_materials")
public class ProductMaterial extends PanacheEntity {

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    public Product product;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "raw_material_id")
    public RawMaterial rawMaterial;

    @NotNull
    @Positive
    @Column(nullable = false)
    public Integer requiredQuantity;
}