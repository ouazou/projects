package com.paymentpin.projects.book.app.entities;

import org.hibernate.annotations.Proxy;

import javax.persistence.Embeddable;

/**
 * Created by zouarab on 5/26/2016.
 */
@Embeddable
@Proxy(lazy = false)
public class Address {
    private Integer numero;
    private String rue;
    private String ville;

    public Address() {
    }

    public Address(Integer numero, String rue, String ville) {
        this.numero = numero;
        this.rue = rue;
        this.ville = ville;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getRue() {
        return rue;
    }

    public void setRue(String rue) {
        this.rue = rue;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Address address = (Address) o;

        if (!numero.equals(address.numero)) return false;
        if (!rue.equals(address.rue)) return false;
        return ville.equals(address.ville);

    }

    @Override
    public int hashCode() {
        int result = numero.hashCode();
        result = 31 * result + rue.hashCode();
        result = 31 * result + ville.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Address{" +
                "numero=" + numero +
                ", rue='" + rue + '\'' +
                ", ville='" + ville + '\'' +
                '}';
    }
}
