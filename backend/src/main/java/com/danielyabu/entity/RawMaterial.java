package com.danielyabu.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "raw_materials")
public class RawMaterial extends PanacheEntity {

    @NotBlank
    @Column(nullable = false, unique = true)
    public String code;

    @NotBlank
    @Column(nullable = false)
    public String name;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    public Integer stockQuantity;
}