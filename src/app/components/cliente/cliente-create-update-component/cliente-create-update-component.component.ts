import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update-component',
  templateUrl: './cliente-create-update-component.component.html',
  styleUrls: ['./cliente-create-update-component.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }
  admin: boolean = false;
  cli: boolean = false;
  tec: boolean = false;
  isEditMode: boolean = false;

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =   new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(private service: ClienteService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRout.snapshot.paramMap.get('id');
    if(id){
      this.cliente.id = id
      this.findById();
      this.isEditMode = true;
    }
  }

  findById(): void{
    this.service.findById(this.cliente.id).subscribe(resposta =>{
      const roleMapping: { [key: string]: number } = {
        "ADMIN": 0,
        "CLIENTE": 1,
        "TECNICO": 2,
      };

      if(resposta.perfis.includes("ADMIN")){
      this.admin = true;
      }
      if(resposta.perfis.includes("TECNICO")){
        this.tec = true;
      }
      if(resposta.perfis.includes("CLIENTE")){
        this.cli = true;
      }
      // Converta os perfis para os índices
      resposta.perfis = resposta.perfis.map(perfil => roleMapping[perfil]);

      this.cliente = resposta
    })
  }

  save(): void {
    if (this.cliente.id) {
      this.update();
    } else {
      this.create();
    }
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso','Update');
      this.router.navigate(['clientes']);
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

  create(): void {
    this.service.create(this.cliente).subscribe(resposta => {
      this.toast.success('Cliente cadastrado com sucesso');
      this.router.navigate(['clientes']);
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
      this.cliente.perfis.push(perfil);
      console.log(this.cliente.perfis)
     
    } else {
      const index = this.cliente.perfis.indexOf(perfil);
      if (index > -1) {
        this.cliente.perfis.splice(index, 1);
      }
    }
  }
  
  validaCampos(): boolean { 
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }
}
