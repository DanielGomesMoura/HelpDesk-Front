import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

 ELEMENT_DATA: Chamado[] = [
  {
    id:                   1,
    dataAbertura:         '28/07/2024',
    dataFechamento:       '28/07/2024',
    prioridade:           'ALTA',
    status:               'ANDAMENTO',
    titulo:               'Chamado 1',
    descricao:            'teste',
    tecnico:              1,
    cliente:              6,
    nomeCliente:          'Daniel Moura',
    nomeTecnico:          'Ana Beatriz',
  }
 ]

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status' ,'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
