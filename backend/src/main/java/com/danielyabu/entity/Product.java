package com.danielyabu.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "products")
public class Product extends PanacheEntity {

    @NotBlank
    @Column(nullable = false, unique = true)
    public String code;

    @NotBlank
    @Column(nullable = false)
    public String name;

    @NotNull
    @Positive
    @Column(nullable = false)
    public BigDecimal price;
}