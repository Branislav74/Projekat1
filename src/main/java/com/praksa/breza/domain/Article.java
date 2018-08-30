package com.praksa.breza.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "available_amount")
    private Double availableAmount;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "article_number", length = 20, nullable = false)
    private String articleNumber;

    @Column(name = "price")
    private Double price;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Article name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAvailableAmount() {
        return availableAmount;
    }

    public Article availableAmount(Double availableAmount) {
        this.availableAmount = availableAmount;
        return this;
    }

    public void setAvailableAmount(Double availableAmount) {
        this.availableAmount = availableAmount;
    }

    public String getArticleNumber() {
        return articleNumber;
    }

    public Article articleNumber(String articleNumber) {
        this.articleNumber = articleNumber;
        return this;
    }

    public void setArticleNumber(String articleNumber) {
        this.articleNumber = articleNumber;
    }

    public Double getPrice() {
        return price;
    }

    public Article price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", availableAmount=" + getAvailableAmount() +
            ", articleNumber='" + getArticleNumber() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
