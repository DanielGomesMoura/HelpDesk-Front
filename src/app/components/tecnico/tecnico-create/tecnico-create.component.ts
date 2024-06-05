import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =   new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico cadastrado com sucesso');
      this.router.navigate(['tecnicos']);
    },ex => {
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfis(event: any, perfil: any): void {
    if (event.checked) {
      this.tecnico.perfis.push(perfil);
    } else {
      const index = this.tecnico.perfis.indexOf(perfil);
      if (index > -1) {
        this.tecnico.perfis.splice(index, 1);
      }
    }
  }
  
  validaCampos(): boolean { 
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }
}
