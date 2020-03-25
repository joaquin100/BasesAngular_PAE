import { Component, OnInit } from '@angular/core';
import { Product } from './Producto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  inputValue = "";
  productos: Product[];
  checkBoxValueExistencia = false;
  checkBoxValueSort = false;
  countcheckBoxValueExistencia = 0;
  countCheckBoxSort = 0;
  countCheckBoxbgColor = 0;
  productosFiltrados = [];
  productosSinOrdenar = [];
  hayFiltradoSort = false;
  hayFiltradoExistencia = true;

  constructor() {
    this.productos = [
      new Product(12, "Smartphone", "LG", "Quadcore 3GHZ", 12018.5, 5),
      new Product(123, "Smartwatch", "Sony", "3GB Ram", 4999.9, 0),
      new Product(34, "SmartTV", "Sony", "52 pulgadas, Conexión wifi", 8999.9, 3)
    ]
    this.productosFiltrados = this.productos;
  }



  ngOnInit(): void {

  }

  buscar() {
    //console.log("valor del checkBoxValue", this.checkBoxValueExistencia == "");
    /*this.productosFiltrados = this.productos;
    console.log(this.productosFiltrados);
    console.log("a buscar",this.inputValue);*/
    this.productosFiltrados = this.productos.filter(
      (product) =>
        product.nombre.toUpperCase().includes(this.inputValue.toUpperCase()) ||
        product.descripcion.toUpperCase().includes(this.inputValue.toUpperCase())
    )

    console.log("valor del checkbox",this.checkBoxValueExistencia);

    if(this.checkBoxValueExistencia){
      this.countcheckBoxValueExistencia++;
      this.existencia();
    }

    if(this.checkBoxValueSort){
      this.countCheckBoxSort++;
      this.sort();
    }

    //console.log(this.productosFiltrados);
    /*if(this.hayFiltradoSort){
      this.sort();
    }

    if(this.hayFiltradoExistencia){
      this.existencia()
    }*/


  }

  existencia() {
    //console.log("valor del checkBoxValue", this.checkBoxValueExistencia);
    this.countcheckBoxValueExistencia++;
    if (this.countcheckBoxValueExistencia % 2 != 0) {
      this.hayFiltradoExistencia = true;
      this.productosFiltrados = this.productosFiltrados.filter(
        (product) =>
          product.existencia > 0
      )
    }
    else {
      this.hayFiltradoExistencia = false;
      this.productosFiltrados = this.productos.slice();
      this.buscar()
    }

    //console.log(this.productosFiltrados);
  }

  sort() {
    console.log("productos filtrado antes de la ordenación", this.productosFiltrados);

    this.countCheckBoxSort++;

    if (this.countCheckBoxSort % 2 != 0) {
      this.hayFiltradoSort = true;
      console.log("entre 1");
      console.log("productos sin ordenar", this.productosSinOrdenar);
      this.productosSinOrdenar = this.productosFiltrados.slice();//reparó el problema del sort()

      this.productosFiltrados.sort((a, b) => {
        return a.precio - b.precio;
      })

    }
    else {
      this.hayFiltradoSort = false;
      console.log("entré 2");
      console.log("productos originales");
      this.productosFiltrados = this.productosSinOrdenar.slice();
    }

    console.log(this.productosFiltrados);

  }

  cambiarBackground() {

    this.countCheckBoxbgColor++;

    if (this.countCheckBoxbgColor % 2 != 0) {
      for (let i = 0; i < this.productosFiltrados.length; i++) {
        this.productosFiltrados[i].bgColor = 0;
        if (this.productosFiltrados[i].existencia > 3) {
          this.productosFiltrados[i].bgColor = 1
        }
      }
    }
    else {
      for (let i = 0; i < this.productosFiltrados.length; i++) {
        this.productosFiltrados[i].bgColor = 0;
      }
    }


  }



}