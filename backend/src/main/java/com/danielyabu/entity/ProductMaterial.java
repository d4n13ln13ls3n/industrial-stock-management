package com.danielyabu.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "product_materials")
public class ProductMaterial extends PanacheEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    public Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name = "raw_material_id")
    public RawMaterial rawMaterial;

    @Column(nullable = false)
    public Integer requiredQuantity;
}